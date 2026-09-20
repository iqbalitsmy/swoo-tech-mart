import { productSchema } from "@/validators/productValidator";
import { useEffect, useState } from "react";
// import { productSchema } from "@/validators/productValidator";

const empty = {
    sku: "",
    title: "",
    slug: "",
    categoryId: "",
    brandId: "",
    stockStatus: "IN_STOCK",
    isNew: false,
    tagIds: [],
};

const toPayload = (form) => ({
    ...form,
    categoryId: form.categoryId ? Number(form.categoryId) : null,
    brandId: form.brandId ? Number(form.brandId) : null,
    tagIds: form.tagIds.map(Number),
});

export function useProductForm({ detailData, tagsData }) {
    const [form, setForm] = useState(empty);
    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (detailData && tagsData) {
            setForm({
                ...empty,
                ...detailData,
                categoryId: detailData.category?.id ?? "",
                brandId: detailData.brand?.id ?? "",
                tagIds: tagsData
                    .filter((tag) => detailData.tags?.includes(tag.label))
                    .map((tag) => tag.id),
            });
        }
    }, [detailData, tagsData]);

    const set = (key, value) => {
        setForm((current) => ({ ...current, [key]: value }));
        setErrors((current) => {
            if (!current[key]) return current;
            const next = { ...current };
            delete next[key];
            return next;
        });
    };

    const validate = () => {
        const result = productSchema.safeParse(toPayload(form));
        if (!result.success) {
            const fieldErrors = {};
            result.error.issues.forEach((issue) => {
                const key = issue.path[0];
                if (key && !fieldErrors[key]) fieldErrors[key] = issue.message;
            });
            setErrors(fieldErrors);
            return null;
        }
        setErrors({});
        return result.data;
    };

    return { form, set, errors, validate };
}