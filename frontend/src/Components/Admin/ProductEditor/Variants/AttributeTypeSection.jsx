import CheckboxPillGroup from "../ui/CheckboxPillGroup";

export default function AttributeTypeSection({ attributeTypes, selectedIds, onToggle }) {
    return (
        <CheckboxPillGroup
            options={attributeTypes.map((type) => ({ value: type.id, label: type.name }))}
            selectedIds={selectedIds}
            onToggle={onToggle}
            empty="No attribute types found."
        />
    );
}