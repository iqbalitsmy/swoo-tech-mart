import { AlertCircle } from "lucide-react";
import { useAttributeValues } from "@/hooks/useAttributeValues";

export default function AttributeValueMultiSelect({ attributeType, selectedValues, onChange }) {
    const valuesQuery = useAttributeValues(attributeType.id);
    const selectedIds = selectedValues.map((v) => v.id);

    const toggleValue = (value) => {
        const exists = selectedIds.includes(value.id);
        onChange(
            exists
                ? selectedValues.filter((v) => v.id !== value.id)
                : [...selectedValues, { id: value.id, label: value.label }]
        );
    };

    return (
        <div className="space-y-2">
            <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-[color:var(--secondary)]">
                    {attributeType.name}
                </span>
                {selectedValues.length > 0 && (
                    <span className="text-xs text-gray-500">
                        {selectedValues.length} selected
                    </span>
                )}
            </div>

            {valuesQuery.isLoading && (
                <p className="text-xs text-gray-500">Loading values…</p>
            )}

            {valuesQuery.error && (
                <p className="flex items-center gap-1 text-xs text-[color:var(--danger)]">
                    <AlertCircle size={12} /> Could not load values
                </p>
            )}

            {valuesQuery.data && (
                <div className="flex flex-wrap gap-2">
                    {valuesQuery.data.map((value) => {
                        const active = selectedIds.includes(value.id);
                        return (
                            <button
                                key={value.id}
                                type="button"
                                onClick={() => toggleValue(value)}
                                className={`rounded-md border px-3 py-1.5 text-sm font-medium transition-colors ${
                                    active
                                        ? "border-[color:var(--primary)] bg-[color:var(--primary)] text-white"
                                        : "border-gray-300 bg-white text-gray-700 hover:border-[color:var(--primary)]/50"
                                }`}
                            >
                                {value.label}
                            </button>
                        );
                    })}

                    {valuesQuery.data.length === 0 && (
                        <p className="text-xs text-gray-500">
                            No values found for this attribute type.
                        </p>
                    )}
                </div>
            )}
        </div>
    );
}