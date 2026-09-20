import TextField from "./ui/TextField";
import SelectField from "./ui/SelectField";
import CheckboxPillGroup from "./ui/CheckboxPillGroup";

export default function ProductForm({ form, set, errors, categories, brands, tags, product, save, onSubmit }) {
    return (
        <form onSubmit={onSubmit} className="grid gap-4 sm:grid-cols-2">
            <TextField label="SKU" value={form.sku} onChange={(v) => set("sku", v)} error={errors.sku} />
            <TextField
                label="Title"
                value={form.title}
                onChange={(v) => set("title", v)}
                error={errors.title}
                className="sm:col-span-2"
            />
            <TextField label="URL slug" value={form.slug} onChange={(v) => set("slug", v)} error={errors.slug} />

            <SelectField
                label="Category"
                value={form.categoryId}
                onChange={(v) => set("categoryId", v)}
                error={errors.categoryId}
                placeholder="No category"
                options={(categories ?? []).map((item) => ({ value: item.id, label: item.name }))}
            />

            <SelectField
                label="Brand"
                value={form.brandId}
                onChange={(v) => set("brandId", v)}
                error={errors.brandId}
                placeholder="No brand"
                options={(brands ?? []).map((item) => ({ value: item.id, label: item.name }))}
            />

            <SelectField
                label="Stock status"
                value={form.stockStatus}
                onChange={(v) => set("stockStatus", v)}
                error={errors.stockStatus}
                options={[
                    { value: "IN_STOCK", label: "IN_STOCK" },
                    { value: "OUT_OF_STOCK", label: "OUT_OF_STOCK" },
                    { value: "PRE_ORDER", label: "PRE_ORDER" },
                ]}
            />

            <label className="flex items-end gap-2 pb-2 text-sm text-gray-600">
                <input
                    type="checkbox"
                    checked={form.isNew}
                    onChange={(e) => set("isNew", e.target.checked)}
                    className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary/30"
                />
                Mark as new
            </label>

            <div className="sm:col-span-2">
                <p className="mb-2 text-xs font-medium text-gray-600">Tags</p>
                <CheckboxPillGroup
                    options={(tags ?? []).map((tag) => ({ value: tag.id, label: tag.label }))}
                    selectedIds={form.tagIds}
                    onToggle={(id) =>
                        set(
                            "tagIds",
                            form.tagIds.includes(id)
                                ? form.tagIds.filter((existing) => existing !== id)
                                : [...form.tagIds, id]
                        )
                    }
                    empty="No tags available."
                />
                {errors.tagIds && <p className="mt-1 text-xs text-red-500">{errors.tagIds}</p>}
            </div>

            <div className="sm:col-span-2">
                <button
                    disabled={save.isPending}
                    className="rounded-md bg-primary px-4 py-2 text-sm font-semibold text-white transition hover:bg-primary/90 disabled:opacity-50"
                >
                    {save.isPending ? "Saving…" : product ? "Update product" : "Create product"}
                </button>
            </div>
        </form>
    );
}