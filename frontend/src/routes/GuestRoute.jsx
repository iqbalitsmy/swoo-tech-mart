import React from 'react';
import { useAuth } from '@/hooks/useAuth';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

const GuestRoute = ({ redirectTo = "/" }) => {
    const { isAuthenticated, isAuthLoading } = useAuth();
    const location = useLocation();

    if (isAuthLoading) {
        return (
            <div className="flex min-h-screen items-center justify-center">
                <span className="text-sm text-gray-500">
                    Loading...
                </span>
            </div>
        );
    }

    if (isAuthenticated) {
        const from = location.state?.from?.pathname;

        return <Navigate to={from || redirectTo} replace />;
    }

    return <Outlet />;
};

export default GuestRoute;