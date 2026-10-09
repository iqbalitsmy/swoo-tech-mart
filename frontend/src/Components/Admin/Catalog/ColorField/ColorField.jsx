import FormField from "../../ProductEditor/inputFields/FormField";


const isValidHex = (value) => /^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/.test(value ?? "");

export default function ColorField({ label, value, onChange, onBlur, error, className }) {
    const pickerValue = isValidHex(value) ? value : "#000000";

    return (
        <FormField label={label} error={error} className={className}>
            <div className="flex items-center gap-2">
                <input
                    type="color"
                    value={pickerValue}
                    onChange={(e) => onChange(e.target.value)}
                    onBlur={onBlur}
                    className="h-9 w-10 shrink-0 cursor-pointer rounded border border-gray-200 bg-white p-1"
                />
                <input
                    type="text"
                    value={value ?? ""}
                    onChange={(e) => onChange(e.target.value)}
                    onBlur={onBlur}
                    placeholder="#000000"
                    className={`w-full rounded-md border px-3 py-2 text-sm text-gray-800 transition placeholder:text-gray-400 focus:outline-none focus:ring-2 ${error
                            ? "border-red-300 focus:border-red-400 focus:ring-red-100"
                            : "border-gray-200 focus:border-primary focus:ring-primary/15"
                        }`}
                />
            </div>
        </FormField>
    );
}