import { useState } from "react";
// import { useAttributeTypes } from "@/hooks/admin/useAttributeTypes";
// import { useCreateAttributeType } from "@/hooks/admin/useCreateAttributeType";
import { attributeTypeSchema } from "@/validators/adminValidator";
import Panel from "./Panel";
import CatalogAddForm from "./CatalogAddForm";
import AttributeTypeSelect from "./AttributeTypeSelect";
import AttributeValuesSection from "./AttributeValuesSection";
import { useAttributeTypes } from "@/hooks/useAttributeTypes";
import { useCreateAttributeType } from "@/hooks/admin/useCreateAttributeType";

export default function AttributePanel() {
    const [typeId, setTypeId] = useState("");
    const types = useAttributeTypes();
    const createType = useCreateAttributeType();

    return (
        <Panel title="Variant attributes">
            <CatalogAddForm
                schema={attributeTypeSchema}
                submitText="Add type"
                fields={[{ key: "name", label: "Attribute name (e.g. Color)" }]}
                isPending={createType.isPending}
                onSubmit={(data, reset) => createType.mutate(data, { onSuccess: reset })}
            />

            <AttributeTypeSelect types={types.data} value={typeId} onChange={setTypeId} />

            {typeId && <AttributeValuesSection typeId={typeId} />}
        </Panel>
    );
}