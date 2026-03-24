import { z } from 'zod'

export const resetPasswordSchema = z
  .object({
    password: z
      .string()
      .min(1, 'validation.password.required')
      .min(6, 'validation.password.min'),
    confirmPassword: z
      .string()
      .min(1, 'validation.confirmPassword.required'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'validation.confirmPassword.mismatch',
    path: ['confirmPassword'],
  })

export type ResetPasswordSchema = z.infer<typeof resetPasswordSchema>
