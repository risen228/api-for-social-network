import { z } from 'zod'
import { customRefine } from '../zod'

const CredentialsSchema = z.object({
  email: z.string().email(),
  password: z.string().superRefine(customRefine.password()),
})

const SignUpProfileInfo = z.object({
  firstName: z.string().min(2).max(32),
  lastName: z.string().min(2).max(32),
  birthDay: z.number().min(1).max(31),
  birthMonth: z.number().min(1).max(12),
  birthYear: z.number().superRefine(customRefine.birthYear()),
})

export const SignInBodySchema = CredentialsSchema

export type SignInBody = z.TypeOf<typeof SignInBodySchema>

export const SignUpBodySchema = z.intersection(
  CredentialsSchema,
  SignUpProfileInfo
)

export type SignUpBody = z.TypeOf<typeof SignUpBodySchema>
