package com.iqbalitsmy.swoo_tech_mart.service;

import com.iqbalitsmy.swoo_tech_mart.dto.request.TagRequest;
import com.iqbalitsmy.swoo_tech_mart.dto.response.TagResponse;
import com.iqbalitsmy.swoo_tech_mart.entity.Tag;
import com.iqbalitsmy.swoo_tech_mart.exception.BadRequestException;
import com.iqbalitsmy.swoo_tech_mart.exception.ResourceNotFoundException;
import com.iqbalitsmy.swoo_tech_mart.repository.TagRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class TagService {
    private final TagRepository tagRepository;

    @Transactional(readOnly = true)
    public List<TagResponse> listAll(){
        return tagRepository.findAllByOrderByLabelAsc().stream().map(TagResponse::fromEntity).toList();
    }

    @Transactional
    public TagResponse create(TagRequest request){
        if (tagRepository.findByLabelIgnoreCase(request.label()).isPresent()){
            throw new BadRequestException("A tag with this label already exists");
        }

        Tag tag = Tag.builder().label(request.label()).build();

        return TagResponse.fromEntity(tagRepository.save(tag));
    }

    /** Cascades product_tags rows for this tag before removing the tag itself, per the spec. */
    @Transactional
    public void delete(Long id){
        Tag tag = tagRepository.findById(id).orElseThrow(
                () -> new ResourceNotFoundException("The tag with this id does not exist")
        );
        tagRepository.deleteProductTagLinks(id);
        tagRepository.delete(tag);
    }
}
