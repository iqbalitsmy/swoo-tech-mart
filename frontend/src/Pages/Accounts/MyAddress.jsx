import React, { useState } from 'react';
import { Plus, Pencil, Trash2, MapPin } from 'lucide-react';
import AddAddressDialog from '@/Components/CheckoutPage/AddAddressDialog';

const initialAddresses = [
    {
        id: 1,
        label: 'Home',
        name: 'Mark Cole',
        phone: '+1 0231 4554 452',
        address: '123 Green Road, Dhanmondi, Dhaka 1209',
        isDefault: true,
    },
];

const MyAddress = () => {
    const [addresses, setAddresses] = useState(initialAddresses);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [editingAddress, setEditingAddress] = useState(null);

    const removeAddress = (id) => {
        setAddresses((prev) => prev.filter((a) => a.id !== id));
    };

    const setDefault = (id) => {
        setAddresses((prev) =>
            prev.map((a) => ({ ...a, isDefault: a.id === id }))
        );
    };

    const openAddDialog = () => {
        setEditingAddress(null);
        setDialogOpen(true);
    };

    const openEditDialog = (addr) => {
        setEditingAddress(addr);
        setDialogOpen(true);
    };

    const closeDialog = () => {
        setDialogOpen(false);
        setEditingAddress(null);
    };

    const handleSaveAddress = (addressData) => {
        setAddresses((prev) => {
            const exists = prev.some((a) => a.id === addressData.id);
            if (exists) {
                // Editing: replace the matching address
                return prev.map((a) =>
                    a.id === addressData.id ? addressData : a
                );
            }
            // Adding: if it's the first address, make it default
            const isFirst = prev.length === 0;
            return [...prev, { ...addressData, isDefault: isFirst }];
        });
        closeDialog();
    };

    return (
        <div>
            <div className="flex items-center justify-between">
                <h1 className="text-lg font-bold text-gray-800">My Address</h1>
                <button
                    type="button"
                    onClick={openAddDialog}
                    className="flex items-center gap-1.5 cursor-pointer rounded-md bg-primary px-4 py-2 text-xs font-semibold uppercase tracking-wide text-white hover:bg-primary-dark"
                >
                    <Plus className="h-3.5 w-3.5" />
                    Add New
                </button>
            </div>

            <div className="mt-5 space-y-3">
                {addresses.map((addr) => (
                    <div
                        key={addr.id}
                        className="flex items-start justify-between gap-4 rounded-md border border-gray-200 p-4"
                    >
                        <div className="flex gap-3">
                            <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                            <div>
                                <div className="flex items-center gap-2">
                                    <p className="text-sm font-semibold text-gray-800">
                                        {addr.label}
                                    </p>
                                    {addr.isDefault && (
                                        <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-semibold uppercase text-primary">
                                            Default
                                        </span>
                                    )}
                                </div>
                                <p className="mt-1 text-sm text-gray-600">
                                    {addr.name} · {addr.phone}
                                </p>
                                <p className="text-sm text-gray-400">{addr.address}</p>

                                {
                                    !addr.isDefault && (
                                        <button
                                            onClick={() => setDefault(addr.id)}
                                            className="mt-2 text-xs font-medium text-primary hover:underline"
                                        >
                                            Set as default
                                        </button>
                                    )
                                }
                            </div>
                        </div>

                        <div className="flex shrink-0 gap-3">
                            <button
                                aria-label="Edit address"
                                onClick={() => openEditDialog(addr)}
                                className="text-gray-400 hover:text-primary cursor-pointer"
                            >
                                <Pencil className="h-4 w-4" />
                            </button>
                            <button
                                aria-label="Delete address"
                                onClick={() => removeAddress(addr.id)}
                                className="text-gray-400 hover:text-red-500 cursor-pointer"
                            >
                                <Trash2 className="h-4 w-4" />
                            </button>
                        </div>
                    </div>
                ))}

                {addresses.length === 0 && (
                    <div className="rounded-md border border-dashed border-gray-200 py-10 text-center text-sm text-gray-400">
                        No saved addresses yet.
                    </div>
                )}
            </div>

            {dialogOpen && (
                <AddAddressDialog
                    onClose={closeDialog}
                    onSave={handleSaveAddress}
                    initialData={editingAddress}
                />
            )}
        </div>
    );
};

export default MyAddress;