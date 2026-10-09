import { deleteDescriptionImage } from "@/api/adminApi/productContent";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";


export function useAdminDeleteDescriptionImage(productId, reload) {
  // Variables = { sectionId, imageId }; both are needed to build the URL
  const mutationFn = ({ sectionId, imageId }) =>
    deleteDescriptionImage(productId, sectionId, imageId);

  const handleSuccess = () => {
    toast.success("Image deleted");
    reload?.();
  };

  const handleError = (error) => {
    toast.error(error?.message || "Failed to delete image");
  };

  return useMutation({
    mutationFn,
    onSuccess: handleSuccess,
    onError: handleError,
  });
}
