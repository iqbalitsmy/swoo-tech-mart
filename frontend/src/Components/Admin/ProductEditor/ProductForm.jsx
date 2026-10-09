import TextField from "./inputFields/TextField";
import SelectField from "./inputFields/SelectField";
import CheckboxPillGroup from "./CheckboxPillGroup/CheckboxPillGroup";

// Static list, so it lives outside the component and is not rebuilt on every render
const STOCK_STATUS_OPTIONS = [
  { value: "IN_STOCK", label: "IN_STOCK" },
  { value: "OUT_OF_STOCK", label: "OUT_OF_STOCK" },
  { value: "PRE_ORDER", label: "PRE_ORDER" },
];

// Convert API items ({ id, name }) into the { value, label } shape SelectField expects
function toNameOptions(items) {
  return (items ?? []).map((item) => ({ value: item.id, label: item.name }));
}

// Same idea for tags, which use `label` instead of `name`
function toTagOptions(tags) {
  return (tags ?? []).map((tag) => ({ value: tag.id, label: tag.label }));
}

export default function ProductForm({
  form,
  set,
  errors,
  categories,
  brands,
  tags,
  product,
  save,
  onSubmit,
}) {
  // Returns an onChange handler for a given field, e.g. handleChange("sku")
  const handleChange = (field) => (value) => set(field, value);

  // Checkbox gives an event, so read `checked` from it
  const handleIsNewChange = (e) => set("isNew", e.target.checked);

  // Add the tag id if it is not selected yet, remove it if it is
  const handleTagToggle = (id) => {
    const nextTagIds = form.tagIds.includes(id)
      ? form.tagIds.filter((existing) => existing !== id)
      : [...form.tagIds, id];
    set("tagIds", nextTagIds);
  };

  // Button label changes based on saving state and create/update mode
  const getSubmitLabel = () => {
    if (save.isPending) return "Saving…";
    return product ? "Update product" : "Create product";
  };

  return (
    <form onSubmit={onSubmit} className="grid gap-4 sm:grid-cols-2">
      <TextField
        label="SKU"
        value={form.sku}
        onChange={handleChange("sku")}
        error={errors.sku}
      />
      <TextField
        label="Title"
        value={form.title}
        onChange={handleChange("title")}
        error={errors.title}
        className="sm:col-span-2"
      />
      <TextField
        label="URL slug"
        value={form.slug}
        onChange={handleChange("slug")}
        error={errors.slug}
      />

      <SelectField
        label="Category"
        value={form.categoryId}
        onChange={handleChange("categoryId")}
        error={errors.categoryId}
        placeholder="No category"
        options={toNameOptions(categories)}
      />

      <SelectField
        label="Brand"
        value={form.brandId}
        onChange={handleChange("brandId")}
        error={errors.brandId}
        placeholder="No brand"
        options={toNameOptions(brands)}
      />

      <SelectField
        label="Stock status"
        value={form.stockStatus}
        onChange={handleChange("stockStatus")}
        error={errors.stockStatus}
        options={STOCK_STATUS_OPTIONS}
      />

      <label className="flex items-end gap-2 pb-2 text-sm text-gray-600">
        <input
          type="checkbox"
          checked={form.isNew}
          onChange={handleIsNewChange}
          className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary/30"
        />
        Mark as new
      </label>

      <div className="sm:col-span-2">
        <p className="mb-2 text-xs font-medium text-gray-600">Tags</p>
        <CheckboxPillGroup
          options={toTagOptions(tags)}
          selectedIds={form.tagIds}
          onToggle={handleTagToggle}
          empty="No tags available."
        />
        {errors.tagIds && (
          <p className="mt-1 text-xs text-red-500">{errors.tagIds}</p>
        )}
      </div>

      <div className="sm:col-span-2">
        <button
          disabled={save.isPending}
          className="rounded-md bg-primary px-4 py-2 text-sm font-semibold text-white transition hover:bg-primary/90 disabled:opacity-50"
        >
          {getSubmitLabel()}
        </button>
      </div>
    </form>
  );
}
