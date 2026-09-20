import { Plus } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import { uploadCloudinaryImage } from "@/api/cloudinaryApi";
import ImageDropzone from "./ui/ImageDropzone";
import TextField from "./ui/TextField";
import TextAreaField from "./ui/TextAreaField";

export default function AddForm({ fields, onSubmit, schema }) {
    const [values, setValues] = useState({});
    const [errors, setErrors] = useState({});
    const [uploading, setUploading] = useState(false);

    const setValue = (name, value) => {
        setValues((old) => ({ ...old, [name]: value }));
        setErrors((old) => {
            if (!old[name]) return old;
            const next = { ...old };
            delete next[name];
            return next;
        });
    };

    const submit = async (e) => {
        e.preventDefault();

        let data = { ...values };

        // Upload step — the only place a network error can occur here
        try {
            setUploading(true);
            for (const field of fields.filter((item) => item.image)) {
                if (values[field.name] instanceof File) {
                    data[field.name] = (await uploadCloudinaryImage(values[field.name])).url;
                }
            }
        } catch (error) {
            setUploading(false);
            toast.error(error.message || "Image upload failed");
            return;
        }

        // Validation — surfaces per-field, never as a toast
        const result = schema?.safeParse(data);
        if (result && !result.success) {
            const fieldErrors = {};
            result.error.issues.forEach((issue) => {
                const key = issue.path[0];
                if (key && !fieldErrors[key]) fieldErrors[key] = issue.message;
            });
            setErrors(fieldErrors);
            setUploading(false);
            return;
        }

        setUploading(false);
        onSubmit(result?.data ?? data, () => {
            setValues({});
            setErrors({});
        });
    };

    return (
        <form onSubmit={submit} className="mt-3 grid gap-3 sm:grid-cols-2">
            {
                fields.map(({ name, label, type = "text", image = false, textarea = false, span }) => {
                    const error = errors[name];
                    const className = span === 2 ? "sm:col-span-2" : "";

                    if (image) {
                        return (
                            <div key={name} className="sm:col-span-2">
                                <ImageDropzone
                                    label={label}
                                    file={values[name]}
                                    onChange={(file) => setValue(name, file)}
                                />
                                {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
                            </div>
                        );
                    }

                    if (textarea) {
                        return (
                            <TextAreaField
                                key={name}
                                label={label}
                                value={values[name]}
                                onChange={(v) => setValue(name, v)}
                                error={error}
                                className="sm:col-span-2"
                            />
                        );
                    }

                    return (
                        <TextField
                            key={name}
                            label={label}
                            type={type}
                            value={values[name]}
                            onChange={(v) => setValue(name, v)}
                            error={error}
                            className={className}
                        />
                    );
                })
            }

            <div className="sm:col-span-2">
                <button
                    disabled={uploading}
                    className="inline-flex items-center gap-1.5 rounded-md bg-gray-800 px-4 py-2 text-xs font-semibold text-white transition hover:bg-gray-900 disabled:opacity-50"
                >
                    <Plus className="h-3.5 w-3.5" />
                    {uploading ? "Uploading…" : "Add"}
                </button>
            </div>
        </form>
    );
}