import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";

// Keep the admin section inaccessible until the current user has an admin role.
export default function AdminRoute() {
  const { user, isAuthLoading } = useAuth();
  const location = useLocation();
  const roles = user?.roles ?? [];
  const isAdmin = roles.some((role) => role === "ADMIN" || role === "ROLE_ADMIN");

  if (isAuthLoading) {
    return <div className="min-h-screen bg-gray-50" />;
  }
  
  if (!isAdmin) {
    return <Navigate to="/" replace state={{ from: location }} />;
  }

  return <Outlet />;
}
