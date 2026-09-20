import axiosInstance from "./axios";

// Admin requests live together so pages do not need to know endpoint details.
const unwrap = (request) => request.then(({ data }) => data.data);

export const getAdminUsers = (params) =>
    unwrap(axiosInstance.get("/admin/users", { params }));

export const updateAdminUserStatus = (id, enabled) =>
    unwrap(
        axiosInstance.patch(`/admin/users/${id}/status`, {
            enabled,
        })
    );

export const updateAdminUserRoles = (id, roleIds) =>
    unwrap(
        axiosInstance.patch(`/admin/users/${id}/roles`, {
            roleIds,
        })
    );

export const getAdminOrders = (params) =>
    unwrap(axiosInstance.get("/admin/orders", { params }));

export const updateAdminOrderStatus = (id, status) =>
    unwrap(
        axiosInstance.patch(`/admin/orders/${id}/status`, {
            status,
        })
    );

export const createAdminProduct = (payload) =>
    unwrap(axiosInstance.post("/admin/products", payload));

export const updateAdminProduct = (id, payload) =>
    unwrap(axiosInstance.put(`/admin/products/${id}`, payload));

export const deleteAdminProduct = (id) =>
    unwrap(axiosInstance.delete(`/admin/products/${id}`));

export const createAdminVariant = (productId, payload) =>
    unwrap(
        axiosInstance.post(
            `/admin/products/${productId}/variants`,
            payload
        )
    );

export const updateAdminVariant = (id, payload) =>
    unwrap(axiosInstance.put(`/admin/variants/${id}`, payload));

export const deleteAdminVariant = (id) =>
    unwrap(axiosInstance.delete(`/admin/variants/${id}`));

export const addAdminProductImage = (id, payload) =>
    unwrap(
        axiosInstance.post(`/admin/products/${id}/images`, payload)
    );

export const deleteAdminProductImage = (id, imageId) =>
    unwrap(
        axiosInstance.delete(
            `/admin/products/${id}/images/${imageId}`
        )
    );

export const addAdminHighlight = (id, payload) =>
    unwrap(
        axiosInstance.post(`/admin/products/${id}/highlights`, payload)
    );

export const deleteAdminHighlight = (id, highlightId) =>
    unwrap(
        axiosInstance.delete(
            `/admin/products/${id}/highlights/${highlightId}`
        )
    );

export const addAdminDescription = (id, payload) =>
    unwrap(
        axiosInstance.post(
            `/admin/products/${id}/description/sections`,
            payload
        )
    );

export const deleteAdminDescription = (id, sectionId) =>
    unwrap(
        axiosInstance.delete(
            `/admin/products/${id}/description/sections/${sectionId}`
        )
    );

export const addAdminDescriptionImage = (id, sectionId, payload) =>
    unwrap(
        axiosInstance.post(
            `/admin/products/${id}/description/sections/${sectionId}/images`,
            payload
        )
    );

export const addAdminVariantImage = (variantId, payload) => {
    console.log(payload)

    return unwrap(axiosInstance.post(
        `/admin/variants/${variantId}/images`,
        payload
    ));
}

export const createAdminCategory = (payload) =>
    unwrap(axiosInstance.post("/admin/categories", payload));

export const updateAdminCategory = (id, payload) =>
    unwrap(axiosInstance.put(`/admin/categories/${id}`, payload));

export const deleteAdminCategory = (id) =>
    unwrap(axiosInstance.delete(`/admin/categories/${id}`));

export const getBrands = () =>
    unwrap(axiosInstance.get("/brands"));

export const createAdminBrand = (payload) =>
    unwrap(axiosInstance.post("/admin/brands", payload));

export const updateAdminBrand = (id, payload) => {
    return unwrap(axiosInstance.put(`/admin/brands/${id}`, payload));

}

export const deleteAdminBrand = (id) =>
    unwrap(axiosInstance.delete(`/admin/brands/${id}`));

export const getTags = () =>
    unwrap(axiosInstance.get("/tags"));

export const createAdminTag = (payload) =>
    unwrap(axiosInstance.post("/admin/tags", payload));

export const deleteAdminTag = (id) =>
    unwrap(axiosInstance.delete(`/admin/tags/${id}`));

export const getAttributeTypes = () =>
    unwrap(axiosInstance.get("/attribute-types"));

export const getAttributeValues = (id) =>
    unwrap(axiosInstance.get(`/attribute-types/${id}/values`));

export const createAttributeType = (payload) =>
    unwrap(
        axiosInstance.post("/admin/attribute-types", payload)
    );

export const createAttributeValue = (id, payload) =>
    unwrap(
        axiosInstance.post(
            `/admin/attribute-types/${id}/values`,
            payload
        )
    );

export const deleteAttributeValue = (id) =>
    unwrap(
        axiosInstance.delete(`/admin/attribute-values/${id}`)
    );

export const updateAdminTag = (id, payload) =>
    unwrap(axiosInstance.put(`/admin/tags/${id}`, payload));




export const updateAttributeType = (id, payload) =>
    unwrap(axiosInstance.put(`/admin/attribute-types/${id}`, payload));

export const deleteAttributeType = (id) =>
    unwrap(axiosInstance.delete(`/admin/attribute-types/${id}`));



export const updateAttributeValue = (id, payload) =>
    unwrap(axiosInstance.put(`/admin/attribute-values/${id}`, payload));

