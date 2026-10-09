import { ImagePlus } from "lucide-react";

export default function ImageDropzone({ label, file, previewUrl, onChange, compact = false }) {
    const displaySrc = file instanceof File ? URL.createObjectURL(file) : previewUrl || null;

    return (
        <label
            className={`group grid cursor-pointer place-items-center rounded-lg border-2 border-dashed border-gray-200 bg-gray-50 text-center transition hover:border-primary/60 hover:bg-primary/5 ${compact ? "px-3 py-3" : "px-4 py-5"
                }`}
        >
            {displaySrc ? (
                <img
                    src={displaySrc}
                    alt="Selected upload"
                    className={compact ? "h-12 w-12 rounded-md object-cover" : "h-24 w-24 rounded-md object-cover"}
                />
            ) : (
                <ImagePlus
                    className={
                        compact
                            ? "h-5 w-5 text-gray-400 transition group-hover:text-primary"
                            : "h-9 w-9 text-gray-400 transition group-hover:text-primary"
                    }
                />
            )}

            <span className={compact ? "mt-1 text-xs font-medium text-gray-600" : "mt-2 text-sm font-medium text-gray-600"}>
                {file instanceof File ? file.name : label}
            </span>

            {!compact && <span className="mt-1 text-xs text-gray-400">PNG, JPG, or WEBP</span>}

            <input
                type="file"
                accept="image/*"
                className="sr-only"
                onChange={(e) => onChange(e.target.files?.[0] ?? null)}
            />
        </label>
    );
}