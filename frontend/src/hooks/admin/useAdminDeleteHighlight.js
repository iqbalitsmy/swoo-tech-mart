import { deleteAdminHighlight } from "@/api/adminApi/productContent";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";


export function useAdminDeleteHighlight(productId, reload) {
  // The mutation receives only the highlightId; productId comes from the hook argument
  const mutationFn = (highlightId) => deleteAdminHighlight(productId, highlightId);

  const handleSuccess = () => {
    toast.success("Highlight deleted");
    reload?.(); // refresh the product so the list updates
  };

  const handleError = (error) => {
    toast.error(error?.message || "Failed to delete highlight");
  };

  return useMutation({
    mutationFn,
    onSuccess: handleSuccess,
    onError: handleError,
  });
}
