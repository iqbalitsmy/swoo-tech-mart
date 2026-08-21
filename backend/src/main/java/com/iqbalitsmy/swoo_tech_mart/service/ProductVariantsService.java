package com.iqbalitsmy.swoo_tech_mart.service;

import com.iqbalitsmy.swoo_tech_mart.dto.request.ProductVariantCreateRequest;
import com.iqbalitsmy.swoo_tech_mart.dto.request.ProductVariantImageRequest;
import com.iqbalitsmy.swoo_tech_mart.dto.request.ProductVariantUpdateRequest;
import com.iqbalitsmy.swoo_tech_mart.dto.response.ProductVariantImageResponse;
import com.iqbalitsmy.swoo_tech_mart.dto.response.ProductVariantResponse;
import com.iqbalitsmy.swoo_tech_mart.dto.response.VariantAttributeRef;
import com.iqbalitsmy.swoo_tech_mart.entity.AttributeValue;
import com.iqbalitsmy.swoo_tech_mart.entity.Product;
import com.iqbalitsmy.swoo_tech_mart.entity.ProductVariant;
import com.iqbalitsmy.swoo_tech_mart.entity.ProductVariantImage;
import com.iqbalitsmy.swoo_tech_mart.exception.BadRequestException;
import com.iqbalitsmy.swoo_tech_mart.exception.ResourceNotFoundException;
import com.iqbalitsmy.swoo_tech_mart.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Service
@RequiredArgsConstructor
public class ProductVariantsService {
    private final ProductRepository productRepository;
    private final ProductVariantRepository productVariantRepository;
    private final ProductVariantImageRepository productVariantImageRepository;
    private final AttributeValueRepository attributeValueRepository;
    private final OrderItemRepository  orderItemRepository;

    //-----public reads------

    /** Only active variants — a soft-disabled one shouldn't appear as a pickable option. */
    @Transactional(readOnly = true)
    public List<ProductVariantResponse> listForProduct(Long productId){
        if (!productRepository.existsById(productId)){
            throw new ResourceNotFoundException("Product not found");
        }

        return productVariantRepository.findByProduct_IdOrderByIdAsc(productId).stream()
                .filter(ProductVariant::getActive)
                .map(this::toResponse)
                .toList();
    }

    @Transactional
    public ProductVariantResponse getById(Long id){

        return toResponse(findVariantOrThrow(id));
    }

    // --- admin writer----
    @Transactional
    public ProductVariantResponse create(Long productId, ProductVariantCreateRequest request){
        Product product = productRepository.findById(productId).orElseThrow(() -> new ResourceNotFoundException("Product not found with id " + productId));

        if (productVariantRepository.existsBySku(request.sku()))
            throw new BadRequestException("Product variant with sku " + request.sku() + " already exists");

        ProductVariant productVariant = ProductVariant.builder()
                .product(product)
                .sku(request.sku())
                .price(request.price())
                .stockQty(request.stockQty())
                .imageUrl(request.imageUrl())
                .attributeValues(resolvedAttributeValues(request.attributeValueIds()))
                .build();

        ProductVariant saved = productVariantRepository.save(productVariant);
        recalculatePriceRange(productId);

        return toResponse(saved);
    }

    @Transactional
    public ProductVariantResponse update(Long variantId, ProductVariantUpdateRequest request){
        ProductVariant variant = findVariantOrThrow(variantId);

        if (!variant.getSku().equals(request.sku()) && productVariantRepository.existsBySku(request.sku()))
            throw new BadRequestException("Product variant with sku " + request.sku() + " already exists");

        variant.setSku(request.sku());
        variant.setPrice(request.price());
        variant.setStockQty(request.stockQty());
        variant.setImageUrl(request.imageUrl());

        ProductVariant saved = productVariantRepository.save(variant);

        recalculatePriceRange(saved.getProduct().getId());
        return toResponse(saved);
    }

