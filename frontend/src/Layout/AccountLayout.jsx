import Breadcrumb from '@/Components/Shared/Breadcrumb/Breadcrumb';
import { ChevronRight } from 'lucide-react';
import React from 'react';
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
    const user = {
        name: 'Mark Cole',
        email: 'swoo@gmail.com',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Mark',
    };

    return (
        <section className='min-h-screen'>
            <Breadcrumb items={items} />

            <div className="mx-auto max-w-6xl px-4 py-8">
                <div className="rounded-lg border border-primary/30 bg-white p-4 shadow-sm sm:p-6">
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-[220px_1fr]">
                        {/* ---------- Sidebar ---------- */}
                        <div>
                            <div className="rounded-md border border-gray-100 p-3">
                                <img
                                    src={user.avatar}
                                    alt={user.name}
                                    className="h-32 w-full rounded-md bg-gray-100 object-cover"
                                />
                                <p className="mt-3 text-sm font-semibold text-gray-800">
                                    {user.name}
                                </p>
                                <p className="text-xs text-gray-400">{user.email}</p>
                            </div>

                            <nav className="mt-4 flex flex-col gap-2">
                                {navItems.map((item) => (
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
                                ))}
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