import { ArrowLeft } from "lucide-react";
import { Link, useParams } from "react-router-dom";

import { Feedback, PageHeader } from "./adminUi";
import AttributeValueManager from "@/components/Admin/Catalog/AttributeValueManager";
import { useAttributeTypes } from "@/hooks/useAttributeTypes";

export default function AdminVariantValues() {
    const { typeId } = useParams();
    const types = useAttributeTypes();

    const attributeType = types.data?.find((t) => String(t.id) === typeId);

    return (
        <div>
            <PageHeader
                title={attributeType ? `${attributeType.name} values` : "Attribute values"}
                description="Manage the selectable values for this attribute type."
                action={
                    <Link
                        to="/admin/catalog/variants"
                        className="flex items-center gap-1 text-sm text-gray-500 hover:text-primary"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        Attribute types
                    </Link>
                }
            />

            <Feedback loading={types.isLoading} error={types.error}>
                {attributeType ? (
                    <AttributeValueManager attributeType={attributeType} />
                ) : (
                    <p className="text-sm text-gray-500">Attribute type not found.</p>
                )}
            </Feedback>
        </div>
    );
}