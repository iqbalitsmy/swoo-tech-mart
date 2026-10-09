import { Trash2 } from "lucide-react";

export default function Highlight({ highlight, onDelete, isDeleting }) {
  // Wrap onDelete so the parent only needs to pass one shared handler
  const handleDelete = () => onDelete(highlight.id);

  return (
    <div className="flex items-center justify-between gap-3 rounded-md bg-primary/5 px-3 py-2 text-sm text-gray-700">
      <p>
        <span className="mr-2 text-primary">•</span>
        {highlight.text}
      </p>

      <button
        type="button"
        onClick={handleDelete}
        disabled={isDeleting}
        aria-label="Delete highlight"
        className="text-gray-400 transition hover:text-red-500 disabled:opacity-50"
      >
        <Trash2 className="h-4 w-4" />
      </button>
    </div>
  );
}
