import { Pencil, Trash2 } from "lucide-react";
import { Feedback } from "@/pages/Admin/adminUi";

export default function CatalogList({ items, renderItem, onEdit, onRemove, removingId }) {
    return (
        <div className="divide-y divide-gray-100">
            <Feedback loading={!items} empty={items && !items.length}>
                {items?.map((item) => (
                    <div key={item.id} className="flex items-center justify-between gap-3 py-2.5 text-sm">
                        <div className="flex min-w-0 items-center gap-3">{renderItem(item)}</div>

                        <div className="flex shrink-0 items-center gap-1">
                            <button
                                type="button"
                                onClick={() => onEdit(item)}
                                className="rounded-md p-1.5 text-gray-400 transition hover:bg-primary/10 hover:text-primary"
                            >
                                <Pencil className="h-4 w-4" />
                            </button>

                            <button
                                type="button"
                                disabled={removingId === item.id}
                                onClick={() => onRemove(item)}
                                className="rounded-md p-1.5 text-gray-400 transition hover:bg-red-50 hover:text-red-500 disabled:opacity-40"
                            >
                                <Trash2 className="h-4 w-4" />
                            </button>
                        </div>
                    </div>
                ))}
            </Feedback>
        </div>
    );
}