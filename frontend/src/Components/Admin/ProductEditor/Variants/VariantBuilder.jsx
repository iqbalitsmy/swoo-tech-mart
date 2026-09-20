import AttributeTypeSection from "./AttributeTypeSection";
import AttributeValueGroup from "./AttributeValueGroup";
import CombinationsTable from "./CombinationsTable";
import SectionCard from "../ui/SectionCard";
import { useVariantBuilder } from "@/hooks/useVariantBuilder";

export default function VariantBuilder({ product, reload }) {
    const {
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
    } = useVariantBuilder(product, reload);

    return (
        <SectionCard
            title="Add variants"
            description="Select attribute types and values — every combination is generated automatically below."
        >
            {attributeTypesQuery.isLoading && <p className="text-sm text-gray-500">Loading attribute types…</p>}
            {attributeTypesQuery.error && <p className="text-sm text-red-500">Could not load attribute types.</p>}

            {attributeTypesQuery.data && (
                <div className="space-y-5">
                    <div>
                        <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-gray-400">
                            1. Attribute types
                        </p>
                        <AttributeTypeSection
                            attributeTypes={attributeTypes}
                            selectedIds={selectedAttributeTypeIds}
                            onToggle={toggleAttributeType}
                        />
                    </div>

                    {selectedAttributeTypes.length > 0 && (
                        <div>
                            <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-gray-400">
                                2. Values for each attribute
                            </p>

                            <div className="space-y-3">
                                {selectedAttributeTypes.map((type) => (
                                    <AttributeValueGroup
                                        key={type.id}
                                        attributeType={type}
                                        selectedValues={selectedAttributeValues[type.id] || []}
                                        onChange={(values) => handleAttributeValuesChange(type.id, values)}
                                    />
                                ))}
                            </div>

                            {!readyForCombinations && (
                                <p className="mt-2 text-xs text-amber-600">
                                    Select at least one value for every attribute type above.
                                </p>
                            )}
                        </div>
                    )}

                    {draftEntries.length > 0 && (
                        <div>
                            <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-gray-400">
                                3. Review combinations
                            </p>

                            <CombinationsTable
                                draftEntries={draftEntries}
                                rowErrors={rowErrors}
                                attemptedSubmit={attemptedSubmit}
                                updateDraft={updateDraft}
                                removeDraftRow={removeDraftRow}
                                bulkPrice={bulkPrice}
                                setBulkPrice={setBulkPrice}
                                bulkStock={bulkStock}
                                setBulkStock={setBulkStock}
                                applyBulkValues={applyBulkValues}
                            />

                            <div className="mt-3 flex items-center gap-3">
                                <button
                                    type="button"
                                    disabled={isCreating}
                                    onClick={handleCreateAllVariants}
                                    className="rounded-md bg-primary px-4 py-2 text-sm font-semibold text-white transition hover:bg-primary/90 disabled:opacity-50"
                                >
                                    {isCreating ? "Creating…" : `Create ${draftEntries.length} variant(s)`}
                                </button>
                                <button
                                    type="button"
                                    onClick={resetBuilder}
                                    className="text-sm text-gray-500 hover:text-gray-700"
                                >
                                    Clear
                                </button>
                            </div>

                            {formError && <p className="mt-2 text-xs text-red-500">{formError}</p>}
                        </div>
                    )}
                </div>
            )}
        </SectionCard>
    );
}