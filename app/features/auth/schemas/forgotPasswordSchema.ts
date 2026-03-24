import { z } from 'zod'

export const forgotPasswordSchema = z.object({
  email: z
    .string()
    .min(1, 'validation.email.required')
    .email('validation.email.invalid'),
})

export type ForgotPasswordSchema = z.infer<typeof forgotPasswordSchema>
