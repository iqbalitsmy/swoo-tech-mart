import { useDeleteVariant } from "@/hooks/admin/useDeleteVariant";
import VariantCard from "./VariantCard";

export default function ExistingVariantsList({ product, reload }) {
  const deleteVariantMutation = useDeleteVariant(reload);

  // Shared by every VariantCard; each card passes its own variant id
  const handleDelete = (variantId) => deleteVariantMutation.mutate(variantId);

  return (
    // Card wrapper (was SectionCard)
    <div className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm">
      <h4 className="font-semibold text-gray-800">Existing variants</h4>

      <div className="mt-4">
        {!product.variants?.length ? (
          <p className="text-sm text-gray-500">
            No variants yet — add one below.
          </p>
        ) : (
          <div className="space-y-3">
            {product.variants.map((variant) => (
              <VariantCard
                key={variant.id}
                variant={variant}
                reload={reload}
                // Only the variant being deleted shows the disabled state
                deleting={
                  deleteVariantMutation.isPending &&
                  deleteVariantMutation.variables === variant.id
                }
                onDelete={handleDelete}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
