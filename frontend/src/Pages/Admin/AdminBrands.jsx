import { PageHeader } from "./adminUi";
import BrandManager from "@/components/Admin/Catalog/BrandManager";

export default function AdminBrands() {
    return (
        <div>
            <PageHeader title="Brands" description="Manage the brands products can be assigned to." />
            <BrandManager />
        </div>
    );
}