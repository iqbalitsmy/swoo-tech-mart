import React, { useState } from 'react';

const AccountsInfo = () => {
    const [formData, setFormData] = useState({
        firstName: 'Mark',
        lastName: 'Cole',
        email: 'swoo@gmail.com',
        phone: '+1 0231 4554 452',
    });

    const handleChange = (e) => {
        setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
    };
    return (
        <div>
            <h1 className="text-lg font-bold text-gray-800">Account Info</h1>

            <form onSubmit={handleSubmit} className="mt-5 space-y-5">
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                    <div>
                        <label
                            htmlFor="firstName"
                            className="mb-1 block text-xs font-medium text-gray-600"
                        >
                            First Name <span className="text-red-500">*</span>
                        </label>
                        <input
                            id="firstName"
                            name="firstName"
                            type="text"
                            required
                            value={formData.firstName}
                            onChange={handleChange}
                            className="w-full rounded-md border border-gray-200 px-3 py-2.5 text-sm text-gray-900 outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="lastName"
                            className="mb-1 block text-xs font-medium text-gray-600"
                        >
                            Last Name <span className="text-red-500">*</span>
                        </label>
                        <input
                            id="lastName"
                            name="lastName"
                            type="text"
                            required
                            value={formData.lastName}
                            onChange={handleChange}
                            className="w-full rounded-md border border-gray-200 px-3 py-2.5 text-sm text-gray-900 outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                        />
                    </div>
                </div>

                <div>
                    <label
                        htmlFor="email"
                        className="mb-1 block text-xs font-medium text-gray-600"
                    >
                        Email Address <span className="text-red-500">*</span>
                    </label>
                    <input
                        id="email"
                        name="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full rounded-md border border-gray-200 px-3 py-2.5 text-sm text-gray-900 outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                    />
                </div>

                <div>
                    <label
                        htmlFor="phone"
                        className="mb-1 block text-xs font-medium text-gray-600"
                    >
                        Phone Number <span className="text-gray-400">(Optional)</span>
                    </label>
                    <input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full rounded-md border border-gray-200 px-3 py-2.5 text-sm text-gray-900 outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                    />
                </div>

                <button
                    type="submit"
                    className="rounded-md bg-primary px-6 py-2.5 text-sm font-semibold uppercase tracking-wide text-white transition-colors hover:bg-primary-dark"
                >
                    Save
                </button>
            </form>
        </div>
    );
};

export default AccountsInfo;