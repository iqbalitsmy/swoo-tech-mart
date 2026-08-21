package com.iqbalitsmy.swoo_tech_mart.service;

import com.iqbalitsmy.swoo_tech_mart.dto.response.AddressResponse;
import com.iqbalitsmy.swoo_tech_mart.dto.response.CartItemResponse;
import com.iqbalitsmy.swoo_tech_mart.dto.response.CheckoutSummaryResponse;
import com.iqbalitsmy.swoo_tech_mart.dto.response.CouponPreviewResponse;
import com.iqbalitsmy.swoo_tech_mart.entity.Address;
import com.iqbalitsmy.swoo_tech_mart.entity.Coupon;
import com.iqbalitsmy.swoo_tech_mart.exception.ResourceNotFoundException;
import com.iqbalitsmy.swoo_tech_mart.repository.AddressRepository;
import com.iqbalitsmy.swoo_tech_mart.repository.CouponRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.Instant;
import java.util.ArrayList;
import java.util.List;


@Service
@RequiredArgsConstructor
public class CheckoutSummaryService {

    private final CartService cartService;
    private final AddressRepository addressRepository;
    private final CouponRepository couponRepository;
    private final ShippingFeeCalculator shippingFeeCalculator;

    /**
     * Builds the checkout price summary for the selected address and coupon.
     *
     * Calculates the current cart subtotal, shipping fee, applicable coupon
     * discount, final total, and any cart issues such as insufficient stock.
     */

    @Transactional(readOnly = true)
    public CheckoutSummaryResponse summarize(Long userId, Long selectedAddressId, String couponCode) {
        Address address = addressRepository.findByIdAndUser_Id(selectedAddressId, userId)
                .orElseThrow(() -> new ResourceNotFoundException("Address not found wit id: " + selectedAddressId));
        List<CartItemResponse> items = cartService.getCart(userId, null).response().items();

        // Calculate prices using the current product/variant prices from the cart.
        BigDecimal subtotal = items.stream()
                .map(item -> item.currentPrice().multiply(BigDecimal.valueOf(item.quantity())))
                .reduce(BigDecimal.ZERO, BigDecimal::add);
        BigDecimal shippingFee = shippingFeeCalculator.calculate(subtotal);

        // Coupon is only evaluated when the customer provides a code.
        CouponPreviewResponse couponPreview = StringUtils.hasText(couponCode)
                ? evaluateCoupon(couponCode, subtotal)
                : null;

        BigDecimal discountAmount = (couponPreview != null && couponPreview.applied())
                ? couponPreview.discountAmount()
                : BigDecimal.ZERO;

        BigDecimal totalAmount = subtotal.add(shippingFee).subtract(discountAmount);

        // Never allow the checkout total to become negative.
        if (totalAmount.compareTo(BigDecimal.ZERO) < 0) {
            totalAmount = BigDecimal.ZERO;
        }

        List<String> issues = collectIssues(items);

        return new CheckoutSummaryResponse(
                items,
                AddressResponse.fromEntity(address),
                subtotal,
                shippingFee,
                discountAmount,
                totalAmount,
                couponPreview,
                issues.isEmpty(),
                issues
        );
    }

    // -------helpers----

    /**
     * Validates the coupon against the current subtotal and calculates its discount.
     */
    private CouponPreviewResponse evaluateCoupon(String rawCode, BigDecimal subtotal) {
        String code = rawCode.trim().toUpperCase();

        Coupon coupon = couponRepository.findByCodeIgnoreCase(code).orElse(null);

        if (coupon == null) {
            return new CouponPreviewResponse(code, false, BigDecimal.ZERO, "Coupon code not found");
        }

        if (!coupon.isActive()) {
            return new CouponPreviewResponse(code, true, BigDecimal.ZERO, "This coupon is no longer active");
        }

        if (coupon.getExpiresAt() != null && coupon.getExpiresAt().isBefore(Instant.now())){
            return new CouponPreviewResponse(code, false, BigDecimal.ZERO, "Coupon expired");
        }

        if (coupon.getMinSubtotal() != null && subtotal.compareTo(coupon.getMinSubtotal()) < 0) {
            return new CouponPreviewResponse(code, false, BigDecimal.ZERO, "Coupon requires a minimum order of "+coupon.getMinSubtotal());
        }

        BigDecimal discount = switch (coupon.getDiscountType()){
            case PERCENTAGE -> subtotal
                    .multiply(coupon.getDiscountValue())
                    .divide(BigDecimal.valueOf(100), 2, RoundingMode.HALF_UP);
            case FIXED_AMOUNT -> coupon.getDiscountValue();
        };

        if (coupon.getMaxDiscountAmount() != null && discount.compareTo(coupon.getMaxDiscountAmount()) > 0) {
            discount = coupon.getMaxDiscountAmount();
        }

        if (discount.compareTo(subtotal) > 0) {
            discount = subtotal;
        }

        return new CouponPreviewResponse(coupon.getCode(), true, discount, null);

    }

    /**
     * Checks whether the cart can proceed to checkout.
     */
    private List<String> collectIssues(List<CartItemResponse> items) {
        List<String> issues = new ArrayList<>();

        if (items.isEmpty()) {
            issues.add("Your cart is empty");
            return issues;
        }

        for (CartItemResponse item : items) {
            if (!item.inStock()){
                issues.add("\"" + item.productTitle() + "\" (" + item.variantSku() + ") no longer has enough stock");
            }
        }

        return issues;
    }

}
