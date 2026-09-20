import { attributeValueSchema } from "@/validators/adminValidator";
import CatalogAddForm from "./CatalogAddForm";
import CatalogList from "./CatalogList";
import { useAttributeValues } from "@/hooks/useAttributeValues";
import { useCreateAttributeValue } from "@/hooks/admin/useCreateAttributeValue";
import { useDeleteAttributeValue } from "@/hooks/admin/useDeleteAttributeValue";

export default function AttributeValuesSection({ typeId }) {
    const values = useAttributeValues(typeId);
    const createValue = useCreateAttributeValue();
    const deleteValue = useDeleteAttributeValue();

    return (
        <>
            <CatalogAddForm
                schema={attributeValueSchema}
                submitText="Add value"
                fields={[
                    { key: "label", label: "Label" },
                    { key: "value", label: "Value" },
                ]}
                isPending={createValue.isPending}
                onSubmit={(data, reset) =>
                    createValue.mutate({ typeId, payload: data }, { onSuccess: reset })
                }
            />

            <CatalogList
                items={values.data}
                render={(item) => `${item.label} (${item.value})`}
                onRemove={(item) => deleteValue.mutate(item.id)}
                removingId={deleteValue.isPending ? deleteValue.variables : null}
            />
        </>
    );
}