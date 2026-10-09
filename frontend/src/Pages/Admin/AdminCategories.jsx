// import { PageHeader } from "./adminUi";
import CategoryManager from "@/Components/Admin/Catalog/CatalogMananger/CategoryManager";
import PageHeader from "@/Components/Shared/Admin/PageHeader/PageHeader";

export default function AdminCategories() {
    return (
        <div>
            <PageHeader
                title="Categories"
                description="Organize products into categories and optional subcategories."
            />
            <CategoryManager />
        </div>
    );
}