    /**
     * If the variant is referenced by existing OrderItems, soft-disables it
     * (active = false) instead of deleting — order history needs the row to
     * keep meaning. Otherwise removes it outright. Returns true if it was
     * actually deleted, false if it was soft-disabled instead, so the
     * controller can report which happened.
     */

    @Transactional
    public boolean delete(Long variantId){
        ProductVariant variant = findVariantOrThrow(variantId);
        Long productId = variant.getProduct().getId();

        if (orderItemRepository.existsByProductVariant_Id(variantId)){
            variant.setActive(false);
            productVariantRepository.save(variant);
            recalculatePriceRange(productId);
            return true;
        }

        variant.getAttributeValues().clear();
        productVariantRepository.save(variant);

        productVariantImageRepository.deleteAll(
                productVariantImageRepository.findByProductVariant_IdOrderBySortOrderAsc(variantId)
        );

        productVariantRepository.delete(variant);

        recalculatePriceRange(productId);
        return true;
    }

    //---images-----
    @Transactional
    public ProductVariantImageResponse addImage(Long variantId, ProductVariantImageRequest request){
        ProductVariant variant = findVariantOrThrow(variantId);

        ProductVariantImage image = ProductVariantImage.builder()
                .productVariant(variant)
                .url(request.url())
                .sortOrder(request.sortOrder() != null ? request.sortOrder() : 0)
                .build();

        return ProductVariantImageResponse.fromEntity(productVariantImageRepository.save(image));
    }

    @Transactional
    public void deleteImage(Long variantId, Long imageId){
        ProductVariantImage image = productVariantImageRepository.findByIdAndProductVariant_Id(imageId, variantId).orElseThrow(
                () ->  new ResourceNotFoundException("Product variant image with id " + imageId + " not found")
        );
        productVariantImageRepository.delete(image);
    }

    //------helpers------

    private ProductVariant findVariantOrThrow(Long id){
        return productVariantRepository.findById(id).orElseThrow(
                () -> new ResourceNotFoundException("Variant not found with id: " + id)
        );
    }

    private Set<AttributeValue> resolvedAttributeValues(List<Long> attributeValuesIds){
        if (attributeValuesIds == null || attributeValuesIds.isEmpty()) return new HashSet<>();

        Set<AttributeValue> values = new HashSet<>(attributeValueRepository.findAllById(attributeValuesIds));

        if (values.size() != Set.copyOf(attributeValuesIds).size())
            throw new BadRequestException("One or more attribute values ids do not exist");
        return values;
    }

    private  ProductVariantResponse toResponse(ProductVariant variant){
        List<VariantAttributeRef> attributes = variant.getAttributeValues()
                .stream()
                .map(VariantAttributeRef::fromEntity)
                .toList();

        List<ProductVariantImageResponse> images = productVariantImageRepository.findByProductVariant_IdOrderBySortOrderAsc(variant.getId()).stream()
                .map(ProductVariantImageResponse::fromEntity)
                .toList();

        return ProductVariantResponse.fromEntity(variant, attributes, images);
    }

    /** Keeps Product.minPrice/maxPrice in sync with its active variants, as promised when Product was first built. */
    private void recalculatePriceRange(Long productId){
        List<ProductVariant> activeVariants = productVariantRepository.findByProduct_IdOrderByIdAsc(productId).stream()
                .filter(ProductVariant::getActive)
                .toList();

        Product product = productRepository.getReferenceById(productId);

        if (activeVariants.isEmpty()){
            product.setMinPrice(null);
            product.setMaxPrice(null);
        } else{
            BigDecimal min = new BigDecimal(Integer.MAX_VALUE);
            BigDecimal max = new BigDecimal(Integer.MIN_VALUE);

            for (ProductVariant v : activeVariants){
                if (v.getPrice().compareTo(min) < 0) min =  v.getPrice();
                if (v.getPrice().compareTo(max) > 0) max =  v.getPrice();
            }
            product.setMinPrice(min);
            product.setMaxPrice(max);
        }
        productRepository.save(product);
    }

}
