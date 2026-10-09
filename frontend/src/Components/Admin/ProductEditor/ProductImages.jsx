import { Plus } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";

import { uploadCloudinaryImage } from "@/api/cloudinaryApi";
import { productImageSchema } from "@/validators/productValidator";
import { useAddProductImage } from "@/hooks/admin/useAddProductImage";
import { useAdminDeleteProductImage } from "@/hooks/admin/useAdminDeleteProductImage";
import ProductImage from "./ProductImage/ProductImage";
import ImageDropzone from "./inputFields/ImageDropzone";


export default function ProductImages({ product, reload }) {
  const addMutation = useAddProductImage(product.id, reload);
  const deleteMutation = useAdminDeleteProductImage(product.id, reload);

  // No zodResolver here: the schema expects a URL string, but the form
  // holds a File until it is uploaded. So we upload first, then validate.
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

  // Submit flow: 1) upload file to Cloudinary  2) validate  3) save to backend
  // isSubmitting stays true until this whole async function finishes
  const onSubmit = async (values) => {
    const data = { ...values };

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
    const result = productImageSchema.safeParse(data);
    if (!result.success) {
      applyFieldErrors(result.error.issues);
      return;
    }

    // Step 3: save
    addMutation.mutate(result.data, { onSuccess: handleAddSuccess });
  };

  // Delete handler shared by every ProductImage tile
  const handleDelete = (imageId) => deleteMutation.mutate(imageId);


  const hasImages = product.images?.length > 0;
  const isBusy = isSubmitting || addMutation.isPending;

  return (
    // Card wrapper (was SectionCard)
    <div className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm">
      <div>
        <h4 className="font-semibold text-gray-800">Product image gallery</h4>
        <p className="mt-1 text-sm text-gray-500">
          Upload images to build the gallery.
        </p>
      </div>

      {/* Existing gallery */}
      <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-5">
        {product.images?.map((item) => (
          <ProductImage
            key={item.id}
            image={item}
            onDelete={handleDelete}
            // Only the image being deleted shows the disabled state
            isDeleting={
              deleteMutation.isPending && deleteMutation.variables === item.id
            }
          />
        ))}

        {!hasImages && (
          <p className="col-span-full py-4 text-sm text-gray-400">
            No images uploaded yet.
          </p>
        )}
      </div>

      {/* Add form */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        className="mt-3 grid gap-3 sm:grid-cols-2"
      >
        <div className="sm:col-span-2">
          <div className="sm:col-span-2">
            {/* Controller connects ImageDropzone (file / onChange(file)) to the form */}
            <Controller
              name="url"
              control={control}
              render={({ field }) => (
                <ImageDropzone
                  label="Select product image"
                  file={field.value}
                  onChange={field.onChange}
                />
              )}
            />
            {errors.url && (
              <p className="mt-1 text-xs text-red-500">{errors.url.message}</p>
            )}
          </div>
          {errors.url && (
            <p className="mt-1 text-xs text-red-500">{errors.url.message}</p>
          )}
        </div>

        <div>
          <label className="mb-1 block text-xs font-medium text-gray-600">
            Order
          </label>
          {/* valueAsNumber so sortOrder is sent as a number, not a string */}
          <input
            type="number"
            {...register("sortOrder", { valueAsNumber: true })}
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
