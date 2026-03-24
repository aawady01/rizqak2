import { z } from 'zod'

export const registerSchema = z
  .object({
    name: z
      .string()
      .min(1, 'validation.name.required')
      .min(2, 'validation.name.min'),
    email: z
      .string()
      .min(1, 'validation.email.required')
      .email('validation.email.invalid'),
    password: z
      .string()
      .min(1, 'validation.password.required')
      .min(6, 'validation.password.min'),
    confirmPassword: z
      .string()
      .min(1, 'validation.confirmPassword.required'),
    role: z.enum(['jobseeker', 'employer']),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'validation.confirmPassword.mismatch',
    path: ['confirmPassword'],
  })
  .refine((data) => ['jobseeker', 'employer'].includes(data.role), {
    message: 'validation.role.required',
    path: ['role'],
  })

export type RegisterSchema = z.infer<typeof registerSchema>
