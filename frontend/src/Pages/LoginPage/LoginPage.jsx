import Breadcrumb from '@/Components/Shared/Breadcrumb/Breadcrumb';
import { Eye, EyeOff } from 'lucide-react';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';


const items = [
    { label: "Home", href: "/" },
    { label: "Pages", href: "" },
    { label: "Login", href: "/login" },
]


const LoginPage = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({ email: '', password: '' });

    const handleChange = (e) => {
        setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // handle login logic here
        console.log(formData);
    };
    return (
        <>
            <Breadcrumb items={items} />

            <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-10">
                <div className="w-full max-w-md rounded-lg border border-gray-100 bg-white p-8 shadow-sm">
                    {/* Header */}
                    <h1 className="text-2xl font-bold text-primary">Welcome Back</h1>
                    <p className="mt-1 text-xs font-medium tracking-widest text-gray-400">
                        LOGIN TO CONTINUE
                    </p>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="mt-6 space-y-5">
                        {/* Email */}
                        <div>
                            <label
                                htmlFor="email"
                                className="mb-1 block text-sm font-medium text-gray-700"
                            >
                                Email Address
                            </label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="Example@gmail.com"
                                className="w-full rounded-md border border-gray-200 px-3 py-2.5 text-sm text-gray-900 outline-none placeholder:text-gray-400 focus:border-primary focus:ring-1 focus:ring-primary"
                            />
                        </div>

                        {/* Password */}
                        <div>
                            <label
                                htmlFor="password"
                                className="mb-1 block text-sm font-medium text-gray-700"
                            >
                                Password
                            </label>
                            <div className="relative">
                                <input
                                    id="password"
                                    name="password"
                                    type={showPassword ? 'text' : 'password'}
                                    value={formData.password}
                                    onChange={handleChange}
                                    placeholder="••••••••"
                                    className="w-full rounded-md border border-gray-200 px-3 py-2.5 pr-10 text-sm text-gray-900 outline-none placeholder:text-gray-400 focus:border-primary focus:ring-1 focus:ring-primary"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword((prev) => !prev)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                                >
                                    {showPassword ? (
                                        <EyeOff className="h-4 w-4" />
                                    ) : (
                                        <Eye className="h-4 w-4" />
                                    )}
                                </button>
                            </div>
                        </div>

                        {/* Forgot password */}
                        <Link
                            to="/forgot-password"
                            className="inline-block text-xs text-gray-500 underline underline-offset-2 hover:text-primary"
                        >
                            Forget Password ?
                        </Link>

                        {/* Submit */}
                        <button
                            type="submit"
                            className="w-full rounded-md cursor-pointer bg-primary py-2.5 text-sm font-semibold text-white transition-colors hover:bg-primary-dark"
                        >
                            LOGIN
                        </button>
                    </form>

                    {/* Sign up link */}
                    <p className="mt-4 text-center text-xs text-gray-500">
                        NEW USER ?{' '}
                        <Link to="/signup" className="font-semibold text-primary hover:underline">
                            SIGN UP
                        </Link>
                    </p>

                    {/* Divider */}
                    <div className="my-6 flex items-center gap-3">
                        <div className="h-px flex-1 bg-gray-200" />
                        <span className="text-xs text-gray-400">OR CONTINUE WITH</span>
                        <div className="h-px flex-1 bg-gray-200" />
                    </div>

                    {/* Social login */}
                    <div className="flex flex-col gap-3">
                        <button
                            type="button"
                            onClick={() => console.log('Google login')}
                            className="flex w-full items-center justify-center gap-2 cursor-pointer rounded-md border border-gray-200 py-2.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
                        >
                            <svg className="h-4 w-4" viewBox="0 0 24 24">
                                <path
                                    fill="#4285F4"
                                    d="M23.49 12.27c0-.79-.07-1.54-.19-2.27H12v4.51h6.47c-.29 1.48-1.14 2.73-2.4 3.58v3h3.86c2.26-2.09 3.56-5.17 3.56-8.82z"
                                />
                                <path
                                    fill="#34A853"
                                    d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.86-3c-1.08.72-2.45 1.16-4.07 1.16-3.13 0-5.78-2.11-6.73-4.96H1.29v3.09C3.26 21.3 7.31 24 12 24z"
                                />
                                <path
                                    fill="#FBBC05"
                                    d="M5.27 14.29c-.25-.72-.38-1.49-.38-2.29s.14-1.57.38-2.29V6.62H1.29A11.94 11.94 0 000 12c0 1.94.47 3.77 1.29 5.38l3.98-3.09z"
                                />
                                <path
                                    fill="#EA4335"
                                    d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.31 0 3.26 2.7 1.29 6.62l3.98 3.09C6.22 6.86 8.87 4.75 12 4.75z"
                                />
                            </svg>
                            Continue with Google
                        </button>

                        <button
                            type="button"
                            onClick={() => console.log('Facebook login')}
                            className="flex w-full items-center justify-center gap-2 cursor-pointer rounded-md bg-[#1877F2] py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#166FE5]"
                        >
                            <svg className="h-4 w-4 fill-white" viewBox="0 0 24 24">
                                <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.99 3.66 9.13 8.44 9.88v-6.99h-2.54V12h2.54V9.8c0-2.5 1.49-3.89 3.77-3.89 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.78l-.44 2.89h-2.34v6.99C18.34 21.13 22 16.99 22 12z" />
                            </svg>
                            Continue with Facebook
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default LoginPage;