// import { PageHeader } from "./adminUi";
import BrandManager from "@/Components/Admin/Catalog/CatalogMananger/BrandManager";
import PageHeader from "@/Components/Shared/Admin/PageHeader/PageHeader";

export default function AdminBrands() {
    return (
        <div>
            <PageHeader title="Brands" description="Manage the brands products can be assigned to." />
            <BrandManager />
        </div>
    );
}