import { useDeleteVariant } from "@/hooks/useDeleteVariant";
import SectionCard from "../ui/SectionCard";
import VariantCard from "./VariantCard";

export default function ExistingVariantsList({ product, reload }) {
    const deleteVariantMutation = useDeleteVariant(reload);

    return (
        <SectionCard title="Existing variants">
            {!product.variants?.length ? (
                <p className="text-sm text-gray-500">No variants yet — add one below.</p>
            ) : (
                <div className="space-y-3">
                    {product.variants.map((variant) => (
                        <VariantCard
                            key={variant.id}
                            variant={variant}
                            reload={reload}
                            deleting={deleteVariantMutation.isPending}
                            onDelete={() => deleteVariantMutation.mutate(variant.id)}
                        />
                    ))}
                </div>
            )}
        </SectionCard>
    );
}