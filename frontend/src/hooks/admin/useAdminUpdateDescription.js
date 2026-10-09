import { updateDescriptionSection } from "@/api/adminApi/productContent";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";


export function useAdminUpdateDescription(productId, reload) {
  // Variables = { sectionId, title, body, sortOrder }; sectionId goes in the URL, the rest in the body
  const mutationFn = ({ sectionId, ...body }) =>
    updateDescriptionSection(productId, sectionId, body);

  const handleSuccess = () => {
    toast.success("Description updated");
    reload?.();
  };

  const handleError = (error) => {
    toast.error(error?.message || "Failed to update description");
  };

  return useMutation({
    mutationFn,
    onSuccess: handleSuccess,
    onError: handleError,
  });
}
