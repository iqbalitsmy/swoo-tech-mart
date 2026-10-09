import { useState } from "react";
import { Pencil, Plus, Trash2, X } from "lucide-react";

import { useTags } from "@/hooks/useTags";
import { useCreateTag } from "@/hooks/admin/useCreateTag";
import { useUpdateTag } from "@/hooks/admin/useUpdateTag";
import { useDeleteTag } from "@/hooks/admin/useDeleteTag";
import { useValidatedForm } from "@/hooks/useValidatedForm";
import { tagSchema } from "@/validators/adminValidator";

import TextField from "@/Components/Admin/ProductEditor/inputFields/TextField";
import Feedback from "@/Components/Shared/Feedback/Feedback";

const EMPTY_VALUES = { label: "" };

const toFormValues = (tag) => ({ label: tag?.label ?? "" });

export default function TagManager() {
  const tags = useTags();
  const createTag = useCreateTag();
  const updateTag = useUpdateTag();
  const deleteTag = useDeleteTag();

  // Tag being edited (null = we're adding a new one)
  const [editingItem, setEditingItem] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  // Form state + validation (same hook CatalogForm used)
  const { values, errors, setValue, handleBlur, touchAll, validate, reset } =
    useValidatedForm(tagSchema, EMPTY_VALUES);

  const items = tags.data;

  const findTagById = (id) => items?.find((tag) => String(tag.id) === id);

  const isRemoving = (id) => deleteTag.isPending && deleteTag.variables === id;

  // ---- Form handlers ----

  const handleLabelChange = (value) => setValue("label", value);

  const handleLabelBlur = () => handleBlur("label");

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
        await updateTag.mutateAsync({ id: editingItem.id, payload: data });
        setEditingItem(null);
      } else {
        await createTag.mutateAsync(data);
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
    const tag = findTagById(event.currentTarget.dataset.id);
    if (!tag) return;
    setEditingItem(tag);
    reset(toFormValues(tag)); // fill the input with the tag's current label
  };

  const handleRemoveClick = (event) => {
    const tag = findTagById(event.currentTarget.dataset.id);
    if (!tag) return;
    // If the deleted tag is being edited, clear the form
    if (editingItem?.id === tag.id) handleCancelEdit();
    deleteTag.mutate(tag.id);
  };

  return (
    <div className="space-y-5">
      {/* Add / Edit form */}
      <section className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm">
        <div className="mb-4">
          <h3 className="font-semibold text-gray-800">
            {editingItem ? "Edit tag" : "Add tag"}
          </h3>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3">
          {/* Banner shown only while editing */}
          {editingItem && (
            <div className="flex items-center justify-between rounded-md bg-primary/5 px-3 py-2 text-xs font-medium text-primary">
              Editing "{editingItem.label}"
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
              label="Tag label"
              value={values.label}
              onChange={handleLabelChange}
              onBlur={handleLabelBlur}
              error={errors.label}
              className="min-w-36 flex-1"
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

      {/* Tag list */}
      <section className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm">
        <div className="mb-4">
          <h3 className="font-semibold text-gray-800">Tags</h3>
        </div>

        <div className="divide-y divide-gray-100">
          <Feedback loading={!items} empty={items && !items.length}>
            {items?.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between gap-3 py-2.5 text-sm"
              >
                <div className="flex min-w-0 items-center gap-3">
                  <span className="truncate text-gray-700">{item.label}</span>
                </div>

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
