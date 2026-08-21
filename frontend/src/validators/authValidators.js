import z from "zod";


export const loginSchema = z.object({
    email: z
        .string()
        .min(1, "Email is required")
        .email("Enter a valid email address"),
    password: z
        .string()
        .min(1, 'Password is required')
        .min(3, 'Password must be at least 3 character')
});

export const registerSchema = z
    .object({
        fullName: z
            .string()
            .min(1, "Enter is required")
            .min(2, "full name is too short"),
        email: z
            .string()
            .min(1, "Enter is required")
            .email("Enter a valid email address"),
        password: z
            .string()
            .min(1, "Password is required")
            .min(3, "Password must be at least 3 character"),
        confirmPassword: z
            .string()
            .min(1, "please confirm your password")
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: 'Password do not match',
        path: ['confirmPassword'],
    })

export const passwordSchema = z
    .object({
        currentPassword: z.string().min(1, 'Current password is required'),
        newPassword: z
            .string()
            .min(3, 'New password must be at least 3 characters')
            .max(72, 'New password is too long'),
        confirmPassword: z.string().min(1, 'Please confirm your new password'),
    })
    .refine((data) => data.newPassword === data.confirmPassword, {
        message: 'New password and confirm password do not match',
        path: ['confirmPassword'],
    })
    .refine((data) => data.newPassword !== data.currentPassword, {
        message: 'New password must be different from current password',
        path: ['newPassword'],
    });