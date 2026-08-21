import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Eye, EyeOff } from 'lucide-react';
import { passwordSchema } from '@/validators/authValidators';
import { useChangePassword } from '@/hooks/useAuth';

const fields = [
    { name: 'currentPassword', label: 'Current Password' },
    { name: 'newPassword', label: 'New Password' },
    { name: 'confirmPassword', label: 'Confirm New Password' },
];

const ChangePassword = () => {
    const [visible, setVisible] = useState({
        currentPassword: false,
        newPassword: false,
        confirmPassword: false,
    });

    const {
        register,
        handleSubmit,
        reset,
        setError,
        formState: { errors, isSubmitting },
    } = useForm({
        resolver: zodResolver(passwordSchema),
        defaultValues: {
            currentPassword: '',
            newPassword: '',
            confirmPassword: '',
        },
    });
 
    const mutation = useChangePassword({ onSuccess: () => reset() });

    const toggleVisible = (field) => {
        setVisible((prev) => ({ ...prev, [field]: !prev[field] }));
    };

    const onSubmit = (values) => {
        mutation.mutate(
            {
                currentPassword: values.currentPassword,
                newPassword: values.newPassword,
            },
            {
                onError: (err) => {
                    const status = err?.response?.status;
                    if (status === 400 || status === 401) {
                        setError('currentPassword', {
                            type: 'server',
                            message: err?.response?.data?.message || 'Current password is incorrect',
                        });
                    }
                },
            }
        );
    };

    return (
        <div>
            <h1 className="text-lg font-bold text-gray-800">Change Password</h1>

            <form
                onSubmit={handleSubmit(onSubmit)}
                className="mt-5 max-w-md space-y-5"
                noValidate
            >
                {fields.map((field) => (
                    <div key={field.name}>
                        <label
                            htmlFor={field.name}
                            className="mb-1 block text-xs font-medium text-gray-600"
                        >
                            {field.label} <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                            <input
                                id={field.name}
                                type={visible[field.name] ? 'text' : 'password'}
                                {...register(field.name)}
                                className="w-full rounded-md border border-gray-200 px-3 py-2.5 pr-10 text-sm text-gray-900 outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                            />
                            <button
                                type="button"
                                onClick={() => toggleVisible(field.name)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                aria-label={visible[field.name] ? 'Hide password' : 'Show password'}
                            >
                                {visible[field.name] ? (
                                    <EyeOff className="h-4 w-4" />
                                ) : (
                                    <Eye className="h-4 w-4" />
                                )}
                            </button>
                        </div>
                        {errors[field.name] && (
                            <p role="alert" className="mt-1 text-xs font-medium text-red-500">
                                {errors[field.name].message}
                            </p>
                        )}
                    </div>
                ))}

                <button
                    type="submit"
                    disabled={isSubmitting || mutation.isPending}
                    className="rounded-md bg-primary px-6 py-2.5 text-sm font-semibold uppercase tracking-wide text-white transition-colors hover:bg-primary-dark disabled:cursor-not-allowed disabled:opacity-60"
                >
                    {mutation.isPending ? 'Updating…' : 'Update Password'}
                </button>
            </form>
        </div>
    );
};

export default ChangePassword;