import { z } from 'zod';

export const ADDRESS_TYPES = ['HOME', 'OFFICE', 'OTHER'];

export const addressSchema = z.object({
    type: z.enum(ADDRESS_TYPES, {
        errorMap: () => ({ message: 'Select an address type' }),
    }),
    recipientName: z
        .string()
        .trim()
        .min(1, 'Recipient name is required')
        .max(100, 'Recipient name is too long'),
    // phone: z
    //     .string()
    //     .trim()
    //     .min(1, 'Phone number is required')
    //     .regex(/^[+\d][\d\s-]{6,}$/, 'Enter a valid phone number'),
    line1: z
        .string()
        .trim()
        .min(1, 'Address line 1 is required')
        .max(200, 'Address is too long'),
    line2: z.string().trim().max(200, 'Address is too long').optional().or(z.literal('')),
    city: z.string().trim().min(1, 'City is required').max(100),
    state: z.string().trim().min(1, 'State / division is required').max(100),
    postalCode: z
        .string()
        .trim()
        .min(1, 'Postal code is required')
        .max(20, 'Postal code is too long'),
    country: z.string().trim().min(1, 'Country is required').max(100),
    isDefault: z.boolean().default(false),
});