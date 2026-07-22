package com.iqbalitsmy.swoo_tech_mart.service;

import com.iqbalitsmy.swoo_tech_mart.dto.request.AttributeTypeRequest;
import com.iqbalitsmy.swoo_tech_mart.dto.request.AttributeValueRequest;
import com.iqbalitsmy.swoo_tech_mart.dto.response.AttributeTypeResponse;
import com.iqbalitsmy.swoo_tech_mart.dto.response.AttributeValueResponse;
import com.iqbalitsmy.swoo_tech_mart.entity.AttributeType;
import com.iqbalitsmy.swoo_tech_mart.entity.AttributeValue;
import com.iqbalitsmy.swoo_tech_mart.exception.BadRequestException;
import com.iqbalitsmy.swoo_tech_mart.exception.ResourceNotFoundException;
import com.iqbalitsmy.swoo_tech_mart.repository.AttributeTypeRepository;
import com.iqbalitsmy.swoo_tech_mart.repository.AttributeValueRepository;
import com.iqbalitsmy.swoo_tech_mart.repository.ProductVariantRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AttributeService {
    private final AttributeTypeRepository attributeTypeRepository;
    private final AttributeValueRepository attributeValueRepository;
    private final ProductVariantRepository productVariantRepository;

//    ----Attribute type------

    @Transactional(readOnly=true)
    public List<AttributeTypeResponse> listType(){
        return attributeTypeRepository.findAllByOrderByNameAsc().stream()
                .map(AttributeTypeResponse::fromEntity)
                .toList();
    }

    @Transactional
    public AttributeTypeResponse createType(AttributeTypeRequest request){
        if (attributeTypeRepository.existsByNameIgnoreCase(request.name())) {
            throw new BadRequestException("AttributeType with name " + request.name() + " already exists");
        }

        AttributeType attributeType = AttributeType.builder()
                .name(request.name())
                .build();

        return AttributeTypeResponse.fromEntity(attributeTypeRepository.save(attributeType));
    }

    // ---- Attribute Values ----

    @Transactional(readOnly = true)
    public List<AttributeValueResponse> listValues(Long attributeTypeId){
        if (!attributeTypeRepository.existsById(attributeTypeId)){
            throw new ResourceNotFoundException("AttributeType with id " + attributeTypeId + " don't exists");
        }

        return  attributeValueRepository.findByAttributeType_IdOrderByLabelAsc(attributeTypeId).stream()
                        .map(AttributeValueResponse::fromEntity)
                        .toList();
    }

    @Transactional
    public AttributeValueResponse addValue(Long attributeTypeId, AttributeValueRequest request){

        AttributeType type = attributeTypeRepository.findById(attributeTypeId).orElseThrow(
                () -> new ResourceNotFoundException("AttributeType with id " + attributeTypeId + " don't exists")
        );

        if (attributeValueRepository.existsByAttributeType_IdAndValueIgnoreCase(attributeTypeId, request.value())){
            throw new BadRequestException("AttributeValue with value " + request.value() + " already exists");
        }
        AttributeValue value = AttributeValue.builder()
                .attributeType(type)
                .label(request.label())
                .value(request.value())
                .build();

        return AttributeValueResponse.fromEntity(attributeValueRepository.save(value));
    }

    /** Guards against orphaning variant data — refuses if any variant still carries this value. */
    @Transactional
    public void deleteValue(Long attributeValueId){
        AttributeValue value = attributeValueRepository.findById(attributeValueId).orElseThrow(
                () -> new ResourceNotFoundException("AttributeValue with id " + attributeValueId + " don't exists")
        );

        if (productVariantRepository.existsByAttributeValues_Id(attributeValueId)){
            throw new BadRequestException("This value is in use by one or more product variants and can't be deleted");
        }

        attributeValueRepository.delete(value);
    }


}
