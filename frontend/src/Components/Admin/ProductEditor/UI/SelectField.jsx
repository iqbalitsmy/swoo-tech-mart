import FormField from "./FormField";
import { fieldClass } from "./inputStyles";

export default function SelectField({
    label,
    value,
    onChange,
    error,
    options,
    placeholder,
    className,
}) {
    return (
        <FormField label={label} error={error} className={className}>
            <select
                value={value ?? ""}
                onChange={(e) => onChange(e.target.value)}
                className={fieldClass(error)}
            >
                {placeholder && <option value="">{placeholder}</option>}
                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
        </FormField>
    );
}