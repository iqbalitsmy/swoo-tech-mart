import { zodResolver } from "@hookform/resolvers/zod";
import { Plus } from "lucide-react";
import { useForm } from "react-hook-form";

import { descriptionSectionSchema } from "@/validators/productValidator";
import DescriptionSection from "./DescriptionSection/DescriptionSection";
import { useAddDescriptionSection } from "@/hooks/admin/useAddDescriptionSection";


export default function ProductDescriptions({ product, reload }) {
  const sectionMutation = useAddDescriptionSection(product.id, reload);

  // Form for adding a NEW section (edit / image forms live in DescriptionSection)
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: zodResolver(descriptionSectionSchema) });

  // Clear the form after a successful add
  const handleAddSuccess = () => reset();

  // Runs only when the form passes validation
  const onValid = (data) => {
    sectionMutation.mutate(data, { onSuccess: handleAddSuccess });
  };

  const hasSections = product.descriptions?.length > 0;

  return (
    // Card wrapper (was SectionCard)
    <div className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm">
      <div>
        <h4 className="font-semibold text-gray-800">Description sections</h4>
        <p className="mt-1 text-sm text-gray-500">
          Write clear, structured product details.
        </p>
      </div>

      {/* Existing sections: each one can be edited, deleted, and given images */}
      <div className="mt-4 space-y-3">
        {product.descriptions?.map((item) => (
          <DescriptionSection
            key={item.id}
            productId={product.id}
            section={item}
            reload={reload}
          />
        ))}

        {!hasSections && (
          <p className="text-sm text-gray-400">No description sections yet.</p>
        )}
      </div>

      {/* Add new section */}
      <div className="mt-5 border-t border-gray-100 pt-5">
        <h5 className="text-sm font-semibold text-gray-800">
          Add description section
        </h5>
        <p className="mt-1 text-sm text-gray-500">
          Use the larger editor to write clear product details.
        </p>

        <form
          onSubmit={handleSubmit(onValid)}
          noValidate
          className="mt-3 grid gap-3 sm:grid-cols-2"
        >
          <div>
            <label className="mb-1 block text-xs font-medium text-gray-600">
              Section title
            </label>
            <input
              type="text"
              {...register("title")}
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
            />
            {errors.title && (
              <p className="mt-1 text-xs text-red-500">
                {errors.title.message}
              </p>
            )}
          </div>

          <div>
            <label className="mb-1 block text-xs font-medium text-gray-600">
              Order
            </label>
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
            <label className="mb-1 block text-xs font-medium text-gray-600">
              Description
            </label>
            <textarea
              rows={6}
              placeholder="Write a detailed product description…"
              {...register("body")}
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
            />
            {errors.body && (
              <p className="mt-1 text-xs text-red-500">{errors.body.message}</p>
            )}
          </div>

          <div className="sm:col-span-2">
            <button
              type="submit"
              disabled={sectionMutation.isPending}
              className="inline-flex items-center gap-1.5 rounded-md bg-gray-800 px-4 py-2 text-xs font-semibold text-white transition hover:bg-gray-900 disabled:opacity-50"
            >
              <Plus className="h-3.5 w-3.5" />
              {sectionMutation.isPending ? "Adding…" : "Add"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
