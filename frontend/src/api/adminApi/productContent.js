import axiosInstance from "../axios";
import { unwrap } from "../unwrap";

// Highlights
export const addAdminHighlight = (id, payload) =>
  unwrap(axiosInstance.post(`/admin/products/${id}/highlights`, payload));

export const deleteAdminHighlight = (id, highlightId) =>
  unwrap(
    axiosInstance.delete(`/admin/products/${id}/highlights/${highlightId}`),
  );

// Description sections
export const addAdminDescription = (id, payload) =>
  unwrap(
    axiosInstance.post(`/admin/products/${id}/description/sections`, payload),
  );

export const updateDescriptionSection = async (productId, sectionId, data) => {
  await axiosInstance.put(
    `/admin/products/${productId}/description/sections/${sectionId}`,
    data,
  );
};

export const deleteDescriptionSection = async (productId, sectionId) => {
  await axiosInstance.delete(
    `/admin/products/${productId}/description/sections/${sectionId}`,
  );
};

// Description sections image
export const addAdminDescriptionImage = (id, sectionId, payload) =>
  unwrap(
    axiosInstance.post(
      `/admin/products/${id}/description/sections/${sectionId}/images`,
      payload,
    ),
  );

export const deleteDescriptionImage = async (productId, sectionId, imageId) => {
  await axiosInstance.delete(
    `/admin/products/${productId}/description/sections/${sectionId}/images/${imageId}`,
  );
};
