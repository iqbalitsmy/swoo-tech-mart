import axiosInstance from "../axios";
import { unwrap } from "../unwrap";

export const getAdminUsers = (params) =>
    unwrap(axiosInstance.get("/admin/users", { params }));

export const updateAdminUserStatus = (id, enabled) =>
    unwrap(axiosInstance.patch(`/admin/users/${id}/status`, { enabled }));

export const updateAdminUserRoles = (id, roleIds) =>
    unwrap(axiosInstance.patch(`/admin/users/${id}/roles`, { roleIds }));
