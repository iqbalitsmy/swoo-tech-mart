import { useEffect, useMemo, useState } from "react";
import { uploadCloudinaryImage } from "@/api/cloudinaryApi";
import { buildCombinations, comboKey, validateDraft } from "@/utils/variantCombinations";
import { toast } from "sonner";
import { useAttributeTypes } from "./admin/useAttributeTypes";
import { addAdminVariantImage, createAdminVariant } from "@/api/adminApi/variants";

export function useVariantBuilder(product, reload) {
    const [selectedAttributeTypeIds, setSelectedAttributeTypeIds] = useState([]);
    const [selectedAttributeValues, setSelectedAttributeValues] = useState({});
    const [drafts, setDrafts] = useState({});
    const [bulkPrice, setBulkPrice] = useState("");
    const [bulkStock, setBulkStock] = useState("");
    const [isCreating, setIsCreating] = useState(false);
    const [attemptedSubmit, setAttemptedSubmit] = useState(false);
    const [formError, setFormError] = useState("");

    const attributeTypesQuery = useAttributeTypes();
    const attributeTypes = attributeTypesQuery.data ?? [];

    const selectedAttributeTypes = selectedAttributeTypeIds
        .map((id) => attributeTypes.find((t) => t.id === id))
        .filter(Boolean);

    const existingSkusLower = useMemo(
        () => (product.variants ?? []).map((v) => v.sku?.trim().toLowerCase()),
        [product.variants]
    );

    const toggleAttributeType = (typeId) => {
        setSelectedAttributeTypeIds((current) => {
            const exists = current.includes(typeId);
            const next = exists ? current.filter((id) => id !== typeId) : [...current, typeId];

            if (exists) {
                setSelectedAttributeValues((values) => {
                    const nextValues = { ...values };
                    delete nextValues[typeId];
                    return nextValues;
                });
            }

            return next;
        });
    };

    const handleAttributeValuesChange = (attributeTypeId, values) => {
        setSelectedAttributeValues((current) => ({ ...current, [attributeTypeId]: values }));
    };

    const groups = selectedAttributeTypes
        .map((type) => ({
            typeId: type.id,
            typeName: type.name,
            values: selectedAttributeValues[type.id] || [],
        }))
        .filter((g) => g.values.length > 0);

    const readyForCombinations =
        selectedAttributeTypeIds.length > 0 && groups.length === selectedAttributeTypeIds.length;

    const combinationsKey = JSON.stringify(
        groups.map((g) => [g.typeId, g.values.map((v) => v.id).sort()])
    );

    const combinations = useMemo(
        () => (readyForCombinations ? buildCombinations(groups) : []),
        [readyForCombinations, combinationsKey] // eslint-disable-line react-hooks/exhaustive-deps
    );

    useEffect(() => {
        setDrafts((current) => {
            const next = {};
            combinations.forEach((combo) => {
                const key = comboKey(combo);
                const labelSuffix = combo.map((c) => c.label).join("-");
                next[key] =
                    current[key] || {
                        sku: product.sku ? `${product.sku}-${labelSuffix}` : labelSuffix,
                        price: "",
                        stockQty: "",
                        imageFile: null,
                        combo,
                    };
            });
            return next;
        });
        setAttemptedSubmit(false);
        setFormError("");
    }, [combinations, product.sku]);

    const updateDraft = (key, field, value) => {
        setDrafts((current) => ({ ...current, [key]: { ...current[key], [field]: value } }));
    };

    const removeDraftRow = (key) => {
        setDrafts((current) => {
            const next = { ...current };
            delete next[key];
            return next;
        });
    };

    const applyBulkValues = () => {
        setDrafts((current) => {
            const next = {};
            Object.entries(current).forEach(([key, draft]) => {
                next[key] = {
                    ...draft,
                    price: bulkPrice !== "" ? bulkPrice : draft.price,
                    stockQty: bulkStock !== "" ? bulkStock : draft.stockQty,
                };
            });
            return next;
        });
    };

    const resetBuilder = () => {
        setSelectedAttributeTypeIds([]);
        setSelectedAttributeValues({});
        setDrafts({});
        setBulkPrice("");
        setBulkStock("");
        setAttemptedSubmit(false);
        setFormError("");
    };

    const draftEntries = Object.entries(drafts);

    const rowErrors = useMemo(() => {
        const map = {};
        draftEntries.forEach(([key, draft]) => {
            map[key] = validateDraft(draft, existingSkusLower, drafts, key);
        });
        return map;
    }, [drafts, existingSkusLower]); // eslint-disable-line react-hooks/exhaustive-deps

    const hasErrors = Object.values(rowErrors).some((errors) => Object.keys(errors).length > 0);

    const createRow = async (row) => {
        const created = await createAdminVariant(product.id, {
            sku: row.sku.trim(),
            price: Number(row.price),
            stockQty: Number(row.stockQty),
            attributeValueIds: row.combo.map((c) => c.attributeValueId),
        });

        if (row.imageFile instanceof File) {
            try {
                const uploaded = await uploadCloudinaryImage(row.imageFile);
                await addAdminVariantImage(created.id, { url: uploaded.url, sortOrder: 0 });
            } catch {
                toast.error(`"${row.sku}" was created, but its image failed to upload`);
            }
        }

        return created;
    };

    const handleCreateAllVariants = async () => {
        setAttemptedSubmit(true);
        setFormError("");

        if (draftEntries.length === 0) {
            setFormError("No variant combinations to create yet.");
            return;
        }

        if (hasErrors) {
            setFormError("Fix the highlighted fields before creating variants.");
            return;
        }

        setIsCreating(true);
        const results = await Promise.allSettled(draftEntries.map(([, row]) => createRow(row)));
        setIsCreating(false);

        const failed = results.filter((r) => r.status === "rejected");
        const succeeded = results.length - failed.length;

        if (succeeded > 0) toast.success(`${succeeded} variant(s) created`);
        failed.forEach((f) =>
            toast.error(f.reason?.response?.data?.message || "A variant failed to create")
        );

        if (succeeded > 0) {
            resetBuilder();
            await reload();
        }
    };

    return {
        attributeTypesQuery,
        attributeTypes,
        selectedAttributeTypeIds,
        selectedAttributeTypes,
        selectedAttributeValues,
        toggleAttributeType,
        handleAttributeValuesChange,
        readyForCombinations,
        draftEntries,
        rowErrors,
        attemptedSubmit,
        formError,
        bulkPrice,
        setBulkPrice,
        bulkStock,
        setBulkStock,
        applyBulkValues,
        updateDraft,
        removeDraftRow,
        resetBuilder,
        isCreating,
        handleCreateAllVariants,
    };
}