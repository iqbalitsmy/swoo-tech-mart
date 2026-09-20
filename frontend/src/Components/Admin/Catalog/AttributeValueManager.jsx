import { useState } from "react";

import { useAttributeValues } from "@/hooks/useAttributeValues";

import { useCreateAttributeValue } from "@/hooks/admin/useCreateAttributeValue";
import { useUpdateAttributeValue } from "@/hooks/admin/useUpdateAttributeValue";
import { useDeleteAttributeValue } from "@/hooks/admin/useDeleteAttributeValue";
import { attributeValueSchema } from "@/validators/adminValidator";

import Card from "./ui/Card";
import CatalogForm from "./CatalogForm";
import CatalogList from "./CatalogList";

const toFormValues = (value) => ({
    label: value?.label ?? "",
    value: value?.value ?? "",
});

export default function AttributeValueManager({ attributeType }) {
    const isColorType = attributeType.name?.trim().toLowerCase() === "color";

    const values = useAttributeValues(attributeType.id);
    const createValue = useCreateAttributeValue();
    const updateValue = useUpdateAttributeValue();
    const deleteValue = useDeleteAttributeValue();

    const [editingItem, setEditingItem] = useState(null);

    const handleSubmit = async (data) => {
        if (editingItem) {
            await updateValue.mutateAsync({ id: editingItem.id, payload: data });
            setEditingItem(null);
        } else {
            await createValue.mutateAsync({ typeId: attributeType.id, payload: data });
        }
    };

    return (
        <div className="space-y-5">
            <Card title={editingItem ? "Edit value" : "Add value"}>
                <CatalogForm
                    key={editingItem?.id ?? "new"}
                    schema={attributeValueSchema}
                    fields={[
                        { key: "label", label: "Label" },
                        {
                            key: "value",
                            label: isColorType ? "Color" : "Value",
                            type: isColorType ? "color" : "text",
                        },
                    ]}
                    initialValues={editingItem ? toFormValues(editingItem) : undefined}
                    editingLabel={editingItem ? `"${editingItem.label}"` : null}
                    submitText={editingItem ? "Update" : "Add value"}
                    onSubmit={handleSubmit}
                    onCancelEdit={() => setEditingItem(null)}
                />
            </Card>

            <Card title="Values">
                <CatalogList
                    items={values.data}
                    renderItem={(item) => (
                        <>
                            {isColorType && (
                                <span
                                    className="h-5 w-5 shrink-0 rounded-full border border-gray-200"
                                    style={{ backgroundColor: item.value }}
                                    title={item.value}
                                />
                            )}
                            <span className="truncate text-gray-700">
                                {item.label}{" "}
                                <span className="text-gray-400">({item.value})</span>
                            </span>
                        </>
                    )}
                    onEdit={setEditingItem}
                    onRemove={(item) => deleteValue.mutate(item.id)}
                    removingId={deleteValue.isPending ? deleteValue.variables : null}
                />
            </Card>
        </div>
    );
}