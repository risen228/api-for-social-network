import { createZodDto } from 'nestjs-zod'
import { z } from 'nestjs-zod/z'
import { UserModel } from '@app/zod-generated'
import { customRefine } from '../zod'

export const SignInBodySchema = z.object({
  email: z.string().email(),
  password: z.string().superRefine(customRefine.password()),
})

export const SignUpBodySchema = SignInBodySchema.extend({
  firstName: z.string().min(2).max(32),
  lastName: z.string().min(2).max(32),
  birthDay: z.number().min(1).max(31),
  birthMonth: z.number().min(1).max(12),
  birthYear: z.number().superRefine(customRefine.birthYear()),
})

export const LoggedInResponseSchema = z.object({
  accessToken: z.string(),
  user: UserModel,
})

export class SignInBodyDto extends createZodDto(SignInBodySchema) {}
export class SignUpBodyDto extends createZodDto(SignUpBodySchema) {}
export class LoggedInResponseDto extends createZodDto(LoggedInResponseSchema) {}

export type SignInBody = z.TypeOf<typeof SignInBodySchema>
export type SignUpBody = z.TypeOf<typeof SignUpBodySchema>
