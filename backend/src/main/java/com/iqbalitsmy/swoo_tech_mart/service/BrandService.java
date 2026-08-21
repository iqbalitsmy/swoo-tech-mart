package com.iqbalitsmy.swoo_tech_mart.service;

import com.iqbalitsmy.swoo_tech_mart.dto.request.BrandRequest;
import com.iqbalitsmy.swoo_tech_mart.dto.response.BrandResponse;
import com.iqbalitsmy.swoo_tech_mart.entity.Brand;
import com.iqbalitsmy.swoo_tech_mart.exception.BadRequestException;
import com.iqbalitsmy.swoo_tech_mart.exception.ResourceNotFoundException;
import com.iqbalitsmy.swoo_tech_mart.repository.BrandRepository;
import com.iqbalitsmy.swoo_tech_mart.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;

import java.util.List;

@Service
@RequiredArgsConstructor
public class BrandService {
    private final BrandRepository brandRepository;
    private final ProductRepository productRepository;

    // public reads
    @Transactional(readOnly = true)
    public List<BrandResponse> list(String search) {
        List<Brand> brand = StringUtils.hasText(search) ? brandRepository.findByNameContainingIgnoreCaseOrderByNameAsc(search) : brandRepository.findAll();

        return brand.stream().map(b -> BrandResponse.fromEntity(b, productRepository.countByBrand_Id(b.getId()))).toList();
    }

    @Transactional(readOnly = true)
    public BrandResponse getBySlug(String slug) {
        Brand brand =  brandRepository.findBySlugIgnoreCase(slug).orElseThrow(
                () -> new ResourceNotFoundException("Brand not found: "+slug)
        );
        return BrandResponse.fromEntity(brand, productRepository.countByBrand_Id(brand.getId()));
    }

    // ---- Admin writes ----
    @Transactional
    public BrandResponse create(BrandRequest request) {
        if (brandRepository.existsBySlugIgnoreCase(request.slug())) {
            throw new BadRequestException("Brand with this Slug "+request.slug()+" already exist");
        }

        Brand brand = Brand.builder().slug(request.slug()).name(request.name()).logoUrl(request.logoUrl()).build();

        return BrandResponse.fromEntity(brandRepository.save(brand), 0);
    }

    @Transactional
    public BrandResponse update(Long id, BrandRequest request) {
        Brand brand  = findAndTrow(id);
        if (!brand.getSlug().equals(request.slug()) && brandRepository.existsBySlugIgnoreCase(request.slug())) {
            throw new BadRequestException("Brand with this Slug "+request.slug()+" already exist");
        }

        brand.setName(request.name());
        brand.setSlug(request.slug());
        brand.setLogoUrl(request.logoUrl());
        Brand savedBrand = brandRepository.save(brand);

        return BrandResponse.fromEntity(savedBrand, productRepository.countByBrand_Id(savedBrand.getId()));
    }

//    we detach them (brand -> null) in the same transaction right before removing the row.
    @Transactional
    public void delete(Long id) {
        Brand brand = findAndTrow(id);

        brandRepository.detachFromProduct(id);
        brandRepository.delete(brand);
    }

    private Brand findAndTrow(Long id) {
        return brandRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Brand with this id does not exist"));
    }
}
