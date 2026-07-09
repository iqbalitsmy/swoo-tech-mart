import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

const ChangePassword = () => {
    const [visible, setVisible] = useState({
        current: false,
        next: false,
        confirm: false,
    });
    const [formData, setFormData] = useState({
        current: '',
        next: '',
        confirm: '',
    });
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const toggleVisible = (field) => {
        setVisible((prev) => ({ ...prev, [field]: !prev[field] }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (formData.next !== formData.confirm) {
            setError('New password and confirm password do not match');
            return;
        }
        setError('');
        console.log(formData);
    };

    const fields = [
        { name: 'current', label: 'Current Password' },
        { name: 'next', label: 'New Password' },
        { name: 'confirm', label: 'Confirm New Password' },
    ];

    return (
        <div>
            <h1 className="text-lg font-bold text-gray-800">Change Password</h1>

            <form onSubmit={handleSubmit} className="mt-5 max-w-md space-y-5">
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
                                name={field.name}
                                type={visible[field.name] ? 'text' : 'password'}
                                required
                                value={formData[field.name]}
                                onChange={handleChange}
                                className="w-full rounded-md border border-gray-200 px-3 py-2.5 pr-10 text-sm text-gray-900 outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                            />
                            <button
                                type="button"
                                onClick={() => toggleVisible(field.name)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                aria-label={
                                    visible[field.name] ? 'Hide password' : 'Show password'
                                }
                            >
                                {visible[field.name] ? (
                                    <EyeOff className="h-4 w-4" />
                                ) : (
                                    <Eye className="h-4 w-4" />
                                )}
                            </button>
                        </div>
                    </div>
                ))}

                {error && (
                    <p role="alert" className="text-xs font-medium text-red-500">
                        {error}
                    </p>
                )}

                <button
                    type="submit"
                    className="rounded-md bg-primary px-6 py-2.5 text-sm font-semibold uppercase tracking-wide text-white transition-colors hover:bg-primary-dark"
                >
                    Update Password
                </button>
            </form>
        </div>
    );
};

export default ChangePassword;