import axiosInstance from "../axios";
import { unwrap } from "../unwrap";

// Attribute types
export const getAttributeTypes = () =>
  unwrap(axiosInstance.get("/attribute-types"));

export const createAttributeType = (payload) =>
  unwrap(axiosInstance.post("/admin/attribute-types", payload));

export const updateAttributeType = (id, payload) =>
  unwrap(axiosInstance.put(`/admin/attribute-types/${id}`, payload));

export const deleteAttributeType = (id) =>
  unwrap(axiosInstance.delete(`/admin/attribute-types/${id}`));

// Attribute values
export const getAttributeValues = (id) =>
  unwrap(axiosInstance.get(`/attribute-types/${id}/values`));

export const createAttributeValue = (id, payload) =>
  unwrap(axiosInstance.post(`/admin/attribute-types/${id}/values`, payload));

export const updateAttributeValue = (id, payload) =>
  unwrap(axiosInstance.put(`/admin/attribute-values/${id}`, payload));

export const deleteAttributeValue = (id) =>
  unwrap(axiosInstance.delete(`/admin/attribute-values/${id}`));
