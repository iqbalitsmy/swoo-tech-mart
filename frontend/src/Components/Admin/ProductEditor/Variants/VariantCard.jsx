import { variantImageSchema } from "@/validators/productValidator";
import AddForm from "../AddForm";
import { useAddVariantImage } from "@/hooks/useAddVariantImage";

export default function VariantCard({ variant, reload, deleting, onDelete }) {
    const addImageMutation = useAddVariantImage(reload);

    return (
        <div className="rounded-md border border-gray-200 bg-gray-50 p-3">
            <div className="flex items-start justify-between gap-4">
                <div className="space-y-1">
                    <p className="text-sm font-semibold text-gray-800">{variant.sku}</p>
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                        <span>{variant.price}</span>
                        <span>•</span>
                        <span>{variant.stockQty} in stock</span>
                    </div>

                    {variant.attributes?.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 pt-1">
                            {variant.attributes.map((attribute) => (
                                <span
                                    key={attribute.id}
                                    className="rounded-full border border-gray-200 bg-white px-2 py-0.5 text-[11px] text-gray-600"
                                >
                                    {attribute.name}
                                </span>
                            ))}
                        </div>
                    )}
                </div>

                <button
                    type="button"
                    disabled={deleting}
                    onClick={onDelete}
                    className="shrink-0 rounded-md border border-gray-200 px-3 py-1.5 text-xs font-medium text-red-500 hover:bg-red-50 disabled:opacity-50"
                >
                    Delete
                </button>
            </div>

            {/* Image preview */}
            <div className="mt-3 grid grid-cols-4 gap-2 sm:grid-cols-6">
                {variant.images?.map((image) => (
                    <img
                        key={image.id}
                        src={image.url}
                        alt={variant.sku}
                        className="aspect-square w-full rounded-md border border-gray-200 bg-white object-cover"
                    />
                ))}

                {!variant.images?.length && (
                    <p className="col-span-full py-2 text-xs text-gray-400">No images yet.</p>
                )}
            </div>

            <div className="mt-3 border-t border-gray-100 pt-3">
                <AddForm
                    schema={variantImageSchema}
                    fields={[
                        { name: "url", label: "Select variant image", image: true },
                        { name: "sortOrder", label: "Order", type: "number" },
                    ]}
                    onSubmit={(data, reset) =>
                        addImageMutation.mutate(
                            { variantId: variant.id, data: { url: data.url, sortOrder: Number(data.sortOrder || 0) } },
                            { onSuccess: reset }
                        )
                    }
                />
            </div>
        </div>
    );
}