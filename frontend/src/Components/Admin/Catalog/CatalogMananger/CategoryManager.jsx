import { useMemo, useState } from "react";
import { Pencil, Plus, Trash2, X } from "lucide-react";

import { useCategories } from "@/hooks/useCategory";
import { useCreateCategory } from "@/hooks/admin/useCreateCategory";
import { useUpdateCategory } from "@/hooks/admin/useUpdateCategory";
import { useDeleteCategory } from "@/hooks/admin/useDeleteCategory";
import { useValidatedForm } from "@/hooks/useValidatedForm";
import { categorySchema } from "@/validators/adminValidator";

import TextField from "@/Components/Admin/ProductEditor/inputFields/TextField";
import SelectField from "@/Components/Admin/ProductEditor/inputFields/SelectField";
import Feedback from "@/Components/Shared/Feedback/Feedback";

const EMPTY_VALUES = { name: "", slug: "", parentCategoryId: "" };

const toFormValues = (category) => ({
  name: category?.name ?? "",
  slug: category?.slug ?? "",
  parentCategoryId: category?.parentCategoryId
    ? String(category.parentCategoryId)
    : "",
});

const toCategoryEntry = (category) => [category.id, category];

export default function CategoryManager() {
  const categories = useCategories();
  const createCategory = useCreateCategory();
  const updateCategory = useUpdateCategory();
  const deleteCategory = useDeleteCategory();

  // Category being edited (null = we're adding a new one)
  const [editingItem, setEditingItem] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  // Form state + validation
  const { values, errors, setValue, handleBlur, touchAll, validate, reset } =
    useValidatedForm(categorySchema, EMPTY_VALUES);

  const items = categories.data;

  // Lookup map so each row can show its parent's name
  const categoriesById = useMemo(
    () => Object.fromEntries((items ?? []).map(toCategoryEntry)),
    [items],
  );

  // A category can't be its own parent, so exclude it while editing
  const isNotEditing = (category) => category.id !== editingItem?.id;
  const toParentOption = (category) => ({
    value: String(category.id),
    label: category.name,
  });
  const parentOptions = (items ?? []).filter(isNotEditing).map(toParentOption);

  // Buttons store the id in data-id, so look the category up from the list
  const findCategoryById = (id) =>
    items?.find((category) => String(category.id) === id);

  const isRemoving = (id) =>
    deleteCategory.isPending && deleteCategory.variables === id;

  // ---- Form handlers ----

  const handleNameChange = (value) => setValue("name", value);
  const handleNameBlur = () => handleBlur("name");

  const handleSlugChange = (value) => setValue("slug", value);
  const handleSlugBlur = () => handleBlur("slug");

  const handleParentChange = (value) => setValue("parentCategoryId", value);

  const handleCancelEdit = () => {
    setEditingItem(null);
    reset(EMPTY_VALUES);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    touchAll();

    // validate returns the clean data, or a falsy value if invalid
    const data = validate(values);
    if (!data) return;

    setSubmitting(true);
    try {
      if (editingItem) {
        await updateCategory.mutateAsync({
          id: editingItem.id,
          payload: data,
        });
        setEditingItem(null);
      } else {
        await createCategory.mutateAsync(data);
      }
      reset(EMPTY_VALUES);
    } catch {
      // Error toast is already shown by the mutation's onError
    } finally {
      setSubmitting(false);
    }
  };

  // ---- List handlers ----

  const handleEditClick = (event) => {
    const category = findCategoryById(event.currentTarget.dataset.id);
    if (!category) return;
    setEditingItem(category);
    reset(toFormValues(category)); // fill the form with the category's current values
  };

  const handleRemoveClick = (event) => {
    const category = findCategoryById(event.currentTarget.dataset.id);
    if (!category) return;
    // If the deleted category is being edited, clear the form
    if (editingItem?.id === category.id) handleCancelEdit();
    deleteCategory.mutate(category.id);
  };

  return (
    <div className="space-y-5">
      {/* Add / Edit form */}
      <section className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm">
        <div className="mb-4">
          <h3 className="font-semibold text-gray-800">
            {editingItem ? "Edit category" : "Add category"}
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            Parent category is optional.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3">
          {/* Banner shown only while editing */}
          {editingItem && (
            <div className="flex items-center justify-between rounded-md bg-primary/5 px-3 py-2 text-xs font-medium text-primary">
              Editing "{editingItem.name}"
              <button
                type="button"
                onClick={handleCancelEdit}
                className="flex items-center gap-1 text-gray-500 hover:text-gray-700"
              >
                <X className="h-3.5 w-3.5" />
                Cancel
              </button>
            </div>
          )}

          <div className="flex flex-wrap items-start gap-3">
            <TextField
              label="Name"
              value={values.name}
              onChange={handleNameChange}
              onBlur={handleNameBlur}
              error={errors.name}
              className="min-w-36 flex-1"
            />

            <TextField
              label="Slug"
              value={values.slug}
              onChange={handleSlugChange}
              onBlur={handleSlugBlur}
              error={errors.slug}
              className="min-w-36 flex-1"
            />

            <SelectField
              label="Parent category"
              value={values.parentCategoryId}
              onChange={handleParentChange}
              error={errors.parentCategoryId}
              placeholder="No parent"
              options={parentOptions}
              className="min-w-44 flex-1"
            />

            <button
              disabled={submitting}
              className="mt-5 flex items-center gap-1.5 rounded-md bg-primary px-3.5 py-2 text-sm font-semibold text-white transition hover:bg-primary/90 disabled:opacity-50"
            >
              <Plus className="h-4 w-4" />
              {submitting ? "Saving…" : editingItem ? "Update" : "Add"}
            </button>
          </div>
        </form>
      </section>

      {/* Category list */}
      <section className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm">
        <div className="mb-4">
          <h3 className="font-semibold text-gray-800">Categories</h3>
        </div>

        <div className="divide-y divide-gray-100">
          <Feedback loading={!items} empty={items && !items.length}>
            {items?.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between gap-3 py-2.5 text-sm"
              >
                {/* Name + parent hint */}
                <div className="flex min-w-0 items-center gap-3">
                  <div className="min-w-0">
                    <p className="truncate text-gray-700">{item.name}</p>
                    {item.parentCategoryId &&
                      categoriesById[item.parentCategoryId] && (
                        <p className="text-xs text-gray-400">
                          under {categoriesById[item.parentCategoryId].name}
                        </p>
                      )}
                  </div>
                </div>

                {/* Edit / delete actions */}
                <div className="flex shrink-0 items-center gap-1">
                  <button
                    type="button"
                    data-id={item.id}
                    onClick={handleEditClick}
                    className="rounded-md p-1.5 text-gray-400 transition hover:bg-primary/10 hover:text-primary"
                  >
                    <Pencil className="h-4 w-4" />
                  </button>

                  <button
                    type="button"
                    data-id={item.id}
                    disabled={isRemoving(item.id)}
                    onClick={handleRemoveClick}
                    className="rounded-md p-1.5 text-gray-400 transition hover:bg-red-50 hover:text-red-500 disabled:opacity-40"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </Feedback>
        </div>
      </section>
    </div>
  );
}
