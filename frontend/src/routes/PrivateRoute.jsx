import { useAuth } from '@/hooks/useAuth';
import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

const PrivateRoute = () => {
    const { isAuthenticated, isAuthLoading } = useAuth();
    const location = useLocation();

    if (isAuthLoading) {
        return (<div className="flex min-h-screen items-center justify-center">
            <span className="text-sm text-gray-500">Loading...</span>
        </div>)
    }

    if (!isAuthenticated) {
        // Remember where the user was headed so useLogin can send them back
        // after a successful login.
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return <Outlet />
};

export default PrivateRoute;