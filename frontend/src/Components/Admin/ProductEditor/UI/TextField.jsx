import FormField from "./FormField";
import { fieldClass } from "./inputStyles";

export default function TextField({
    label,
    value,
    onChange,
    onBlur,
    error,
    type = "text",
    className,
    placeholder,
}) {
    return (
        <FormField label={label} error={error} className={className}>
            <input
                type={type}
                value={value ?? ""}
                onChange={(e) => onChange(e.target.value)}
                onBlur={onBlur}
                placeholder={placeholder ?? label}
                className={fieldClass(error)}
            />
        </FormField>
    );
}