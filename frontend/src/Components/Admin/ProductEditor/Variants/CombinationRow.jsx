import { X } from "lucide-react";
import ImageDropzone from "../inputFields/ImageDropzone";
import { compactFieldClass } from "../inputFields/inputStyles";

export default function CombinationRow({ draftKey, draft, errors, updateDraft, onRemove }) {
    // One handler for all text/number inputs: the input's `name`
    // attribute tells us which draft field to update (sku, price, stockQty)
    const handleFieldChange = (e) => {
        updateDraft(draftKey, e.target.name, e.target.value);
    };

    // The dropzone gives us a File directly (not an event)
    const handleImageChange = (file) => {
        updateDraft(draftKey, "imageFile", file);
    };

    const handleRemove = () => onRemove(draftKey);

    return (
        <tr>
            {/* Attribute combination chips (e.g. Red, XL) */}
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
                    onChange={handleImageChange}
                />
            </td>

            <td className="px-3 py-2 align-top">
                <input
                    name="sku"
                    value={draft.sku}
                    onChange={handleFieldChange}
                    className={compactFieldClass(errors.sku)}
                />
                {errors.sku && <p className="mt-1 text-[11px] text-red-500">{errors.sku}</p>}
            </td>

            <td className="px-3 py-2 align-top">
                <input
                    name="price"
                    type="number"
                    value={draft.price}
                    onChange={handleFieldChange}
                    className={compactFieldClass(errors.price)}
                />
                {errors.price && <p className="mt-1 text-[11px] text-red-500">{errors.price}</p>}
            </td>

            <td className="px-3 py-2 align-top">
                <input
                    name="stockQty"
                    type="number"
                    value={draft.stockQty}
                    onChange={handleFieldChange}
                    className={compactFieldClass(errors.stockQty)}
                />
                {errors.stockQty && <p className="mt-1 text-[11px] text-red-500">{errors.stockQty}</p>}
            </td>

            {/* Remove this combination from the draft list */}
            <td className="px-3 py-2 align-top">
                <button
                    type="button"
                    onClick={handleRemove}
                    aria-label="Remove combination"
                    className="rounded p-1 text-red-500 hover:bg-red-50"
                >
                    <X size={14} />
                </button>
            </td>
        </tr>
    );
}