import { useState } from "react";
import { Pencil, Plus, Trash2, X } from "lucide-react";

import { useAttributeValues } from "@/hooks/admin/useAttributeValues";
import { useCreateAttributeValue } from "@/hooks/admin/useCreateAttributeValue";
import { useUpdateAttributeValue } from "@/hooks/admin/useUpdateAttributeValue";
import { useDeleteAttributeValue } from "@/hooks/admin/useDeleteAttributeValue";
import { useValidatedForm } from "@/hooks/useValidatedForm";
import {
  attributeValueSchema,
  colorAttributeValueSchema,
} from "@/validators/adminValidator";

import TextField from "@/Components/Admin/ProductEditor/inputFields/TextField";
import ColorField from "../ColorField/ColorField";
import Feedback from "@/Components/Shared/Feedback/Feedback";

const EMPTY_VALUES = { label: "", value: "" };

const toFormValues = (value) => ({
  label: value?.label ?? "",
  value: value?.value ?? "",
});

export default function AttributeValueManager({ attributeType }) {
  const isColorType = attributeType.name?.trim().toLowerCase() === "color";

  const values = useAttributeValues(attributeType.id);
  const createValue = useCreateAttributeValue();
  const updateValue = useUpdateAttributeValue();
  const deleteValue = useDeleteAttributeValue();

  // Value being edited (null = we're adding a new one)
  const [editingItem, setEditingItem] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  // "Color" types must be a valid hex; other types accept any text
  const schema = isColorType ? colorAttributeValueSchema : attributeValueSchema;

  // Form state + validation
  const {
    values: formValues,
    errors,
    setValue,
    handleBlur,
    touchAll,
    validate,
    reset,
  } = useValidatedForm(schema, EMPTY_VALUES);

  const items = values.data;

  // Buttons store the id in data-id, so look the value up from the list
  const findValueById = (id) => items?.find((value) => String(value.id) === id);

  const isRemoving = (id) =>
    deleteValue.isPending && deleteValue.variables === id;

  // ---- Form handlers ----

  const handleLabelChange = (value) => setValue("label", value);
  const handleLabelBlur = () => handleBlur("label");

  const handleValueChange = (value) => setValue("value", value);
  const handleValueBlur = () => handleBlur("value");

  const handleCancelEdit = () => {
    setEditingItem(null);
    reset(EMPTY_VALUES);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    touchAll();

    // validate returns the clean data, or a falsy value if invalid
    const data = validate(formValues);
    if (!data) return;

    setSubmitting(true);
    try {
      if (editingItem) {
        await updateValue.mutateAsync({ id: editingItem.id, payload: data });
        setEditingItem(null);
      } else {
        await createValue.mutateAsync({
          typeId: attributeType.id,
          payload: data,
        });
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
    const value = findValueById(event.currentTarget.dataset.id);
    if (!value) return;
    setEditingItem(value);
    reset(toFormValues(value)); // fill the form with the value's current data
  };

  const handleRemoveClick = (event) => {
    const value = findValueById(event.currentTarget.dataset.id);
    if (!value) return;
    // If the deleted value is being edited, clear the form
    if (editingItem?.id === value.id) handleCancelEdit();
    deleteValue.mutate(value.id);
  };

  return (
    <div className="space-y-5">
      {/* Add / Edit form */}
      <section className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm">
        <div className="mb-4">
          <h3 className="font-semibold text-gray-800">
            {editingItem ? "Edit value" : "Add value"}
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
              label="Label"
              value={formValues.label}
              onChange={handleLabelChange}
              onBlur={handleLabelBlur}
              error={errors.label}
              className="min-w-36 flex-1"
            />

            {/* Color picker for the "Color" type, plain text otherwise */}
            {isColorType ? (
              <ColorField
                label="Color"
                value={formValues.value}
                onChange={handleValueChange}
                onBlur={handleValueBlur}
                error={errors.value}
                className="min-w-48 flex-1"
              />
            ) : (
              <TextField
                label="Value"
                value={formValues.value}
                onChange={handleValueChange}
                onBlur={handleValueBlur}
                error={errors.value}
                className="min-w-36 flex-1"
              />
            )}

            <button
              disabled={submitting}
              className="mt-5 flex items-center gap-1.5 rounded-md bg-primary px-3.5 py-2 text-sm font-semibold text-white transition hover:bg-primary/90 disabled:opacity-50"
            >
              <Plus className="h-4 w-4" />
              {submitting ? "Saving…" : editingItem ? "Update" : "Add value"}
            </button>
          </div>
        </form>
      </section>

      {/* Value list */}
      <section className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm">
        <div className="mb-4">
          <h3 className="font-semibold text-gray-800">Values</h3>
        </div>

        <div className="divide-y divide-gray-100">
          <Feedback loading={!items} empty={items && !items.length}>
            {items?.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between gap-3 py-2.5 text-sm"
              >
                {/* Color swatch (color type only) + label and value */}
                <div className="flex min-w-0 items-center gap-3">
                  {isColorType && (
                    <span
                      className="h-5 w-5 shrink-0 rounded-full border border-gray-200"
                      style={{ backgroundColor: item.value }}
                      title={item.value}
                    />
                  )}
                  <span className="truncate text-gray-700">
                    {item.label}{" "}
                    <span className="text-gray-400">({item.value})</span>
                  </span>
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
