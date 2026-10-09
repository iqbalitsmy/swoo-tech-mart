import { zodResolver } from "@hookform/resolvers/zod";
import { Pencil, Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";

import { uploadCloudinaryImage } from "@/api/cloudinaryApi";

import {
  descriptionImageSchema,
  descriptionSectionSchema,
} from "@/validators/productValidator";
import { useAdminUpdateDescription } from "@/hooks/admin/useAdminUpdateDescription";
import { useAdminDeleteDescription } from "@/hooks/admin/useAdminDeleteDescription";
import { useAddDescriptionImage } from "@/hooks/admin/useAddDescriptionImage";
import { useAdminDeleteDescriptionImage } from "@/hooks/admin/useAdminDeleteDescriptionImage";
import ImageDropzone from "../inputFields/ImageDropzone";
import DescriptionImage from "../DescriptionImage/DescriptionImage";

export default function DescriptionSection({ productId, section, reload }) {
  // false = read-only view, true = edit form
  const [isEditing, setIsEditing] = useState(false);

  // Each section has its own mutations, so pending states never mix between sections
  const updateMutation = useAdminUpdateDescription(productId, reload);
  const deleteMutation = useAdminDeleteDescription(productId, reload);
  const addImageMutation = useAddDescriptionImage(productId, reload);
  const deleteImageMutation = useAdminDeleteDescriptionImage(productId, reload);

  // Form 1: edit title / order / body (plain zod validation)
  const editForm = useForm({ resolver: zodResolver(descriptionSectionSchema) });

  // Form 2: add inline image. No zodResolver because the form holds a File
  // until it is uploaded, so we upload first and then validate.
  const imageForm = useForm();

  /* ---------- Edit section ---------- */

  // Fill the form with current values every time edit mode opens
  const startEditing = () => {
    editForm.reset({
      title: section.title,
      body: section.body,
      sortOrder: section.sortOrder,
    });
    setIsEditing(true);
  };

  const cancelEditing = () => setIsEditing(false);

  // Close the form after the server accepted the update
  const handleUpdateSuccess = () => setIsEditing(false);

  // Runs only when the edit form passes validation
  const onUpdateValid = (data) => {
    updateMutation.mutate(
      { ...data, sectionId: section.id },
      { onSuccess: handleUpdateSuccess },
    );
  };

  /* ---------- Delete section ---------- */

  // Ask first: deleting a section also removes its images
  const handleDeleteSection = () => {
    if (!window.confirm("Delete this section and its images?")) return;
    deleteMutation.mutate(section.id);
  };

  /* ---------- Add inline image ---------- */

  // Show zod issues under the matching field (first issue per field only)
  const applyImageFieldErrors = (issues) => {
    const seen = new Set();
    for (const issue of issues) {
      const field = issue.path[0];
      if (field && !seen.has(field)) {
        seen.add(field);
        imageForm.setError(field, { message: issue.message });
      }
    }
  };

  const handleImageAdded = () => imageForm.reset();

  // Flow: 1) upload to Cloudinary  2) validate  3) save to backend
  const onImageSubmit = async (values) => {
    const data = { ...values };

    // Step 1: upload
    try {
      if (values.url instanceof File) {
        data.url = (await uploadCloudinaryImage(values.url)).url;
      }
    } catch (error) {
      toast.error(error.message || "Image upload failed");
      return;
    }

    // Step 2: validate (shown per field, never as a toast)
    const result = descriptionImageSchema.safeParse(data);
    if (!result.success) {
      applyImageFieldErrors(result.error.issues);
      return;
    }

    // Step 3: save. sectionId tells the backend which section gets the image
    addImageMutation.mutate(
      { ...result.data, sectionId: section.id },
      { onSuccess: handleImageAdded },
    );
  };

  /* ---------- Delete inline image ---------- */

  // Shared by every DescriptionImage tile in this section
  const handleDeleteImage = (imageId) => {
    deleteImageMutation.mutate({ sectionId: section.id, imageId });
  };

  const isImageBusy =
    imageForm.formState.isSubmitting || addImageMutation.isPending;
  const editErrors = editForm.formState.errors;
  const imageErrors = imageForm.formState.errors;

  return (
    <div className="rounded-md border border-gray-200 bg-gray-50 p-3">
      {/* ---- Read-only view OR edit form ---- */}
      {isEditing ? (
        <form
          onSubmit={editForm.handleSubmit(onUpdateValid)}
          noValidate
          className="grid gap-3 sm:grid-cols-2"
        >
          <div>
            <label className="mb-1 block text-xs font-medium text-gray-600">
              Section title
            </label>
            <input
              type="text"
              {...editForm.register("title")}
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
            />
            {editErrors.title && (
              <p className="mt-1 text-xs text-red-500">
                {editErrors.title.message}
              </p>
            )}
          </div>

          <div>
            <label className="mb-1 block text-xs font-medium text-gray-600">
              Order
            </label>
            <input
              type="number"
              {...editForm.register("sortOrder", { valueAsNumber: true })}
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
            />
            {editErrors.sortOrder && (
              <p className="mt-1 text-xs text-red-500">
                {editErrors.sortOrder.message}
              </p>
            )}
          </div>

          <div className="sm:col-span-2">
            <label className="mb-1 block text-xs font-medium text-gray-600">
              Description
            </label>
            <textarea
              rows={6}
              {...editForm.register("body")}
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
            />
            {editErrors.body && (
              <p className="mt-1 text-xs text-red-500">
                {editErrors.body.message}
              </p>
            )}
          </div>

          <div className="flex gap-2 sm:col-span-2">
            <button
              type="submit"
              disabled={updateMutation.isPending}
              className="rounded-md bg-gray-800 px-4 py-2 text-xs font-semibold text-white transition hover:bg-gray-900 disabled:opacity-50"
            >
              {updateMutation.isPending ? "Saving…" : "Save"}
            </button>
            <button
              type="button"
              onClick={cancelEditing}
              className="rounded-md border border-gray-300 px-4 py-2 text-xs font-semibold text-gray-600 transition hover:bg-gray-100"
            >
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <>
          <div className="flex items-start justify-between gap-3">
            <p className="text-xs font-semibold text-gray-700">
              {section.title}
            </p>

            <div className="flex shrink-0 gap-3">
              <button
                type="button"
                onClick={startEditing}
                aria-label="Edit section"
                className="text-gray-400 transition hover:text-gray-700"
              >
                <Pencil className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={handleDeleteSection}
                disabled={deleteMutation.isPending}
                aria-label="Delete section"
                className="text-gray-400 transition hover:text-red-500 disabled:opacity-50"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </div>

          <p className="mt-2 whitespace-pre-wrap text-sm leading-6 text-gray-600">
            {section.body}
          </p>
        </>
      )}

      {/* ---- Inline images of this section ---- */}
      {section.images?.length > 0 && (
        <div className="mt-2 flex gap-2 overflow-x-auto">
          {section.images.map((image) => (
            <DescriptionImage
              key={image.id}
              image={image}
              fallbackAlt={section.title}
              onDelete={handleDeleteImage}
              // Only the image being deleted shows the disabled state
              isDeleting={
                deleteImageMutation.isPending &&
                deleteImageMutation.variables?.imageId === image.id
              }
            />
          ))}
        </div>
      )}

      {/* ---- Add inline image (available once the section exists) ---- */}
      <form
        onSubmit={imageForm.handleSubmit(onImageSubmit)}
        noValidate
        className="mt-3 grid gap-3 border-t border-gray-100 pt-3 sm:grid-cols-2"
      >
        <div className="sm:col-span-2">
          {/* Controller connects ImageDropzone (file / onChange(file)) to the form */}
          <Controller
            name="url"
            control={imageForm.control}
            render={({ field }) => (
              <ImageDropzone
                label="Inline image"
                file={field.value}
                onChange={field.onChange}
              />
            )}
          />
          {imageErrors.url && (
            <p className="mt-1 text-xs text-red-500">
              {imageErrors.url.message}
            </p>
          )}
        </div>

        <div>
          <label className="mb-1 block text-xs font-medium text-gray-600">
            Alt text
          </label>
          <input
            type="text"
            {...imageForm.register("altText")}
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
          />
          {imageErrors.altText && (
            <p className="mt-1 text-xs text-red-500">
              {imageErrors.altText.message}
            </p>
          )}
        </div>

        <div>
          <label className="mb-1 block text-xs font-medium text-gray-600">
            Order
          </label>
          <input
            type="number"
            {...imageForm.register("sortOrder", { valueAsNumber: true })}
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
          />
          {imageErrors.sortOrder && (
            <p className="mt-1 text-xs text-red-500">
              {imageErrors.sortOrder.message}
            </p>
          )}
        </div>

        <div className="sm:col-span-2">
          <button
            type="submit"
            disabled={isImageBusy}
            className="inline-flex items-center gap-1.5 rounded-md bg-gray-800 px-4 py-2 text-xs font-semibold text-white transition hover:bg-gray-900 disabled:opacity-50"
          >
            <Plus className="h-3.5 w-3.5" />
            {isImageBusy ? "Uploading…" : "Add image"}
          </button>
        </div>
      </form>
    </div>
  );
}
