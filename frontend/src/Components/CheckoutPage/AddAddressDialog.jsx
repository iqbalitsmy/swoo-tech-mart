import { X } from 'lucide-react';
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ADDRESS_TYPES, addressSchema } from '@/validators/addressValidator';

const emptyDefaults = {
    type: 'HOME',
    recipientName: '',
    phone: '',
    line1: '',
    line2: '',
    city: '',
    state: '',
    postalCode: '',
    country: '',
    isDefault: false,
};

const AddAddressDialog = ({ onClose, onSave, initialData = null, isSaving = false }) => {
    const isEditing = Boolean(initialData);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(addressSchema),
        defaultValues: { ...emptyDefaults, ...(initialData ?? {}) },
    });

    const onSubmit = (formData) => {
        onSave(formData, isEditing ? initialData.id : null);
    };

    const fieldClass = (hasError) =>
        `w-full rounded-md border px-3 py-2.5 text-sm outline-none focus:ring-1 ${hasError
            ? 'border-red-400 focus:border-red-400 focus:ring-red-400'
            : 'border-gray-200 focus:border-primary focus:ring-primary'
        }`;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
            <div className="absolute inset-0 bg-black/50" onClick={onClose} />

            <div className="relative w-full max-w-md rounded-lg bg-white p-6 shadow-xl max-h-[90vh] overflow-y-auto">
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

                <form onSubmit={handleSubmit(onSubmit)} noValidate className="mt-5 space-y-4">
                    <div className="grid grid-cols-2 gap-3">
                        <div className="col-span-2">
                            <label className="mb-1 block text-xs font-medium text-gray-600">
                                Address Type <span className="text-red-500">*</span>
                            </label>
                            <select
                                {...register('type')}
                                className={fieldClass(errors.type)}
                            >
                                {ADDRESS_TYPES.map((t) => (
                                    <option key={t} value={t}>
                                        {t.charAt(0) + t.slice(1).toLowerCase()}
                                    </option>
                                ))}
                            </select>
                            {errors.type && (
                                <p className="mt-1 text-xs text-red-500">{errors.type.message}</p>
                            )}
                        </div>

                        <div className="col-span-2">
                            <label className="mb-1 block text-xs font-medium text-gray-600">
                                Recipient Name <span className="text-red-500">*</span>
                            </label>
                            <input
                                {...register('recipientName')}
                                className={fieldClass(errors.recipientName)}
                            />
                            {errors.recipientName && (
                                <p className="mt-1 text-xs text-red-500">
                                    {errors.recipientName.message}
                                </p>
                            )}
                        </div>

                        {/* <div className="col-span-2">
                            <label className="mb-1 block text-xs font-medium text-gray-600">
                                Phone Number <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="tel"
                                {...register('phone')}
                                className={fieldClass(errors.phone)}
                            />
                            {errors.phone && (
                                <p className="mt-1 text-xs text-red-500">{errors.phone.message}</p>
                            )}
                        </div> */}

                        <div className="col-span-2">
                            <label className="mb-1 block text-xs font-medium text-gray-600">
                                Address Line 1 <span className="text-red-500">*</span>
                            </label>
                            <input
                                {...register('line1')}
                                placeholder="House, road, area"
                                className={fieldClass(errors.line1)}
                            />
                            {errors.line1 && (
                                <p className="mt-1 text-xs text-red-500">{errors.line1.message}</p>
                            )}
                        </div>

                        <div className="col-span-2">
                            <label className="mb-1 block text-xs font-medium text-gray-600">
                                Address Line 2
                            </label>
                            <input
                                {...register('line2')}
                                placeholder="Apartment, floor (optional)"
                                className={fieldClass(errors.line2)}
                            />
                            {errors.line2 && (
                                <p className="mt-1 text-xs text-red-500">{errors.line2.message}</p>
                            )}
                        </div>

                        <div>
                            <label className="mb-1 block text-xs font-medium text-gray-600">
                                City <span className="text-red-500">*</span>
                            </label>
                            <input
                                {...register('city')}
                                className={fieldClass(errors.city)}
                            />
                            {errors.city && (
                                <p className="mt-1 text-xs text-red-500">{errors.city.message}</p>
                            )}
                        </div>

                        <div>
                            <label className="mb-1 block text-xs font-medium text-gray-600">
                                State / Division <span className="text-red-500">*</span>
                            </label>
                            <input
                                {...register('state')}
                                className={fieldClass(errors.state)}
                            />
                            {errors.state && (
                                <p className="mt-1 text-xs text-red-500">{errors.state.message}</p>
                            )}
                        </div>

                        <div>
                            <label className="mb-1 block text-xs font-medium text-gray-600">
                                Postal Code <span className="text-red-500">*</span>
                            </label>
                            <input
                                {...register('postalCode')}
                                className={fieldClass(errors.postalCode)}
                            />
                            {errors.postalCode && (
                                <p className="mt-1 text-xs text-red-500">
                                    {errors.postalCode.message}
                                </p>
                            )}
                        </div>

                        <div>
                            <label className="mb-1 block text-xs font-medium text-gray-600">
                                Country <span className="text-red-500">*</span>
                            </label>
                            <input
                                {...register('country')}
                                className={fieldClass(errors.country)}
                            />
                            {errors.country && (
                                <p className="mt-1 text-xs text-red-500">
                                    {errors.country.message}
                                </p>
                            )}
                        </div>
                    </div>

                    <label className="flex items-center gap-2 text-sm text-gray-600">
                        <input
                            type="checkbox"
                            {...register('isDefault')}
                            className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                        />
                        Set as default address
                    </label>

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
                            disabled={isSaving}
                            className="flex-1 rounded-md cursor-pointer bg-primary py-2.5 text-sm font-semibold text-white hover:bg-primary-dark disabled:opacity-60"
                        >
                            {isSaving ? 'Saving...' : isEditing ? 'Update Address' : 'Save Address'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddAddressDialog;