import { useMemo, useState } from "react";

// import { useCategories } from "@/hooks/admin/useCategories";
import { useCreateCategory } from "@/hooks/admin/useCreateCategory";
import { useUpdateCategory } from "@/hooks/admin/useUpdateCategory";
import { useDeleteCategory } from "@/hooks/admin/useDeleteCategory";
import { categorySchema } from "@/validators/adminValidator";

import Card from "./ui/Card";
import CatalogForm from "./CatalogForm";
import CatalogList from "./CatalogList";
import { useCategories } from "@/hooks/useCategory";

const toFormValues = (category) => ({
    name: category?.name ?? "",
    slug: category?.slug ?? "",
    parentCategoryId: category?.parentCategoryId ? String(category.parentCategoryId) : "",
});

export default function CategoryManager() {
    const categories = useCategories();
    const createCategory = useCreateCategory();
    const updateCategory = useUpdateCategory();
    const deleteCategory = useDeleteCategory();

    const [editingItem, setEditingItem] = useState(null);

    const categoriesById = useMemo(
        () => Object.fromEntries((categories.data ?? []).map((c) => [c.id, c])),
        [categories.data]
    );

    // A category can't be its own parent, so exclude it while editing
    const parentOptions = (categories.data ?? [])
        .filter((c) => c.id !== editingItem?.id)
        .map((c) => ({ value: String(c.id), label: c.name }));

    const handleSubmit = async (data) => {
        if (editingItem) {
            await updateCategory.mutateAsync({ id: editingItem.id, payload: data });
            setEditingItem(null);
        } else {
            await createCategory.mutateAsync(data);
        }
    };

    return (
        <div className="space-y-5">
            <Card
                title={editingItem ? "Edit category" : "Add category"}
                description="Parent category is optional."
            >
                <CatalogForm
                    key={editingItem?.id ?? "new"}
                    schema={categorySchema}
                    fields={[
                        { key: "name", label: "Name" },
                        { key: "slug", label: "Slug" },
                        {
                            key: "parentCategoryId",
                            label: "Parent category",
                            type: "select",
                            placeholder: "No parent",
                            options: parentOptions,
                        },
                    ]}
                    initialValues={editingItem ? toFormValues(editingItem) : undefined}
                    editingLabel={editingItem ? `"${editingItem.name}"` : null}
                    submitText={editingItem ? "Update" : "Add"}
                    onSubmit={handleSubmit}
                    onCancelEdit={() => setEditingItem(null)}
                />
            </Card>

            <Card title="Categories">
                <CatalogList
                    items={categories.data}
                    renderItem={(item) => (
                        <div className="min-w-0">
                            <p className="truncate text-gray-700">{item.name}</p>
                            {item.parentCategoryId && categoriesById[item.parentCategoryId] && (
                                <p className="text-xs text-gray-400">
                                    under {categoriesById[item.parentCategoryId].name}
                                </p>
                            )}
                        </div>
                    )}
                    onEdit={setEditingItem}
                    onRemove={(item) => deleteCategory.mutate(item.id)}
                    removingId={deleteCategory.isPending ? deleteCategory.variables : null}
                />
            </Card>
        </div>
    );
}