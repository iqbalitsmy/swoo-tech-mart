import FormField from "./FormField";
import { fieldClass } from "./inputStyles";

export default function TextAreaField({ label, value, onChange, error, className, placeholder }) {
    return (
        <FormField label={label} error={error} className={className}>
            <textarea
                value={value ?? ""}
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder ?? label}
                className={`${fieldClass(error)} min-h-32 resize-y`}
            />
        </FormField>
    );
}