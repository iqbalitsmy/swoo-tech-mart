export function buildCombinations(groups) {
    return groups.reduce(
        (acc, group) => {
            const next = [];
            acc.forEach((combo) => {
                group.values.forEach((value) => {
                    next.push([
                        ...combo,
                        {
                            attributeTypeId: group.typeId,
                            attributeTypeName: group.typeName,
                            attributeValueId: value.id,
                            label: value.label,
                        },
                    ]);
                });
            });
            return next;
        },
        [[]]
    );
}

export function comboKey(combo) {
    return combo
        .map((c) => c.attributeValueId)
        .sort((a, b) => a - b)
        .join("-");
}

export function validateDraft(draft, existingSkusLower, allDrafts, currentKey) {
    const errors = {};
    const sku = draft.sku?.trim();

    if (!sku) {
        errors.sku = "Required";
    } else {
        const skuLower = sku.toLowerCase();
        const clashesExisting = existingSkusLower.includes(skuLower);
        const clashesDraft = Object.entries(allDrafts).some(
            ([key, other]) =>
                key !== currentKey && other.sku?.trim().toLowerCase() === skuLower
        );
        if (clashesExisting || clashesDraft) errors.sku = "Duplicate SKU";
    }

    const price = Number(draft.price);
    if (draft.price === "" || Number.isNaN(price) || price <= 0) {
        errors.price = "Invalid";
    }

    const stock = Number(draft.stockQty);
    if (
        draft.stockQty === "" ||
        Number.isNaN(stock) ||
        stock < 0 ||
        !Number.isInteger(stock)
    ) {
        errors.stockQty = "Invalid";
    }

    return errors;
}