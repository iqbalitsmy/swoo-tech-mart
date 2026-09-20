import { useCreateBrand } from "@/hooks/admin/useCreateBrand";
import { useDeleteBrand } from "@/hooks/admin/useDeleteBrand";
import { brandSchema } from "@/validators/adminValidator";
import Panel from "./Panel";
import CatalogAddForm from "./CatalogAddForm";
import CatalogList from "./CatalogList";
import { useBrands } from "@/hooks/useBrands";

export default function BrandPanel() {
    const brands = useBrands();
    const createBrand = useCreateBrand();
    const deleteBrand = useDeleteBrand();

    return (
        <Panel title="Brands">
            <CatalogAddForm
                schema={brandSchema}
                fields={[
                    { key: "name", label: "Name" },
                    { key: "slug", label: "Slug" },
                    { key: "logoUrl", label: "Logo URL", required: false },
                ]}
                isPending={createBrand.isPending}
                onSubmit={(data, reset) => createBrand.mutate(data, { onSuccess: reset })}
            />

            <CatalogList
                items={brands.data}
                render={(item) => item.name}
                onRemove={(item) => deleteBrand.mutate(item.id)}
                removingId={deleteBrand.isPending ? deleteBrand.variables : null}
            />
        </Panel>
    );
}