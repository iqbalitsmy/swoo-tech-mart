import axiosInstance from "../axios";
import { unwrap } from "../unwrap";

export const getAdminOrders = (params) =>
    unwrap(axiosInstance.get("/admin/orders", { params }));

export const updateAdminOrderStatus = (id, status) =>
    unwrap(axiosInstance.patch(`/admin/orders/${id}/status`, { status }));
