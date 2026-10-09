import CheckboxPillGroup from "../CheckboxPillGroup/CheckboxPillGroup";

// Convert an attribute type from the API into the shape CheckboxPillGroup expects
const toOption = (type) => ({ value: type.id, label: type.name });

export default function AttributeTypeSection({ attributeTypes, selectedIds, onToggle }) {
    return (
        <CheckboxPillGroup
            options={attributeTypes.map(toOption)}
            selectedIds={selectedIds}
            onToggle={onToggle}
            empty="No attribute types found."
        />
    );
}