import { Plus, X } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import { uploadCloudinaryImage } from "@/api/cloudinaryApi";
import { useValidatedForm } from "@/hooks/useValidatedForm";
import TextField from "@/components/Admin/ProductEditor/ui/TextField";
import SelectField from "@/components/Admin/ProductEditor/ui/SelectField";
import ImageDropzone from "@/components/Admin/ProductEditor/ui/ImageDropzone";
import ColorField from "./ui/ColorField";

export default function CatalogForm({
    schema,
    fields,
    initialValues,
    editingLabel,
    submitText = "Add",
    onSubmit,
    onCancelEdit,
}) {
    const emptyValues = Object.fromEntries(
        fields.map((f) => [f.key, f.type === "image" ? null : ""])
    );

    const { values, errors, setValue, handleBlur, touchAll, validate, reset } = useValidatedForm(
        schema,
        initialValues ?? emptyValues
    );

    const [submitting, setSubmitting] = useState(false);

    const submit = async (event) => {
        event.preventDefault();
        touchAll();
        setSubmitting(true);

        const payload = { ...values };

        try {
            for (const field of fields.filter((f) => f.type === "image")) {
                if (values[field.key] instanceof File) {
                    payload[field.key] = (await uploadCloudinaryImage(values[field.key])).url;
                }
            }
        } catch (error) {
            toast.error(error.message || "Image upload failed");
            setSubmitting(false);
            return;
        }

        const data = validate(payload);
        if (!data) {
            setSubmitting(false);
            return;
        }

        try {
            await onSubmit(data);
            reset(emptyValues);
        } catch {
            // Failure already surfaced by the mutation's onError toast
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <form onSubmit={submit} className="space-y-3">
            {editingLabel && (
                <div className="flex items-center justify-between rounded-md bg-primary/5 px-3 py-2 text-xs font-medium text-primary">
                    Editing {editingLabel}
                    <button
                        type="button"
                        onClick={onCancelEdit}
                        className="flex items-center gap-1 text-gray-500 hover:text-gray-700"
                    >
                        <X className="h-3.5 w-3.5" />
                        Cancel
                    </button>
                </div>
            )}

            <div className="flex flex-wrap items-start gap-3">
                {fields.map((field) => {
                    if (field.type === "select") {
                        return (
                            <SelectField
                                key={field.key}
                                label={field.label}
                                value={values[field.key]}
                                onChange={(v) => setValue(field.key, v)}
                                error={errors[field.key]}
                                placeholder={field.placeholder}
                                options={field.options}
                                className="min-w-44 flex-1"
                            />
                        );
                    }

                    if (field.type === "image") {
                        return (
                            <div key={field.key} className="w-full sm:w-56">
                                <span className="mb-1 block text-xs font-medium text-gray-600">
                                    {field.label}
                                </span>
                                <ImageDropzone
                                    label={field.label}
                                    file={values[field.key] instanceof File ? values[field.key] : null}
                                    previewUrl={
                                        typeof values[field.key] === "string" ? values[field.key] : null
                                    }
                                    onChange={(file) => setValue(field.key, file)}
                                    compact
                                />
                                {errors[field.key] && (
                                    <p className="mt-1 text-xs text-red-500">{errors[field.key]}</p>
                                )}
                            </div>
                        );
                    }

                    if (field.type === "color") {
                        return (
                            <ColorField
                                key={field.key}
                                label={field.label}
                                value={values[field.key]}
                                onChange={(v) => setValue(field.key, v)}
                                onBlur={() => handleBlur(field.key)}
                                error={errors[field.key]}
                                className="min-w-48 flex-1"
                            />
                        );
                    }

                    return (
                        <TextField
                            key={field.key}
                            label={field.label}
                            value={values[field.key]}
                            onChange={(v) => setValue(field.key, v)}
                            onBlur={() => handleBlur(field.key)}
                            error={errors[field.key]}
                            className="min-w-36 flex-1"
                        />
                    );
                })}

                <button
                    disabled={submitting}
                    className="mt-5 flex items-center gap-1.5 rounded-md bg-primary px-3.5 py-2 text-sm font-semibold text-white transition hover:bg-primary/90 disabled:opacity-50"
                >
                    <Plus className="h-4 w-4" />
                    {submitting ? "Saving…" : submitText}
                </button>
            </div>
        </form>
    );
}