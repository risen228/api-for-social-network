import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common'
import { ZodSchema } from 'zod'
import { ZodBodyGuard, ZOD_BODY_SCHEMA_KEY } from './zod-body.guard'

export function ZodGuardBody(schema: ZodSchema) {
  return applyDecorators(
    SetMetadata(ZOD_BODY_SCHEMA_KEY, schema),
    UseGuards(ZodBodyGuard)
  )
}
