import CombinationRow from "./CombinationRow";

export default function CombinationsTable({
    draftEntries,
    rowErrors,
    attemptedSubmit,
    updateDraft,
    removeDraftRow,
    bulkPrice,
    setBulkPrice,
    bulkStock,
    setBulkStock,
    applyBulkValues,
}) {
    return (
        <div className="space-y-3">
            <div className="flex flex-wrap items-end justify-between gap-3">
                <p className="text-xs font-medium text-gray-600">
                    {draftEntries.length} combination(s) generated
                </p>

                <div className="flex items-end gap-2">
                    <div>
                        <label className="mb-1 block text-[11px] text-gray-400">Bulk price</label>
                        <input
                            type="number"
                            value={bulkPrice}
                            onChange={(e) => setBulkPrice(e.target.value)}
                            className="w-24 rounded border border-gray-200 px-2 py-1 text-xs"
                        />
                    </div>
                    <div>
                        <label className="mb-1 block text-[11px] text-gray-400">Bulk stock</label>
                        <input
                            type="number"
                            value={bulkStock}
                            onChange={(e) => setBulkStock(e.target.value)}
                            className="w-20 rounded border border-gray-200 px-2 py-1 text-xs"
                        />
                    </div>
                    <button
                        type="button"
                        onClick={applyBulkValues}
                        className="rounded bg-gray-800 px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-gray-900"
                    >
                        Apply to all
                    </button>
                </div>
            </div>

            <div className="overflow-x-auto rounded-md border border-gray-200">
                <table className="w-full border-collapse text-sm">
                    <thead>
                        <tr className="border-b border-gray-200 bg-gray-50 text-left text-[11px] font-medium uppercase tracking-wide text-gray-500">
                            <th className="px-3 py-2">Variant</th>
                            <th className="px-3 py-2">Image</th>
                            <th className="px-3 py-2">SKU</th>
                            <th className="w-24 px-3 py-2">Price</th>
                            <th className="w-24 px-3 py-2">Stock</th>
                            <th className="w-8 px-3 py-2" />
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {draftEntries.map(([key, draft]) => (
                            <CombinationRow
                                key={key}
                                draftKey={key}
                                draft={draft}
                                errors={attemptedSubmit ? rowErrors[key] ?? {} : {}}
                                updateDraft={updateDraft}
                                onRemove={() => removeDraftRow(key)}
                            />
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}