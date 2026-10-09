import { Trash2 } from "lucide-react";

export default function DescriptionImage({
  image,
  fallbackAlt,
  onDelete,
  isDeleting,
}) {
  // Wrap onDelete so the parent only needs to pass one shared handler
  const handleDelete = () => onDelete(image.id);

  return (
    <div className="relative h-16 w-16 shrink-0">
      <img
        src={image.url}
        alt={image.altText || fallbackAlt}
        className="h-full w-full rounded border border-gray-200 object-cover"
      />

      <button
        type="button"
        onClick={handleDelete}
        disabled={isDeleting}
        aria-label="Delete image"
        className="absolute right-0.5 top-0.5 rounded-full bg-white/90 p-1 text-gray-500 shadow transition hover:text-red-500 disabled:opacity-50"
      >
        <Trash2 className="h-3 w-3" />
      </button>
    </div>
  );
}
