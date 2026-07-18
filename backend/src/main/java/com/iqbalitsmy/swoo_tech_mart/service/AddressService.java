package com.iqbalitsmy.swoo_tech_mart.service;

import com.iqbalitsmy.swoo_tech_mart.dto.request.AddressRequest;
import com.iqbalitsmy.swoo_tech_mart.dto.response.AddressResponse;
import com.iqbalitsmy.swoo_tech_mart.entity.Address;
import com.iqbalitsmy.swoo_tech_mart.entity.User;
import com.iqbalitsmy.swoo_tech_mart.entity.enums.OrderStatus;
import com.iqbalitsmy.swoo_tech_mart.exception.BadRequestException;
import com.iqbalitsmy.swoo_tech_mart.exception.ResourceNotFoundException;
import com.iqbalitsmy.swoo_tech_mart.repository.AddressRepository;
import com.iqbalitsmy.swoo_tech_mart.repository.OrderRepository;
import com.iqbalitsmy.swoo_tech_mart.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AddressService {
    private final AddressRepository addressRepository;
    private final UserRepository userRepository;
    private final OrderRepository orderRepository;

    //user all address
    @Transactional(readOnly = true)
    public List<AddressResponse> listForUser(Long userId) {
        return addressRepository.findByUser_IdOrderByIsDefaultDescIdDesc(userId)
                .stream()
                .map(AddressResponse::fromEntity)
                .toList();
    }

    @Transactional(readOnly = true)
    public AddressResponse getOwned(Long userId, Long addressId) {
        return AddressResponse.fromEntity(findOwnedOrThrow(userId, addressId));
    }

    @Transactional
    public AddressResponse create(Long userId, AddressRequest request) {
        //getReferenceById returns a lazy proxy for the User entity — it does not hit the database immediately. The real SELECT only fires the moment you access a field.
        User user = userRepository.getReferenceById(userId);

        if (Boolean.TRUE.equals(request.isDefault())) {
            clearExistingDefault(userId);
        }

        Address address = Address.builder()
                .user(user)
                .recipientName(
                        (request.recipientName() == null || request.recipientName().isBlank()) ? user.getFullName() : request.recipientName()
                )
                .line1(request.line1())
                .line2(request.line2())
                .city(request.city())
                .state(request.state())
                .postalCode(request.postalCode())
                .country(request.country())
                .type(request.type())
                .isDefault(request.isDefault())
                .build();

        return AddressResponse.fromEntity(addressRepository.save(address));
    }

    @Transactional
    public AddressResponse update(Long userId, Long addressId, AddressRequest request) {
        Address address = findOwnedOrThrow(userId, addressId);

        boolean wantsDefault = Boolean.TRUE.equals(request.isDefault());    //null-safe way
        if (wantsDefault && !address.isDefault()) {
            clearExistingDefault(userId);
        }

        address.setRecipientName(request.recipientName());
        address.setLine1(request.line1());
        address.setLine2(request.line2());
        address.setCity(request.city());
        address.setState(request.state());
        address.setPostalCode(request.postalCode());
        address.setCountry(request.country());
        address.setType(request.type());
        address.setDefault(wantsDefault);

        return AddressResponse.fromEntity(addressRepository.save(address));
    }

    @Transactional
    public void delete(Long userId, Long addressId) {
        Address address = findOwnedOrThrow(userId, addressId);

        // is the order not canceled
        boolean referenceByActiveOrder = orderRepository.existsByShippingAddressIdAndStatusNot(addressId, OrderStatus.CANCELED);

        if (referenceByActiveOrder) {
            throw new BadRequestException("This address is attached to an active order and can't be deleted. Cancel the order first.");
        }

        addressRepository.delete(address);
    }

    @Transactional
    public AddressResponse setDefault(Long userId, Long addressId) {
        Address address = findOwnedOrThrow(userId, addressId);

        if (!address.isDefault()) {
            clearExistingDefault(userId);
            address.setDefault(true);

            address = addressRepository.save(address);
        }

        return AddressResponse.fromEntity(address);
    }

    /** Enforces "at most one default address per user" ahead of setting a new one. */
    private void clearExistingDefault(Long userId) {
        addressRepository.findByUser_IdAndIsDefaultTrue(userId)
                .ifPresent(existing -> {
                    existing.setDefault(false);
                    addressRepository.save(existing);
                });
    }

    private Address findOwnedOrThrow(Long userId, Long addressId) {
        return addressRepository.findByIdAndUser_Id(addressId, userId)
                .orElseThrow(() -> new ResourceNotFoundException("Address not found with id: " + addressId));
    }
}
