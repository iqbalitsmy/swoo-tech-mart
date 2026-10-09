import VariantAttributesManager from "@/Components/Admin/Catalog/CatalogMananger/VariantAttributesManager";
import PageHeader from "@/Components/Shared/Admin/PageHeader/PageHeader";

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