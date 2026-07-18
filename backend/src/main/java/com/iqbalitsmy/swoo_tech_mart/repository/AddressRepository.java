package com.iqbalitsmy.swoo_tech_mart.repository;

import com.iqbalitsmy.swoo_tech_mart.entity.Address;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface AddressRepository extends JpaRepository<Address, Long> {
    /**
     * Get all addresses for a user, with the default address always first,
     * then newest-to-oldest after that.
     *
     * "User_Id" (underscore) = traverse the nested `user` relation and
     * filter on its `id` field. Without the underscore, Spring Data would
     * look for a flat "userId" property on Address itself, which doesn't exist.
     *
     * "OrderByIsDefaultDescIdDesc" = sort by isDefault DESC (true sorts
     * before false, so the default address is on top), then by id DESC
     * as a tiebreaker (most recently created address next).
     *
     * Use case: rendering the "Your saved addresses" list on the frontend.
     */
    List<Address> findByUser_IdOrderByIsDefaultDescIdDesc(Long userId);


    /**
     * Fetch one address by its own id, but ONLY if it belongs to the given user.
     *
     * This is an ownership check baked into the query itself — it prevents
     * User A from fetching/editing/deleting User B's address just by knowing
     * or guessing the address id. If the ids don't both match, you get an
     * empty Optional, which the service layer should turn into a 404 (not a 403,
     * to avoid leaking whether the address id exists at all).
     *
     * Use case: "get/update/delete address by id" endpoints where the
     * authenticated user's id comes from the JWT, not from the request body.
     */
    Optional<Address> findByIdAndUser_Id(Long id, Long userId);

    /**
     * Find the current default address for a user (if one is set).
     *
     * "IsDefaultTrue" = Spring Data keyword for `WHERE is_default = true`;
     * no need to pass true as a parameter.
     *
     * Use case: before setting a NEW default address, fetch the old one
     * with this method, flip its isDefault to false, save it, THEN set the
     * new address's isDefault to true. This two-step flow only works if only
     * one address per user is ever default — nothing at the DB level enforces
     * that yet, so the service layer has to be disciplined about it (similar
     * in spirit to the refresh token upsert issue: don't rely on operation
     * ordering, make each step explicit).
     */
    Optional<Address> findByUser_IdAndIsDefaultTrue(Long userId);
}
