import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

import {
    addAdminDescription,
    addAdminDescriptionImage,
    addAdminHighlight,
    addAdminProductImage,
    addAdminVariantImage,
    createAdminVariant,
} from "@/api/adminApi";

export function useProductContentMutations(product, reload) {
    const createMutation = (mutationFn, successMessage) =>
        useMutation({
            mutationFn,
            onSuccess: () => {
                reload();
                toast.success(successMessage);
            },
            onError: (error) => {
                toast.error(
                    error.response?.data?.message || "Could not add item"
                );
            },
        });

    const image = createMutation(
        (data) =>
            addAdminProductImage(product.id, {
                ...data,
                sortOrder: Number(data.sortOrder || 0),
            }),
        "Product image added"
    );

    const highlight = createMutation(
        (data) =>
            addAdminHighlight(product.id, {
                ...data,
                sortOrder: Number(data.sortOrder || 0),
            }),
        "Highlight added"
    );

    const section = createMutation(
        (data) =>
            addAdminDescription(product.id, {
                ...data,
                sortOrder: Number(data.sortOrder || 0),
            }),
        "Description section added"
    );

    const variant = createMutation(
        (data) =>
            createAdminVariant(product.id, {
                ...data,
                price: Number(data.price),
                stockQty: Number(data.stockQty),
                imageUrl: data.imageUrl || null,
                attributeValueIds: [],
            }),
        "Variant added"
    );

    const sectionImage = createMutation(
        (data) =>
            addAdminDescriptionImage(product.id, data.sectionId, {
                url: data.url,
                altText: data.altText,
                sortOrder: Number(data.sortOrder || 0),
            }),
        "Description image added"
    );

    const variantImage = createMutation(
        (data) =>
            addAdminVariantImage(data.variantId, {
                url: data.url,
                sortOrder: Number(data.sortOrder || 0),
            }),
        "Variant image added"
    );

    return {
        image,
        highlight,
        section,
        variant,
        sectionImage,
        variantImage,
    };
}