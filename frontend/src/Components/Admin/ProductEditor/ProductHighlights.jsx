import { zodResolver } from "@hookform/resolvers/zod";
import { Plus } from "lucide-react";
import { useForm } from "react-hook-form";

import { highlightSchema } from "@/validators/productValidator";
import { useAddHighlight } from "@/hooks/admin/useAddHighlight";
import Highlight from "./Highlight/Highlight";
import { useAdminDeleteHighlight } from "@/hooks/admin/useAdminDeleteHighlight";


export default function ProductHighlights({ product, reload }) {
  const addMutation = useAddHighlight(product.id, reload);
  const deleteMutation = useAdminDeleteHighlight(product.id, reload);

  // Form state + zod validation (errors are shown per field, under each input)
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: zodResolver(highlightSchema) });

  // Runs only when the form passes validation
  const onValid = (data) => {
    addMutation.mutate(data, { onSuccess: handleAddSuccess });
  };

  // Clear the form after a successful add
  const handleAddSuccess = () => reset();

  // Delete handler shared by every Highlight row
  const handleDelete = (highlightId) => deleteMutation.mutate(highlightId);

  // Render one row; only the row being deleted shows the disabled state
  const renderHighlight = (item) => (
    <Highlight
      key={item.id}
      highlight={item}
      onDelete={handleDelete}
      isDeleting={
        deleteMutation.isPending && deleteMutation.variables === item.id
      }
    />
  );

  const hasHighlights = product.highlights?.length > 0;

  return (
    // Card wrapper
    <div className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm">
      <div>
        <h4 className="font-semibold text-gray-800">Highlights</h4>
        <p className="mt-1 text-sm text-gray-500">
          Add concise selling points for customers.
        </p>
      </div>

      {/* Existing highlights */}
      <div className="mt-4 space-y-2">
        {product.highlights?.map(renderHighlight)}

        {!hasHighlights && (
          <p className="text-sm text-gray-400">No highlights yet.</p>
        )}
      </div>

      {/* Add form */}
      <form
        onSubmit={handleSubmit(onValid)}
        noValidate
        className="mt-3 grid gap-3 sm:grid-cols-2"
      >
        <div className="sm:col-span-2">
          <label className="mb-1 block text-xs font-medium text-gray-600">
            Highlight text
          </label>
          <input
            type="text"
            {...register("text")}
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
          />
          {errors.text && (
            <p className="mt-1 text-xs text-red-500">{errors.text.message}</p>
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
            disabled={addMutation.isPending}
            className="inline-flex items-center gap-1.5 rounded-md bg-gray-800 px-4 py-2 text-xs font-semibold text-white transition hover:bg-gray-900 disabled:opacity-50"
          >
            <Plus className="h-3.5 w-3.5" />
            {addMutation.isPending ? "Adding…" : "Add"}
          </button>
        </div>
      </form>
    </div>
  );
}
