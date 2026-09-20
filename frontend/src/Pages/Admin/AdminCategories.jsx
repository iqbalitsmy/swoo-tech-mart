import { PageHeader } from "./adminUi";
import CategoryManager from "@/components/Admin/Catalog/CategoryManager";

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