export default function AttributeTypeSelect({ types, value, onChange }) {
    return (
        <select
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="mt-4 w-full rounded-md border border-gray-200 px-3 py-2 text-sm text-gray-800 transition focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/15"
        >
            <option value="">Select an attribute type</option>
            {types?.map((item) => (
                <option key={item.id} value={item.id}>
                    {item.name}
                </option>
            ))}
        </select>
    );
}