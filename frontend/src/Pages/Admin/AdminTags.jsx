import { PageHeader } from "./adminUi";
import TagManager from "@/components/Admin/Catalog/TagManager";

export default function AdminTags() {
    return (
        <div>
            <PageHeader title="Tags" description="Manage tags used to label products." />
            <TagManager />
        </div>
    );
}