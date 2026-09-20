import { X } from "lucide-react";
import Chip from "../UI/Chip";
import FieldError from "../UI/FieldError";
import { inputBase, inputError } from "../UI/inputStyles";

export default function VariantCombinationTable({
    draftEntries,
    rowErrors,
    attemptedSubmit,
    updateDraft,
    removeDraftRow,
}) {
    return (
        <div className="overflow-hidden rounded-md border border-gray-200">
            <table className="w-full border-collapse text-sm">
                <thead>
                    <tr className="bg-gray-50 text-left text-xs font-medium uppercase tracking-wide text-gray-500">
                        <th className="px-4 py-2.5">Variant</th>
                        <th className="px-4 py-2.5">SKU</th>
                        <th className="w-28 px-4 py-2.5">Price</th>
                        <th className="w-28 px-4 py-2.5">Stock</th>
                        <th className="w-10 px-4 py-2.5" />
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                    {draftEntries.map(([key, draft]) => {
                        const errors = attemptedSubmit ? rowErrors[key] ?? {} : {};
                        return (
                            <tr key={key}>
                                <td className="px-4 py-3 align-top">
                                    <div className="flex flex-wrap gap-1">
                                        {draft.combo.map((c) => (
                                            <Chip key={c.attributeTypeId}>{c.label}</Chip>
                                        ))}
                                    </div>
                                </td>
                                <td className="px-4 py-3 align-top">
                                    <input
                                        value={draft.sku}
                                        onChange={(e) => updateDraft(key, "sku", e.target.value)}
                                        className={`${inputBase} ${errors.sku ? inputError : ""}`}
                                    />
                                    <FieldError message={errors.sku} />
                                </td>
                                <td className="px-4 py-3 align-top">
                                    <input
                                        type="number"
                                        value={draft.price}
                                        onChange={(e) => updateDraft(key, "price", e.target.value)}
                                        className={`${inputBase} ${errors.price ? inputError : ""}`}
                                    />
                                    <FieldError message={errors.price} />
                                </td>
                                <td className="px-4 py-3 align-top">
                                    <input
                                        type="number"
                                        value={draft.stockQty}
                                        onChange={(e) => updateDraft(key, "stockQty", e.target.value)}
                                        className={`${inputBase} ${errors.stockQty ? inputError : ""}`}
                                    />
                                    <FieldError message={errors.stockQty} />
                                </td>
                                <td className="px-4 py-3 align-top">
                                    <button
                                        type="button"
                                        onClick={() => removeDraftRow(key)}
                                        className="rounded-md p-1.5 text-[color:var(--danger)] hover:bg-[color:var(--danger)]/10"
                                    >
                                        <X size={16} />
                                    </button>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}