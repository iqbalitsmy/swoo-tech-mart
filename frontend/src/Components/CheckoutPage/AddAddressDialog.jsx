import { X } from 'lucide-react';
import React, { useState } from 'react';

const AddAddressDialog = ({ onClose, onSave, initialData = null }) => {
    const isEditing = Boolean(initialData);

    const [form, setForm] = useState({
        label: initialData?.label || '',
        name: initialData?.name || '',
        phone: initialData?.phone || '',
        address: initialData?.address || '',
    });

    const handleChange = (e) => {
        setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isEditing) {
            onSave({ ...initialData, ...form });
        } else {
            onSave({ id: Date.now(), isDefault: false, ...form });
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
            <div className="absolute inset-0 bg-black/50" onClick={onClose} />

            <div className="relative w-full max-w-md rounded-lg bg-white p-6 shadow-xl">
                <div className="flex items-center justify-between">
                    <h2 className="text-lg font-bold text-gray-800">
                        {isEditing ? 'Edit Address' : 'Add New Address'}
                    </h2>
                    <button
                        onClick={onClose}
                        aria-label="Close dialog"
                        className="text-gray-400 hover:text-gray-600"
                    >
                        <X className="h-5 w-5 cursor-pointer" />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="mt-5 space-y-4">
                    <div>
                        <label className="mb-1 block text-xs font-medium text-gray-600">
                            Address Label <span className="text-red-500">*</span>
                        </label>
                        <input
                            name="label"
                            value={form.label}
                            onChange={handleChange}
                            required
                            placeholder="Home, Office, etc."
                            className="w-full rounded-md border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                        />
                    </div>

                    <div>
                        <label className="mb-1 block text-xs font-medium text-gray-600">
                            Full Name <span className="text-red-500">*</span>
                        </label>
                        <input
                            name="name"
                            value={form.name}
                            onChange={handleChange}
                            required
                            className="w-full rounded-md border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                        />
                    </div>

                    <div>
                        <label className="mb-1 block text-xs font-medium text-gray-600">
                            Phone Number <span className="text-red-500">*</span>
                        </label>
                        <input
                            name="phone"
                            type="tel"
                            value={form.phone}
                            onChange={handleChange}
                            required
                            className="w-full rounded-md border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                        />
                    </div>

                    <div>
                        <label className="mb-1 block text-xs font-medium text-gray-600">
                            Full Address <span className="text-red-500">*</span>
                        </label>
                        <textarea
                            name="address"
                            value={form.address}
                            onChange={handleChange}
                            required
                            rows={3}
                            className="w-full resize-none rounded-md border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                        />
                    </div>

                    <div className="flex gap-3 pt-2">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 rounded-md cursor-pointer border border-gray-200 py-2.5 text-sm font-semibold text-gray-600 hover:bg-gray-50"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="flex-1 rounded-md cursor-pointer bg-primary py-2.5 text-sm font-semibold text-white hover:bg-primary-dark"
                        >
                            {isEditing ? 'Update Address' : 'Save Address'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddAddressDialog;