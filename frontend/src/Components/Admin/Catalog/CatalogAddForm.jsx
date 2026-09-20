import { Plus } from "lucide-react";
import { useValidatedForm } from "@/hooks/useValidatedForm";
import TextField from "@/components/Admin/ProductEditor/ui/TextField";

export default function CatalogAddForm({ schema, fields, submitText = "Add", onSubmit, isPending }) {
    const initialValues = Object.fromEntries(fields.map((f) => [f.key, ""]));
    const { values, errors, setValue, handleBlur, handleSubmit, reset } = useValidatedForm(
        schema,
        initialValues
    );

    const submit = handleSubmit((data) => onSubmit(data, reset));

    return (
        <form onSubmit={submit} className="mt-4 flex flex-wrap items-start gap-2">
            {fields.map((field) => (
                <TextField
                    key={field.key}
                    label={field.label}
                    value={values[field.key]}
                    onChange={(v) => setValue(field.key, v)}
                    onBlur={() => handleBlur(field.key)}
                    error={errors[field.key]}
                    className="min-w-32 flex-1"
                />
            ))}

            <button
                disabled={isPending}
                className="mt-0.5 flex items-center gap-1.5 rounded-md bg-primary px-3.5 py-2 text-sm font-semibold text-white transition hover:bg-primary/90 disabled:opacity-50"
            >
                <Plus className="h-4 w-4" />
                {isPending ? "Saving…" : submitText}
            </button>
        </form>
    );
}