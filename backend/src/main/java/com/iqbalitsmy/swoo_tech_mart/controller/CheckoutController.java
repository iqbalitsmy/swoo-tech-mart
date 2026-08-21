package com.iqbalitsmy.swoo_tech_mart.controller;

import com.iqbalitsmy.swoo_tech_mart.dto.request.CheckoutSummaryRequest;
import com.iqbalitsmy.swoo_tech_mart.dto.response.ApiResponse;
import com.iqbalitsmy.swoo_tech_mart.dto.response.CheckoutSummaryResponse;
import com.iqbalitsmy.swoo_tech_mart.security.UserPrincipal;
import com.iqbalitsmy.swoo_tech_mart.service.CheckoutSummaryService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/checkout")
@RequiredArgsConstructor
public class CheckoutController {
    private CheckoutSummaryService checkoutSummaryService;
    /**
     * Returns the current checkout summary including cart items,
     * shipping, discount, total, selected address, and checkout issues.
     */
    @PostMapping("/summary")
    public ApiResponse<CheckoutSummaryResponse> Summary(
            @AuthenticationPrincipal UserPrincipal userPrincipal,
            @Valid @RequestBody CheckoutSummaryRequest request
    ){
        CheckoutSummaryResponse summary = checkoutSummaryService.summarize(userPrincipal.getId(), request.selectedAddressId(), request.couponCode());

        return ApiResponse.success("Checkout summary computed", summary);
    }

}
