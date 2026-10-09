import { useState } from "react";
import { Pencil, Plus, Trash2, X } from "lucide-react";
import { toast } from "sonner";

import { uploadCloudinaryImage } from "@/api/cloudinaryApi";
import { useBrands } from "@/hooks/admin/useBrands";
import { useCreateBrand } from "@/hooks/admin/useCreateBrand";
import { useUpdateBrand } from "@/hooks/admin/useUpdateBrand";
import { useDeleteBrand } from "@/hooks/admin/useDeleteBrand";
import { useValidatedForm } from "@/hooks/useValidatedForm";
import { brandSchema } from "@/validators/adminValidator";

import TextField from "@/Components/Admin/ProductEditor/inputFields/TextField";
import ImageDropzone from "@/Components/Admin/ProductEditor/inputFields/ImageDropzone";
import Feedback from "@/Components/Shared/Feedback/Feedback";

const EMPTY_VALUES = { name: "", slug: "", logoUrl: null };

const toFormValues = (brand) => ({
  name: brand?.name ?? "",
  slug: brand?.slug ?? "",
  logoUrl: brand?.logoUrl ?? null,
});

export default function BrandManager() {
  const brands = useBrands();
  const createBrand = useCreateBrand();
  const updateBrand = useUpdateBrand();
  const deleteBrand = useDeleteBrand();

  // Brand being edited (null = we're adding a new one)
  const [editingItem, setEditingItem] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  // Form state + validation
  const { values, errors, setValue, handleBlur, touchAll, validate, reset } =
    useValidatedForm(brandSchema, EMPTY_VALUES);

  const items = brands.data;

  // logoUrl holds either a new File (just picked) or a string URL (existing logo)
  const logoFile = values.logoUrl instanceof File ? values.logoUrl : null;
  const logoPreviewUrl =
    typeof values.logoUrl === "string" ? values.logoUrl : null;

  // Buttons store the id in data-id, so look the brand up from the list
  const findBrandById = (id) => items?.find((brand) => String(brand.id) === id);

  const isRemoving = (id) =>
    deleteBrand.isPending && deleteBrand.variables === id;

  // ---- Form handlers ----

  const handleNameChange = (value) => setValue("name", value);
  const handleNameBlur = () => handleBlur("name");

  const handleSlugChange = (value) => setValue("slug", value);
  const handleSlugBlur = () => handleBlur("slug");

  const handleLogoChange = (file) => setValue("logoUrl", file);

  const handleCancelEdit = () => {
    setEditingItem(null);
    reset(EMPTY_VALUES);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    touchAll();
    setSubmitting(true);

    const payload = { ...values };

    // Upload the logo to Cloudinary only if the user picked a new file
    try {
      if (values.logoUrl instanceof File) {
        payload.logoUrl = (await uploadCloudinaryImage(values.logoUrl)).url;
      }
    } catch (error) {
      toast.error(error.message || "Image upload failed");
      setSubmitting(false);
      return;
    }

    // validate returns the clean data, or a falsy value if invalid
    const data = validate(payload);
    if (!data) {
      setSubmitting(false);
      return;
    }

    try {
      if (editingItem) {
        await updateBrand.mutateAsync({ id: editingItem.id, payload: data });
        setEditingItem(null);
      } else {
        await createBrand.mutateAsync(data);
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
    const brand = findBrandById(event.currentTarget.dataset.id);
    if (!brand) return;
    setEditingItem(brand);
    reset(toFormValues(brand)); // fill the form with the brand's current values
  };

  const handleRemoveClick = (event) => {
    const brand = findBrandById(event.currentTarget.dataset.id);
    if (!brand) return;
    // If the deleted brand is being edited, clear the form
    if (editingItem?.id === brand.id) handleCancelEdit();
    deleteBrand.mutate(brand.id);
  };

  return (
    <div className="space-y-5">
      {/* Add / Edit form */}
      <section className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm">
        <div className="mb-4">
          <h3 className="font-semibold text-gray-800">
            {editingItem ? "Edit brand" : "Add brand"}
          </h3>
          <p className="mt-1 text-sm text-gray-500">Logo is optional.</p>
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

            {/* Logo upload */}
            <div className="w-full sm:w-56">
              <span className="mb-1 block text-xs font-medium text-gray-600">
                Logo
              </span>
              <ImageDropzone
                label="Logo"
                file={logoFile}
                previewUrl={logoPreviewUrl}
                onChange={handleLogoChange}
                compact
              />
              {errors.logoUrl && (
                <p className="mt-1 text-xs text-red-500">{errors.logoUrl}</p>
              )}
            </div>

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

      {/* Brand list */}
      <section className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm">
        <div className="mb-4">
          <h3 className="font-semibold text-gray-800">Brands</h3>
        </div>

        <div className="divide-y divide-gray-100">
          <Feedback loading={!items} empty={items && !items.length}>
            {items?.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between gap-3 py-2.5 text-sm"
              >
                {/* Logo (or placeholder) + name */}
                <div className="flex min-w-0 items-center gap-3">
                  {item.logoUrl ? (
                    <img
                      src={item.logoUrl}
                      alt={item.name}
                      className="h-8 w-8 shrink-0 rounded border border-gray-200 object-cover"
                    />
                  ) : (
                    <div className="h-8 w-8 shrink-0 rounded border border-dashed border-gray-200 bg-gray-50" />
                  )}
                  <span className="truncate text-gray-700">{item.name}</span>
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
