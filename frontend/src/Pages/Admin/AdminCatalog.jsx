
import CategoryPanel from "@/components/Admin/Catalog/CategoryPanel";
import BrandPanel from "@/components/Admin/Catalog/BrandPanel";
import TagPanel from "@/components/Admin/Catalog/TagPanel";
import AttributePanel from "@/components/Admin/Catalog/AttributePanel";
import { PageHeader } from "./adminUi";

export default function AdminCatalog() {
  return (
    <div>
      <PageHeader
        title="Catalog setup"
        description="Manage the building blocks used by products and variants."
      />

      <div className="grid gap-5 lg:grid-cols-2">
        <CategoryPanel />
        {/* <BrandPanel />
        <TagPanel />
        <AttributePanel /> */}
      </div>
    </div>
  );
}