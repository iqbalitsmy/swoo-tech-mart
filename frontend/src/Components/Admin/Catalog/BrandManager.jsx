import { useState } from "react";

// import { useBrands } from "@/hooks/admin/useBrands";
import { useCreateBrand } from "@/hooks/admin/useCreateBrand";
import { useUpdateBrand } from "@/hooks/admin/useUpdateBrand";
import { useDeleteBrand } from "@/hooks/admin/useDeleteBrand";
import { brandSchema } from "@/validators/adminValidator";

import Card from "./ui/Card";
import CatalogForm from "./CatalogForm";
import CatalogList from "./CatalogList";
import { useBrands } from "@/hooks/useBrands";

const toFormValues = (brand) => ({
    name: brand?.name ?? "",
    slug: brand?.slug ?? "",
    logoUrl: brand?.logoUrl ?? null,
});

export default function BrandManager() {
    const brands = useBrands();
    const createBrand = useCreateBrand();
    const updateBrand = useUpdateBrand();
    const deleteBrand = useDeleteBrand();

    const [editingItem, setEditingItem] = useState(null);

    const handleSubmit = async (data) => {
        if (editingItem) {
            await updateBrand.mutateAsync({ id: editingItem.id, payload: data });
            setEditingItem(null);
        } else {
            await createBrand.mutateAsync(data);
        }
    };

    return (
        <div className="space-y-5">
            <Card title={editingItem ? "Edit brand" : "Add brand"} description="Logo is optional.">
                <CatalogForm
                    key={editingItem?.id ?? "new"}
                    schema={brandSchema}
                    fields={[
                        { key: "name", label: "Name" },
                        { key: "slug", label: "Slug" },
                        { key: "logoUrl", label: "Logo", type: "image" },
                    ]}
                    initialValues={editingItem ? toFormValues(editingItem) : undefined}
                    editingLabel={editingItem ? `"${editingItem.name}"` : null}
                    submitText={editingItem ? "Update" : "Add"}
                    onSubmit={handleSubmit}
                    onCancelEdit={() => setEditingItem(null)}
                />
            </Card>

            <Card title="Brands">
                <CatalogList
                    items={brands.data}
                    renderItem={(item) => (
                        <>
                            {item.logoUrl ? (
                                <img
                                    src={item.logoUrl}
                                    alt={item.name}
                                    className="h-8 w-8 shrink-0 rounded border border-gray-200 object-cover"
                                />
                            ) : (
                                <div className="h-8 w-8 shrink-0 rounded border border-dashed border-gray-200 bg-gray-50" />
                            )}
                            <span className="truncate text-gray-700">{item.name}</span>
                        </>
                    )}
                    onEdit={setEditingItem}
                    onRemove={(item) => deleteBrand.mutate(item.id)}
                    removingId={deleteBrand.isPending ? deleteBrand.variables : null}
                />
            </Card>
        </div>
    );
}