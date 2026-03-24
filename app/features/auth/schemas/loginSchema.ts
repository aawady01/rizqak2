import { z } from 'zod'

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, 'validation.email.required')
    .email('validation.email.invalid'),
  password: z
    .string()
    .min(1, 'validation.password.required')
    .min(6, 'validation.password.min'),
})

export type LoginSchema = z.infer<typeof loginSchema>
