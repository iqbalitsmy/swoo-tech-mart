import { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";


import { useCreateAttributeType } from "@/hooks/admin/useCreateAttributeType";
import { useUpdateAttributeType } from "@/hooks/admin/useUpdateAttributeType";
import { useDeleteAttributeType } from "@/hooks/admin/useDeleteAttributeType";
import { attributeTypeSchema } from "@/validators/adminValidator";

import Card from "./ui/Card";
import CatalogForm from "./CatalogForm";
import CatalogList from "./CatalogList";
import { useAttributeTypes } from "@/hooks/useAttributeTypes";

const toFormValues = (type) => ({ name: type?.name ?? "" });

export default function VariantAttributesManager() {
    const types = useAttributeTypes();
    const createType = useCreateAttributeType();
    const updateType = useUpdateAttributeType();
    const deleteType = useDeleteAttributeType();

    const [editingItem, setEditingItem] = useState(null);

    const handleSubmit = async (data) => {
        if (editingItem) {
            await updateType.mutateAsync({ id: editingItem.id, payload: data });
            setEditingItem(null);
        } else {
            await createType.mutateAsync(data);
        }
    };

    return (
        <div className="space-y-5">
            <Card title={editingItem ? "Edit attribute type" : "Add attribute type"}>
                <CatalogForm
                    key={editingItem?.id ?? "new"}
                    schema={attributeTypeSchema}
                    fields={[{ key: "name", label: "Attribute name (e.g. Color)" }]}
                    initialValues={editingItem ? toFormValues(editingItem) : undefined}
                    editingLabel={editingItem ? `"${editingItem.name}"` : null}
                    submitText={editingItem ? "Update" : "Add type"}
                    onSubmit={handleSubmit}
                    onCancelEdit={() => setEditingItem(null)}
                />
            </Card>

            <Card title="Attribute types" description="Select one to manage its values.">
                <CatalogList
                    items={types.data}
                    renderItem={(item) => (
                        <Link
                            to={`/admin/catalog/variants/${item.id}/values`}
                            className="flex min-w-0 items-center gap-1 truncate text-gray-700 hover:text-primary"
                        >
                            <span className="truncate">{item.name}</span>
                            <ChevronRight className="h-3.5 w-3.5 shrink-0 text-gray-300" />
                        </Link>
                    )}
                    onEdit={setEditingItem}
                    onRemove={(item) => deleteType.mutate(item.id)}
                    removingId={deleteType.isPending ? deleteType.variables : null}
                />
            </Card>
        </div>
    );
}