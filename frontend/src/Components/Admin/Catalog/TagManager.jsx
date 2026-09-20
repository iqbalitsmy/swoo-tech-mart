import { useState } from "react";

// import { useTags } from "@/hooks/admin/useTags";
import { useCreateTag } from "@/hooks/admin/useCreateTag";
import { useUpdateTag } from "@/hooks/admin/useUpdateTag";
import { useDeleteTag } from "@/hooks/admin/useDeleteTag";
import { tagSchema } from "@/validators/adminValidator";

import Card from "./ui/Card";
import CatalogForm from "./CatalogForm";
import CatalogList from "./CatalogList";
import { useTags } from "@/hooks/useTags";

const toFormValues = (tag) => ({ label: tag?.label ?? "" });

export default function TagManager() {
    const tags = useTags();
    const createTag = useCreateTag();
    const updateTag = useUpdateTag();
    const deleteTag = useDeleteTag();

    const [editingItem, setEditingItem] = useState(null);

    const handleSubmit = async (data) => {
        if (editingItem) {
            await updateTag.mutateAsync({ id: editingItem.id, payload: data });
            setEditingItem(null);
        } else {
            await createTag.mutateAsync(data);
        }
    };

    return (
        <div className="space-y-5">
            <Card title={editingItem ? "Edit tag" : "Add tag"}>
                <CatalogForm
                    key={editingItem?.id ?? "new"}
                    schema={tagSchema}
                    fields={[{ key: "label", label: "Tag label" }]}
                    initialValues={editingItem ? toFormValues(editingItem) : undefined}
                    editingLabel={editingItem ? `"${editingItem.label}"` : null}
                    submitText={editingItem ? "Update" : "Add"}
                    onSubmit={handleSubmit}
                    onCancelEdit={() => setEditingItem(null)}
                />
            </Card>

            <Card title="Tags">
                <CatalogList
                    items={tags.data}
                    renderItem={(item) => <span className="truncate text-gray-700">{item.label}</span>}
                    onEdit={setEditingItem}
                    onRemove={(item) => deleteTag.mutate(item.id)}
                    removingId={deleteTag.isPending ? deleteTag.variables : null}
                />
            </Card>
        </div>
    );
}