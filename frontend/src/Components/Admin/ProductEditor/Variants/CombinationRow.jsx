import { X } from "lucide-react";
import ImageDropzone from "../ui/ImageDropzone";
import { compactFieldClass } from "../UI/inputStyles";

export default function CombinationRow({ draftKey, draft, errors, updateDraft, onRemove }) {
    return (
        <tr>
            <td className="px-3 py-2 align-top">
                <div className="flex flex-wrap gap-1">
                    {draft.combo.map((c) => (
                        <span
                            key={c.attributeTypeId}
                            className="rounded-full border border-gray-200 bg-white px-2 py-0.5 text-[11px] text-gray-600"
                        >
                            {c.label}
                        </span>
                    ))}
                </div>
            </td>

            <td className="px-3 py-2 align-top">
                <ImageDropzone
                    compact
                    label="Image"
                    file={draft.imageFile}
                    onChange={(file) => updateDraft(draftKey, "imageFile", file)}
                />
            </td>

            <td className="px-3 py-2 align-top">
                <input
                    value={draft.sku}
                    onChange={(e) => updateDraft(draftKey, "sku", e.target.value)}
                    className={compactFieldClass(errors.sku)}
                />
                {errors.sku && <p className="mt-1 text-[11px] text-red-500">{errors.sku}</p>}
            </td>

            <td className="px-3 py-2 align-top">
                <input
                    type="number"
                    value={draft.price}
                    onChange={(e) => updateDraft(draftKey, "price", e.target.value)}
                    className={compactFieldClass(errors.price)}
                />
                {errors.price && <p className="mt-1 text-[11px] text-red-500">{errors.price}</p>}
            </td>

            <td className="px-3 py-2 align-top">
                <input
                    type="number"
                    value={draft.stockQty}
                    onChange={(e) => updateDraft(draftKey, "stockQty", e.target.value)}
                    className={compactFieldClass(errors.stockQty)}
                />
                {errors.stockQty && <p className="mt-1 text-[11px] text-red-500">{errors.stockQty}</p>}
            </td>

            <td className="px-3 py-2 align-top">
                <button type="button" onClick={onRemove} className="rounded p-1 text-red-500 hover:bg-red-50">
                    <X size={14} />
                </button>
            </td>
        </tr>
    );
}