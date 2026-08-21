import React, { useEffect, useState } from 'react';
import { MapPin, Plus, Pencil } from 'lucide-react';
import { toast } from 'sonner';
import { useAddresses, useAddAddress, useUpdateAddress } from '@/hooks/useAddresses';
import AddAddressDialog from './AddAddressDialog';

const formatAddressLine = (addr) =>
    [addr.line1, addr.line2, addr.city, addr.state, addr.postalCode, addr.country]
        .filter(Boolean)
        .join(', ');

const CheckoutAddressSection = ({ selectedAddressId, onSelectAddress }) => {
    const { data: addresses = [], isLoading, isError } = useAddresses();

    const addAddress = useAddAddress();
    const updateAddress = useUpdateAddress();

    const [dialogOpen, setDialogOpen] = useState(false);
    const [editingAddress, setEditingAddress] = useState(null);

    // Auto-pick the default (or first) address once the list loads, if checkout
    // hasn't got a selection yet.
    useEffect(() => {
        if (!selectedAddressId && addresses.length > 0) {
            const defaultAddr = addresses.find((a) => a.isDefault) ?? addresses[0];
            onSelectAddress(defaultAddr.id);
        }
    }, [addresses, selectedAddressId, onSelectAddress]);

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
                {
                    onSuccess: () => {
                        toast.success('Address updated');
                        closeDialog();
                    },
                    onError: () => toast.error('Could not update address'),
                }
            );
        } else {
            addAddress.mutate(formData, {
                // per-call onSuccess runs alongside the hook's own onSuccess
                // (which invalidates the list) — this one just grabs the new
                // id so checkout can select it immediately.
                onSuccess: (created) => {
                    toast.success('Address added');
                    onSelectAddress(created.id);
                    closeDialog();
                },
                onError: () => toast.error('Could not add address'),
            });
        }
    };

    const isSaving = addAddress.isPending || updateAddress.isPending;

    return (
        <div className="rounded-md bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
                <h2 className="text-base font-semibold text-gray-800">Delivery Address</h2>
                <button
                    type="button"
                    onClick={openAddDialog}
                    className="flex items-center gap-1.5 text-xs font-semibold uppercase text-primary hover:underline"
                >
                    <Plus className="h-3.5 w-3.5" />
                    Add New Address
                </button>
            </div>

            <div className="mt-4 space-y-3">
                {isLoading && (
                    <div className="rounded-md border border-gray-200 py-8 text-center text-sm text-gray-400">
                        Loading addresses...
                    </div>
                )}

                {isError && (
                    <div className="rounded-md border border-red-200 bg-red-50 py-8 text-center text-sm text-red-500">
                        Could not load addresses. Please try again.
                    </div>
                )}

                {!isLoading && !isError && addresses.map((addr) => {
                    const selected = selectedAddressId === addr.id;
                    return (
                        <label
                            key={addr.id}
                            className={`flex cursor-pointer items-start gap-3 rounded-md border p-4 transition-colors ${selected ? 'border-primary bg-primary/5' : 'border-gray-200 hover:bg-gray-50'
                                }`}
                        >
                            <input
                                type="radio"
                                name="checkout-address"
                                checked={selected}
                                onChange={() => onSelectAddress(addr.id)}
                                className="sr-only"
                            />
                            <div
                                className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border transition-colors ${selected ? 'border-primary' : 'border-gray-300'
                                    }`}
                            >
                                {selected && <div className="h-2.5 w-2.5 rounded-full bg-primary" />}
                            </div>

                            <div className="min-w-0 flex-1">
                                <div className="flex items-center gap-2">
                                    <MapPin className="h-4 w-4 text-primary" />
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
                            </div>

                            <button
                                type="button"
                                aria-label="Edit address"
                                onClick={() => openEditDialog(addr)}
                                className="shrink-0 text-gray-400 hover:text-primary"
                            >
                                <Pencil className="h-4 w-4" />
                            </button>
                        </label>
                    );
                })}

                {!isLoading && !isError && addresses.length === 0 && (
                    <div className="rounded-md border border-dashed border-gray-200 py-8 text-center text-sm text-gray-400">
                        No saved addresses. Add one to continue.
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

export default CheckoutAddressSection;