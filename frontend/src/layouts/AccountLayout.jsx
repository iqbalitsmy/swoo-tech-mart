import Breadcrumb from '@/Components/Shared/Breadcrumb/Breadcrumb';
import { useAuth } from '@/hooks/useAuth';
import { ChevronRight, UserRound } from 'lucide-react';
import React, { useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';

const items = [
    { label: "Home", href: "/" },
    { label: "Pages", href: "" },
    { label: "Account", href: "/account" },
]
const navItems = [
    { label: 'Account info', path: '/account' },
    { label: 'My order', path: '/account/orders' },
    { label: 'My address', path: '/account/address' },
    { label: 'Change password', path: '/account/password' },
];

const AccountLayout = () => {
    const { user, isAuthenticated, isAuthLoading } = useAuth();
    const [avatarError, setAvatarError] = useState(false);

    if (isAuthLoading) {
        return (
            <section className="min-h-screen">
                <Breadcrumb items={items} />
                <div className="mx-auto max-w-6xl px-4 py-8">
                    <div className="rounded-lg border border-primary/30 bg-white p-6 shadow-sm">
                        <p className="text-sm text-gray-400">Loading account…</p>
                    </div>
                </div>
            </section>
        );
    }

    const displayName = user?.name || user?.fullName || 'Guest';
    const displayEmail = user?.email || '';
    const showAvatar = user?.avatar && !avatarError;

    return (
        <section className='min-h-screen'>
            <Breadcrumb items={items} />

            <div className="mx-auto max-w-6xl px-4 py-8">
                <div className="rounded-lg border border-primary/30 bg-white p-4 shadow-sm sm:p-6">
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-[220px_1fr]">
                        {/* ---------- Sidebar ---------- */}
                        <div>
                            <div className="rounded-md border border-gray-100 p-3">
                                {showAvatar ? (
                                    <img
                                        src={user.avatar}
                                        alt={displayName}
                                        onError={() => setAvatarError(true)}
                                        className="h-32 w-full rounded-md bg-gray-100 object-cover"
                                    />
                                ) : (
                                    <div className="flex h-32 w-full items-center justify-center rounded-md bg-gray-100">
                                        <UserRound className="h-10 w-10 text-gray-300" />
                                    </div>
                                )}
                                <p className="mt-3 text-sm font-semibold text-gray-800">
                                    {displayName}
                                </p>
                                <p className="text-xs text-gray-400">{displayEmail}</p>
                            </div>

                            <nav className="mt-4 flex flex-col gap-2">
                                {
                                    navItems.map((item) => (
                                        <NavLink
                                            key={item.path}
                                            to={item.path}
                                            end={item.path === '/account'}
                                            className={({ isActive }) =>
                                                `flex items-center justify-between rounded-md border px-3 py-2.5 text-sm font-medium transition-colors ${isActive
                                                    ? 'border-primary bg-primary text-white'
                                                    : 'border-gray-200 text-gray-700 hover:bg-gray-50'
                                                }`
                                            }
                                        >
                                            {item.label}
                                            <ChevronRight className="h-4 w-4" />
                                        </NavLink>
                                    ))
                                }
                            </nav>
                        </div>

                        {/* ---------- Active page ---------- */}
                        <div>
                            <Outlet />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AccountLayout;