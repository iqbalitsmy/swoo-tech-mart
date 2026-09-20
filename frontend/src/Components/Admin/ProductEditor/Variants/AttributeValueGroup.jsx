import { useAttributeValues } from "@/hooks/useAttributeValues";
import CheckboxPillGroup from "../ui/CheckboxPillGroup";

export default function AttributeValueGroup({ attributeType, selectedValues, onChange }) {
    const valuesQuery = useAttributeValues(attributeType.id);
    const selectedIds = selectedValues.map((v) => v.id);

    const toggleValue = (id) => {
        const exists = selectedIds.includes(id);
        if (exists) {
            onChange(selectedValues.filter((v) => v.id !== id));
        } else {
            const value = valuesQuery.data?.find((v) => v.id === id);
            if (value) onChange([...selectedValues, { id: value.id, label: value.label }]);
        }
    };

    return (
        <div className="rounded-md border border-gray-200 bg-gray-50 p-3">
            <div className="mb-2 flex items-center justify-between">
                <p className="text-xs font-medium text-gray-600">{attributeType.name}</p>
                {selectedValues.length > 0 && (
                    <span className="text-[11px] text-gray-400">{selectedValues.length} selected</span>
                )}
            </div>

            {valuesQuery.isLoading && <p className="text-xs text-gray-400">Loading values…</p>}
            {valuesQuery.error && <p className="text-xs text-red-500">Could not load values.</p>}

            {valuesQuery.data && (
                <CheckboxPillGroup
                    options={valuesQuery.data.map((v) => ({ value: v.id, label: v.label }))}
                    selectedIds={selectedIds}
                    onToggle={toggleValue}
                    empty="No values for this attribute type."
                />
            )}
        </div>
    );
}