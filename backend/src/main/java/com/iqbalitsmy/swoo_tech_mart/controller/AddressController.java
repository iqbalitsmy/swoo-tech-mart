package com.iqbalitsmy.swoo_tech_mart.controller;

import com.iqbalitsmy.swoo_tech_mart.dto.request.AddressRequest;
import com.iqbalitsmy.swoo_tech_mart.dto.response.AddressResponse;
import com.iqbalitsmy.swoo_tech_mart.dto.response.ApiResponse;
import com.iqbalitsmy.swoo_tech_mart.security.UserPrincipal;
import com.iqbalitsmy.swoo_tech_mart.service.AddressService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/addresses")
@RequiredArgsConstructor
public class AddressController {
    private final AddressService addressService;

    @GetMapping
    public ApiResponse<List<AddressResponse>> getAddresses(@AuthenticationPrincipal UserPrincipal userPrincipal){
        return ApiResponse.success("Addresses fetched", addressService.listForUser(userPrincipal.getId()));
    }

    @GetMapping("/{id}")
    public ApiResponse<AddressResponse> getAddress(@AuthenticationPrincipal UserPrincipal userPrincipal, @PathVariable Long id){
        return ApiResponse.success("Addresses fetched", addressService.getOwned(userPrincipal.getId(), id));
    }

    @PostMapping
    public ResponseEntity<ApiResponse<AddressResponse>> createAddress(@AuthenticationPrincipal UserPrincipal userPrincipal, @Valid @RequestBody AddressRequest request){
        return ResponseEntity.status(HttpStatus.CREATED).body(ApiResponse.success("Address created", addressService.create(userPrincipal.getId(), request)));
    }

    @PutMapping("/{id}")
    public ApiResponse<AddressResponse> updateAddress(@AuthenticationPrincipal UserPrincipal userPrincipal, @PathVariable Long id, @Valid @RequestBody AddressRequest request){
        return ApiResponse.success("Address updated", addressService.update(userPrincipal.getId(), id, request));
    }

    @DeleteMapping("/{id}")
    public ApiResponse<Void> deleteAddress(@AuthenticationPrincipal UserPrincipal userPrincipal, @PathVariable Long id){
        addressService.delete(userPrincipal.getId(), id);
        return ApiResponse.success("Address deleted");
    }

    @PatchMapping("/{id}/default")
    public ApiResponse<AddressResponse> setDefaultAddress(@AuthenticationPrincipal UserPrincipal principal, @PathVariable Long id){
        return  ApiResponse.success("Default address updated", addressService.setDefault(principal.getId(), id));
    }
}
