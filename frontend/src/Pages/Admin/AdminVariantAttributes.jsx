import VariantAttributesManager from "@/components/Admin/Catalog/VariantAttributesManager";
import { PageHeader } from "./adminUi";

export default function AdminVariantAttributes() {
    return (
        <div>
            <PageHeader
                title="Variant attributes"
                description="Define attribute types (Color, Storage) and their values."
            />
            <VariantAttributesManager />
        </div>
    );
}