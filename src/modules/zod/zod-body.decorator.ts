import { Body } from '@nestjs/common'
import { ZodSchema } from 'zod'
import { ZodValidationPipe } from './zod-validation.pipe'

export const ZodBody = (schema: ZodSchema) =>
  Body(new ZodValidationPipe(schema))
