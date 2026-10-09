import { Trash2 } from "lucide-react";

export default function ProductImage({ image, onDelete, isDeleting }) {
  // Wrap onDelete so the parent only needs to pass one shared handler
  const handleDelete = () => onDelete(image.id);

  return (
    <div className="relative">
      <img
        src={image.url}
        alt="Product"
        className="aspect-square w-full rounded-md border border-gray-200 bg-gray-50 object-cover"
      />

      <button
        type="button"
        onClick={handleDelete}
        disabled={isDeleting}
        aria-label="Delete image"
        className="absolute right-1.5 top-1.5 rounded-full bg-white/90 p-1.5 text-gray-500 shadow transition hover:text-red-500 disabled:opacity-50"
      >
        <Trash2 className="h-3.5 w-3.5" />
      </button>
    </div>
  );
}
