import { useMemo, useState } from 'react';

// Groups a product's variants by attribute type (Color, RAM, Storage, ... -
// whatever attributeType.name values actually exist for this product) and
// resolves which single variant matches the currently selected combination.
//
// Extracted as a shared hook so there's exactly ONE implementation of "how
// do we match a variant from selected attributes" - if this lived separately
// in both BuyBox and ProductInfo, they could disagree with each other.
export function useVariantMatrix(variants = []) {
    
    const attributeTypes = useMemo(() => {
        const typeMap = new Map(); // typeId -> { id, name, options: Map(value -> {value,label}) }
        variants.forEach((variant) => {
            (variant.attributes ?? []).forEach((attr) => {
                const typeId = attr.attributeType.id;
                if (!typeMap.has(typeId)) {
                    typeMap.set(typeId, { id: typeId, name: attr.attributeType.name, options: new Map() });
                }
                typeMap.get(typeId).options.set(attr.value, { value: attr.value, label: attr.label });
            });
        });
        return Array.from(typeMap.values()).map((t) => ({
            ...t,
            options: Array.from(t.options.values()),
        }));
    }, [variants]);

    // Stable, order-independent key from a variant's attribute array, e.g.
    // [{attributeType:{id:1},value:"black"},{attributeType:{id:2},value:"256gb"}]
    // -> "1:black|2:256gb".
    const buildKey = (attrs = []) =>
        [...attrs]
            .sort((a, b) => a.attributeType.id - b.attributeType.id)
            .map((a) => `${a.attributeType.id}:${a.value}`)
            .join('|');

    const variantByKey = useMemo(() => {
        const map = new Map();
        variants.forEach((v) => map.set(buildKey(v.attributes), v));
        return map;
    }, [variants]);

    // Defaults to the first variant's own combination, so the page opens on
    // a real, purchasable variant rather than an empty/invalid selection.
    const [selectedAttributes, setSelectedAttributes] = useState(() =>
        Object.fromEntries((variants[0]?.attributes ?? []).map((a) => [a.attributeType.id, a.value]))
    );

    const selectedKey = useMemo(
        () =>
            Object.entries(selectedAttributes)
                .sort(([a], [b]) => Number(a) - Number(b))
                .map(([typeId, value]) => `${typeId}:${value}`)
                .join('|'),
        [selectedAttributes]
    );

    const selectedVariant = variantByKey.get(selectedKey);

    const selectAttribute = (typeId, value) => {
        setSelectedAttributes((prev) => ({ ...prev, [typeId]: value }));
    };

    // Is `value` for `typeId` reachable given what's CURRENTLY selected for
    // every OTHER attribute type? e.g. if "Blue" only exists in 128GB and
    // 256GB is currently selected, "Blue" is unavailable.
    const isOptionAvailable = (typeId, value) =>
        variants.some((variant) => {
            const attrs = variant.attributes ?? [];
            const matchesThisOption = attrs.some(
                (a) => a.attributeType.id === typeId && a.value === value
            );
            if (!matchesThisOption) return false;
            return Object.entries(selectedAttributes).every(([otherTypeId, otherValue]) => {
                if (Number(otherTypeId) === typeId) return true;
                return attrs.some(
                    (a) => a.attributeType.id === Number(otherTypeId) && a.value === otherValue
                );
            });
        });

    return { attributeTypes, selectedAttributes, selectedVariant, selectAttribute, isOptionAvailable };
}