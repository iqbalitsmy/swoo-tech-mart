package com.iqbalitsmy.swoo_tech_mart.service;

import com.iqbalitsmy.swoo_tech_mart.dto.request.CategoryRequest;
import com.iqbalitsmy.swoo_tech_mart.dto.response.CategoryResponse;
import com.iqbalitsmy.swoo_tech_mart.entity.Category;
import com.iqbalitsmy.swoo_tech_mart.exception.BadRequestException;
import com.iqbalitsmy.swoo_tech_mart.exception.ResourceNotFoundException;
import com.iqbalitsmy.swoo_tech_mart.repository.CategoryRepository;
import com.iqbalitsmy.swoo_tech_mart.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Objects;

@Service
@RequiredArgsConstructor
public class CategoryService {
    private final CategoryRepository categoryRepository;
    private final ProductRepository productRepository;

    //------ public reads ------
    @Transactional(readOnly = true)
    public List<CategoryResponse> list(Long parentId){
        List<Category>  categories = parentId == null ? categoryRepository.findByParentCategoryIsNullOrderByNameAsc()
                : categoryRepository.findByParentCategory_IdOrderByNameAsc(parentId);

        return categories.stream().map(CategoryResponse::fromEntity).toList();
    }

    @Transactional(readOnly = true)
    public CategoryResponse getBySlug(String slug){
        return CategoryResponse.fromEntity(
                categoryRepository.findBySlugIgnoreCase(slug).orElseThrow(
                    () -> new ResourceNotFoundException("Category not found with slug: " + slug)
                    )
        );
    }

    //----- admin writes----
    @Transactional
    public CategoryResponse create(CategoryRequest request){
        if (categoryRepository.existsBySlugIgnoreCase(request.slug())){
            throw new BadRequestException("Category with slug: " + request.slug() + " already exists");
        }

        Category category = Category.builder()
                .name(request.name())
                .slug(request.slug())
                .parentCategory(resolveParent(request.parentCategoryId(), null))
                .build();
        return CategoryResponse.fromEntity(categoryRepository.save(category));
    }

    @Transactional
    public CategoryResponse update(Long id, CategoryRequest request){
        Category category = findOrThrow(id);

        if (!category.getSlug().equals(request.slug()) && categoryRepository.existsBySlugIgnoreCase(request.slug())){
            throw new BadRequestException("Category with slug: " + request.slug() + " already exists");
        }

        category.setName(request.name());
        category.setSlug(request.slug());
        category.setParentCategory(resolveParent(request.parentCategoryId(), id));

        return CategoryResponse.fromEntity(categoryRepository.save(category));
    }

    @Transactional
    public void delete(Long id){
        Category category = findOrThrow(id);

        if (categoryRepository.existsByParentCategory_Id(id)){
            throw new BadRequestException("This Category has sub-categories -- move or delete them first");
        }

        if (productRepository.existsByCategory_Id(id)){
            throw new BadRequestException("This category still has products -- move or delete them first");
        }

        categoryRepository.delete(category);
    }

    //-----helper function----
    private Category resolveParent(Long parentCategoryId, Long selfId){
        if (parentCategoryId == null) return null;

        if (Objects.equals(parentCategoryId, selfId)){
            throw new BadRequestException("A category can't be its own parent");
        }

        return categoryRepository.findById(parentCategoryId).orElseThrow(
                () -> new BadRequestException("Parent category not found with id: " + parentCategoryId)
        );
    }

    private Category findOrThrow(Long id){
        return categoryRepository.findById(id).orElseThrow(
                () -> new ResourceNotFoundException("Category not found with id: " + id)
        );
    }

}
