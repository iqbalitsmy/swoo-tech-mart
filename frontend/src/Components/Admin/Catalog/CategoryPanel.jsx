// import { useCategories } from "@/hooks/admin/useCategories";
import { useCreateCategory } from "@/hooks/admin/useCreateCategory";
import { useDeleteCategory } from "@/hooks/admin/useDeleteCategory";
import { categorySchema } from "@/validators/adminValidator";
import Panel from "./Panel";
import CatalogAddForm from "./CatalogAddForm";
import CatalogList from "./CatalogList";
import { useCategories } from "@/hooks/useCategory";

export default function CategoryPanel() {
    const categories = useCategories();
    const createCategory = useCreateCategory();
    const deleteCategory = useDeleteCategory();

    return (
        <Panel title="Categories">
            <CatalogAddForm
                schema={categorySchema}
                fields={[
                    { key: "name", label: "Name" },
                    { key: "slug", label: "Slug" },
                ]}
                isPending={createCategory.isPending}
                onSubmit={(data, reset) =>
                    createCategory.mutate({ ...data, parentCategoryId: null }, { onSuccess: reset })
                }
            />

            <CatalogList
                items={categories.data}
                render={(item) => item.name}
                onRemove={(item) => deleteCategory.mutate(item.id)}
                removingId={deleteCategory.isPending ? deleteCategory.variables : null}
            />
        </Panel>
    );
}