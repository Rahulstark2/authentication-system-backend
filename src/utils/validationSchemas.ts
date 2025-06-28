import { z } from 'zod';


export const signupSchema = z.object({
  body: z.object({
    name: z.string().min(1, 'Name is required'),
    email: z.string().email('A valid email is required'),
    password: z.string().min(8, 'Password must be at least 8 characters for security'),
  }),
});


export const loginSchema = z.object({
  body: z.object({
    email: z.string().email('A valid email is required'),
    password: z.string().min(1, 'Password is required'),
  }),
});


export const passwordResetRequestSchema = z.object({
  body: z.object({
    email: z.string().email('A valid email is required'),
  }),
});


export const passwordResetSchema = z.object({
  body: z.object({
    email: z.string().email('A valid email is required'),
    token: z.string().min(1, 'Token is required'),
    newPassword: z.string().min(8, 'Password must be at least 8 characters'),
  }),
});