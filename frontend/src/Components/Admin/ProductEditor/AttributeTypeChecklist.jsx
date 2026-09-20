export default function AttributeTypeChecklist({ attributeTypes, selectedIds, onToggle }) {
    if (!attributeTypes.length) {
        return <p className="text-sm text-gray-400">No attribute types found.</p>;
    }

    return (
        <div className="flex flex-wrap gap-2">
            {attributeTypes.map((type) => (
                <label key={type.id} className="rounded-full border px-2 py-1 text-xs">
                    <input
                        type="checkbox"
                        className="mr-1"
                        checked={selectedIds.includes(type.id)}
                        onChange={() => onToggle(type.id)}
                    />
                    {type.name}
                </label>
            ))}
        </div>
    );
}