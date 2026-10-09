import { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronRight, Pencil, Plus, Trash2, X } from "lucide-react";

import { useAttributeTypes } from "@/hooks/admin/useAttributeTypes";
import { useCreateAttributeType } from "@/hooks/admin/useCreateAttributeType";
import { useUpdateAttributeType } from "@/hooks/admin/useUpdateAttributeType";
import { useDeleteAttributeType } from "@/hooks/admin/useDeleteAttributeType";
import { useValidatedForm } from "@/hooks/useValidatedForm";
import { attributeTypeSchema } from "@/validators/adminValidator";

import TextField from "@/Components/Admin/ProductEditor/inputFields/TextField";
import Feedback from "@/Components/Shared/Feedback/Feedback";

const EMPTY_VALUES = { name: "" };

const toFormValues = (type) => ({ name: type?.name ?? "" });

export default function VariantAttributesManager() {
  const types = useAttributeTypes();
  const createType = useCreateAttributeType();
  const updateType = useUpdateAttributeType();
  const deleteType = useDeleteAttributeType();

  // Attribute type being edited (null = we're adding a new one)
  const [editingItem, setEditingItem] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  // Form state + validation
  const { values, errors, setValue, handleBlur, touchAll, validate, reset } =
    useValidatedForm(attributeTypeSchema, EMPTY_VALUES);

  const items = types.data;

  // Buttons store the id in data-id, so look the type up from the list
  const findTypeById = (id) => items?.find((type) => String(type.id) === id);

  const isRemoving = (id) =>
    deleteType.isPending && deleteType.variables === id;

  // ---- Form handlers ----

  const handleNameChange = (value) => setValue("name", value);

  const handleNameBlur = () => handleBlur("name");

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
        await updateType.mutateAsync({ id: editingItem.id, payload: data });
        setEditingItem(null);
      } else {
        await createType.mutateAsync(data);
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
    const type = findTypeById(event.currentTarget.dataset.id);
    if (!type) return;
    setEditingItem(type);
    reset(toFormValues(type)); // fill the input with the type's current name
  };

  const handleRemoveClick = (event) => {
    const type = findTypeById(event.currentTarget.dataset.id);
    if (!type) return;
    // If the deleted type is being edited, clear the form
    if (editingItem?.id === type.id) handleCancelEdit();
    deleteType.mutate(type.id);
  };

  return (
    <div className="space-y-5">
      {/* Add / Edit form */}
      <section className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm">
        <div className="mb-4">
          <h3 className="font-semibold text-gray-800">
            {editingItem ? "Edit attribute type" : "Add attribute type"}
          </h3>
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
              label="Attribute name (e.g. Color)"
              value={values.name}
              onChange={handleNameChange}
              onBlur={handleNameBlur}
              error={errors.name}
              className="min-w-36 flex-1"
            />

            <button
              disabled={submitting}
              className="mt-5 flex items-center gap-1.5 rounded-md bg-primary px-3.5 py-2 text-sm font-semibold text-white transition hover:bg-primary/90 disabled:opacity-50"
            >
              <Plus className="h-4 w-4" />
              {submitting ? "Saving…" : editingItem ? "Update" : "Add type"}
            </button>
          </div>
        </form>
      </section>

      {/* Attribute type list */}
      <section className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm">
        <div className="mb-4">
          <h3 className="font-semibold text-gray-800">Attribute types</h3>
          <p className="mt-1 text-sm text-gray-500">
            Select one to manage its values.
          </p>
        </div>

        <div className="divide-y divide-gray-100">
          <Feedback loading={!items} empty={items && !items.length}>
            {items?.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between gap-3 py-2.5 text-sm"
              >
                {/* Link to this type's values page */}
                <div className="flex min-w-0 items-center gap-3">
                  <Link
                    to={`/admin/catalog/variants/${item.id}/values`}
                    className="flex min-w-0 items-center gap-1 truncate text-gray-700 hover:text-primary"
                  >
                    <span className="truncate">{item.name}</span>
                    <ChevronRight className="h-3.5 w-3.5 shrink-0 text-gray-300" />
                  </Link>
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
