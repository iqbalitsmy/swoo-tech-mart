import { useCreateTag } from "@/hooks/admin/useCreateTag";
import { useDeleteTag } from "@/hooks/admin/useDeleteTag";
import { tagSchema } from "@/validators/adminValidator";
import Panel from "./Panel";
import CatalogAddForm from "./CatalogAddForm";
import CatalogList from "./CatalogList";
import { useTags } from "@/hooks/useTags";

export default function TagPanel() {
    const tags = useTags();
    const createTag = useCreateTag();
    const deleteTag = useDeleteTag();

    return (
        <Panel title="Tags">
            <CatalogAddForm
                schema={tagSchema}
                fields={[{ key: "label", label: "Tag label" }]}
                isPending={createTag.isPending}
                onSubmit={(data, reset) => createTag.mutate(data, { onSuccess: reset })}
            />

            <CatalogList
                items={tags.data}
                render={(item) => item.label}
                onRemove={(item) => deleteTag.mutate(item.id)}
                removingId={deleteTag.isPending ? deleteTag.variables : null}
            />
        </Panel>
    );
}