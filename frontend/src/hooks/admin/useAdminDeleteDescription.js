import { deleteDescriptionSection } from "@/api/adminApi/productContent";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";


export function useAdminDeleteDescription(productId, reload) {
  // Variable = sectionId
  const mutationFn = (sectionId) =>
    deleteDescriptionSection(productId, sectionId);

  const handleSuccess = () => {
    toast.success("Description deleted");
    reload?.();
  };

  const handleError = (error) => {
    toast.error(error?.message || "Failed to delete description");
  };

  return useMutation({
    mutationFn,
    onSuccess: handleSuccess,
    onError: handleError,
  });
}
