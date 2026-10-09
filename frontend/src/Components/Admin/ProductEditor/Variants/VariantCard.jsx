import { Plus } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";

import { uploadCloudinaryImage } from "@/api/cloudinaryApi";
import { variantImageSchema } from "@/validators/productValidator";
import { useAddVariantImage } from "@/hooks/admin/useAddVariantImage";
import ImageDropzone from "../inputFields/ImageDropzone";

export default function VariantCard({ variant, reload, deleting, onDelete }) {
  const addImageMutation = useAddVariantImage(reload);

  // No zodResolver: the form holds a File until it is uploaded,
  // so we upload first, then validate the final data (with the URL string).
  const {
    register,
    control,
    handleSubmit,
    reset,
    setError,
    formState: { errors, isSubmitting },
  } = useForm();

  // Show zod issues under the matching field (first issue per field only)
  const applyFieldErrors = (issues) => {
    const seen = new Set();
    for (const issue of issues) {
      const field = issue.path[0];
      if (field && !seen.has(field)) {
        seen.add(field);
        setError(field, { message: issue.message });
      }
    }
  };

  // Clear the form after a successful add
  const handleAddSuccess = () => reset();

  const handleDelete = () => onDelete(variant.id);

  // Flow: 1) upload to Cloudinary  2) validate  3) save to backend
  // isSubmitting stays true until this whole async function finishes
  const onSubmit = async (values) => {
    // An empty order input gives "", treat it as "not provided"
    const data = {
      ...values,
      sortOrder: values.sortOrder === "" ? undefined : values.sortOrder,
    };

    // Step 1: upload. The only place a network error can happen before saving
    try {
      if (values.url instanceof File) {
        data.url = (await uploadCloudinaryImage(values.url)).url;
      }
    } catch (error) {
      toast.error(error.message || "Image upload failed");
      return;
    }

    // Step 2: validate (shown per field, never as a toast)
    const result = variantImageSchema.safeParse(data);
    if (!result.success) {
      applyFieldErrors(result.error.issues);
      return;
    }

    // Step 3: save. Order defaults to 0 when left empty
    addImageMutation.mutate(
      {
        variantId: variant.id,
        data: {
          url: result.data.url,
          sortOrder: Number(result.data.sortOrder || 0),
        },
      },
      { onSuccess: handleAddSuccess },
    );
  };

  const isBusy = isSubmitting || addImageMutation.isPending;

  return (
    <div className="rounded-md border border-gray-200 bg-gray-50 p-3">
      <div className="flex items-start justify-between gap-4">
        <div className="space-y-1">
          <p className="text-sm font-semibold text-gray-800">{variant.sku}</p>
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <span>{variant.price}</span>
            <span>•</span>
            <span>{variant.stockQty} in stock</span>
          </div>

          {variant.attributes?.length > 0 && (
            <div className="flex flex-wrap gap-1.5 pt-1">
              {variant.attributes.map((attribute) => (
                <span
                  key={attribute.id}
                  className="rounded-full border border-gray-200 bg-white px-2 py-0.5 text-[11px] text-gray-600"
                >
                  {attribute.name}
                </span>
              ))}
            </div>
          )}
        </div>

        <button
          type="button"
          disabled={deleting}
          onClick={handleDelete}
          className="shrink-0 rounded-md border border-gray-200 px-3 py-1.5 text-xs font-medium text-red-500 hover:bg-red-50 disabled:opacity-50"
        >
          Delete
        </button>
      </div>

      {/* Image preview */}
      <div className="mt-3 grid grid-cols-4 gap-2 sm:grid-cols-6">
        {variant.images?.map((image) => (
          <img
            key={image.id}
            src={image.url}
            alt={variant.sku}
            className="aspect-square w-full rounded-md border border-gray-200 bg-white object-cover"
          />
        ))}

        {!variant.images?.length && (
          <p className="col-span-full py-2 text-xs text-gray-400">
            No images yet.
          </p>
        )}
      </div>

      {/* Add variant image */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        className="mt-3 grid gap-3 border-t border-gray-100 pt-3 sm:grid-cols-2"
      >
        <div className="sm:col-span-2">
          {/* Controller connects ImageDropzone (file / onChange(file)) to the form */}
          <Controller
            name="url"
            control={control}
            render={({ field }) => (
              <ImageDropzone
                label="Select variant image"
                file={field.value}
                onChange={field.onChange}
              />
            )}
          />
          {errors.url && (
            <p className="mt-1 text-xs text-red-500">{errors.url.message}</p>
          )}
        </div>

        <div>
          <label className="mb-1 block text-xs font-medium text-gray-600">
            Order
          </label>
          <input
            type="number"
            {...register("sortOrder")}
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
          />
          {errors.sortOrder && (
            <p className="mt-1 text-xs text-red-500">
              {errors.sortOrder.message}
            </p>
          )}
        </div>

        <div className="sm:col-span-2">
          <button
            type="submit"
            disabled={isBusy}
            className="inline-flex items-center gap-1.5 rounded-md bg-gray-800 px-4 py-2 text-xs font-semibold text-white transition hover:bg-gray-900 disabled:opacity-50"
          >
            <Plus className="h-3.5 w-3.5" />
            {isBusy ? "Uploading…" : "Add"}
          </button>
        </div>
      </form>
    </div>
  );
}
