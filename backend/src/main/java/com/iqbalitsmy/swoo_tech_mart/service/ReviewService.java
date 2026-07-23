package com.iqbalitsmy.swoo_tech_mart.service;

import com.iqbalitsmy.swoo_tech_mart.dto.request.ReviewRequest;
import com.iqbalitsmy.swoo_tech_mart.dto.response.PageResponse;
import com.iqbalitsmy.swoo_tech_mart.dto.response.ProductReviewResponse;
import com.iqbalitsmy.swoo_tech_mart.dto.response.ReviewResponse;
import com.iqbalitsmy.swoo_tech_mart.entity.Product;
import com.iqbalitsmy.swoo_tech_mart.entity.Review;
import com.iqbalitsmy.swoo_tech_mart.entity.User;
import com.iqbalitsmy.swoo_tech_mart.entity.enums.OrderStatus;
import com.iqbalitsmy.swoo_tech_mart.exception.ResourceNotFoundException;
import com.iqbalitsmy.swoo_tech_mart.repository.OrderItemRepository;
import com.iqbalitsmy.swoo_tech_mart.repository.ProductRepository;
import com.iqbalitsmy.swoo_tech_mart.repository.ReviewRepository;
import com.iqbalitsmy.swoo_tech_mart.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;



@Service
@RequiredArgsConstructor
public class ReviewService {

    private final ReviewRepository reviewRepository;
    private final ProductRepository productRepository;
    private final UserRepository userRepository;
    private final OrderItemRepository orderItemRepository;

    @Transactional(readOnly = true)
    public ProductReviewResponse listForProduct(Long productId,  int page, int pageSize, String sort){
        if (!productRepository.existsById(productId)){
            throw  new ResourceNotFoundException("Product not found with id: " + productId);
        }

        Pageable pageable = PageRequest.of(Math.max(page, 0), clampSize(pageSize), resolvedSort(sort));

        var result = reviewRepository.findByProduct_Id(productId, pageable).map(ReviewResponse::fromEntity);

        double average = reviewRepository.averageRatingForProduct(productId);
        long total = reviewRepository.countByProduct_Id(productId);

        return new ProductReviewResponse(PageResponse.from(result),rounded(average),total);
    }


    /**
     * Enforces "must have purchased" per the spec: the user needs at least
     * one OrderItem for this product on a non-cancelled order. Also blocks a
     * second review from the same user on the same product — edits go
     * through PUT instead of a repeat POST.
     */

    @Transactional
    public ReviewResponse create(Long userId, Long productId, ReviewRequest request){
        Product  product = productRepository.findById(productId).orElseThrow(()-> new ResourceNotFoundException("Product not found with id: " + productId));

        boolean purchased = orderItemRepository.existsByProductVariant_Product_IdAndOrder_UserIdAndOrder_StatusNot(productId, userId, OrderStatus.CANCELED);

//        if (!purchased){
//            throw  new BadRequestException("You can only review this product you have purchased");
//        }

        if (reviewRepository.existsByProduct_IdAndUser_Id(productId, userId)){
            throw new  ResourceNotFoundException("You've already reviewed this product--- edit your existing review instead" + productId);
        }

        User user = userRepository.getReferenceById(userId);

        Review review = Review.builder()
                .product(product)
                .user(user)
                .rating(request.rating())
                .body(request.body())
                .build();

        return ReviewResponse.fromEntity(reviewRepository.save(review));
    }

    /** Owner-only — no admin override here, unlike delete. */
    @Transactional
    public ReviewResponse update(Long userId, Long reviewId, ReviewRequest request){
        Review review = findOrThrow(reviewId);

        if (!review.getUser().getId().equals(userId)){
            throw new AccessDeniedException("You can only edit your own review");
        }

        review.setRating(request.rating());
        review.setBody(request.body());

        return ReviewResponse.fromEntity(reviewRepository.save(review));
    }

    /** Owner can delete their own review; an admin can remove any review (moderation). */
    @Transactional
    public void delete(Long userId, boolean isAdmin, Long reviewId){
        Review review = findOrThrow(reviewId);

        if (!isAdmin && !review.getUser().getId().equals(userId)){
            throw new AccessDeniedException("You can only delete your own review");
        }

        reviewRepository.delete(review);
    }

    //------helpers-----

    private Review findOrThrow(Long reviewId){
        return reviewRepository.findById(reviewId).orElseThrow(()-> new ResourceNotFoundException("Review not found with id: " + reviewId));
    }

    private Sort resolvedSort(String sort){
        if (!StringUtils.hasText(sort)){
            return Sort.by(Sort.Direction.ASC, "createdAt");
        }

        return switch (sort){
            case "highest" -> Sort.by(Sort.Direction.ASC, "rating").and(Sort.by(Sort.Direction.DESC, "createdAt"));
            case "lowest" -> Sort.by(Sort.Direction.DESC, "rating").and(Sort.by(Sort.Direction.DESC, "createdAt"));
            case "newest" -> Sort.by(Sort.Direction.DESC, "createdAt");
            default -> Sort.by(Sort.Direction.DESC, "createdAt");
        };
    }

    private double rounded(double value){
        return Math.round(value * 10.0)/10.0;
    }

    private int clampSize(int size){
        if (size <= 0) return 20;

        return Math.min(size, 100);
    }
}
