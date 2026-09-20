import React, { useState } from 'react';
import { Plus, Pencil, Trash2, MapPin } from 'lucide-react';
import AddAddressDialog from '@/components/CheckoutPage/AddAddressDialog';
import {
    useAddresses,
    useAddAddress,
    useUpdateAddress,
    useDeleteAddress,
    useSetDefaultAddress,
} from '@/hooks/useAddresses';

const formatAddressLine = (addr) => {
    return [addr.line1, addr.line2, addr.city, addr.state, addr.postalCode, addr.country]
        .filter(Boolean)
        .join(', ');
};

const MyAddress = () => {
    const { data: addresses = [], isLoading, isError } = useAddresses();

    const addAddress = useAddAddress();
    const updateAddress = useUpdateAddress();
    const deleteAddress = useDeleteAddress();
    const setDefaultAddress = useSetDefaultAddress();

    const [dialogOpen, setDialogOpen] = useState(false);
    const [editingAddress, setEditingAddress] = useState(null);

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

    const handleSaveAddress = (formData, editingId) => {
        if (editingId) {
            updateAddress.mutate(
                { id: editingId, payload: formData },
                { onSuccess: closeDialog }
            );
        } else {
            addAddress.mutate(formData, { onSuccess: closeDialog });
        }
    };

    const handleDelete = (id) => {
        deleteAddress.mutate(id);
    };

    const handleSetDefault = (id) => {
        setDefaultAddress.mutate(id);
    };

    const isSaving = addAddress.isPending || updateAddress.isPending;

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
                {isLoading && (
                    <div className="rounded-md border border-gray-200 py-10 text-center text-sm text-gray-400">
                        Loading addresses...
                    </div>
                )}

                {isError && (
                    <div className="rounded-md border border-red-200 bg-red-50 py-10 text-center text-sm text-red-500">
                        Could not load addresses. Please try again.
                    </div>
                )}

                {!isLoading && !isError && addresses.map((addr) => (
                    <div
                        key={addr.id}
                        className="flex items-start justify-between gap-4 rounded-md border border-gray-200 p-4"
                    >
                        <div className="flex gap-3">
                            <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                            <div>
                                <div className="flex items-center gap-2">
                                    <p className="text-sm font-semibold text-gray-800">
                                        {addr.type.charAt(0) + addr.type.slice(1).toLowerCase()}
                                    </p>
                                    {addr.isDefault && (
                                        <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-semibold uppercase text-primary">
                                            Default
                                        </span>
                                    )}
                                </div>
                                <p className="mt-1 text-sm text-gray-600">
                                    {addr.recipientName}
                                    {addr.phone ? ` · ${addr.phone}` : ''}
                                </p>
                                <p className="text-sm text-gray-400">{formatAddressLine(addr)}</p>

                                {!addr.isDefault && (
                                    <button
                                        onClick={() => handleSetDefault(addr.id)}
                                        disabled={setDefaultAddress.isPending}
                                        className="mt-2 text-xs font-medium text-primary hover:underline disabled:opacity-60"
                                    >
                                        Set as default
                                    </button>
                                )}
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
                                onClick={() => handleDelete(addr.id)}
                                disabled={deleteAddress.isPending}
                                className="text-gray-400 hover:text-red-500 cursor-pointer disabled:opacity-60"
                            >
                                <Trash2 className="h-4 w-4" />
                            </button>
                        </div>
                    </div>
                ))}

                {!isLoading && !isError && addresses.length === 0 && (
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
                    isSaving={isSaving}
                />
            )}
        </div>
    );
};

export default MyAddress;