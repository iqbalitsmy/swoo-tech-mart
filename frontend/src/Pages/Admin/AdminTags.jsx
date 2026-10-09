import TagManager from "@/Components/Admin/Catalog/CatalogMananger/TagManager";
import PageHeader from "@/Components/Shared/Admin/PageHeader/PageHeader";

export default function AdminTags() {
    return (
        <div>
            <PageHeader title="Tags" description="Manage tags used to label products." />
            <TagManager />
        </div>
    );
}