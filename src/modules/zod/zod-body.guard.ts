import {
  ExecutionContext,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { ZodError, ZodSchema } from 'zod'
import { ValidationException } from './zod.exceptions'

export const ZOD_BODY_SCHEMA_KEY = 'zod-body-schema'

@Injectable()
export class ZodBodyGuard {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext) {
    const schema = this.reflector.get<ZodSchema>(
      ZOD_BODY_SCHEMA_KEY,
      context.getHandler()
    )

    const { body } = context.switchToHttp().getRequest()

    try {
      schema.parse(body)
    } catch (error) {
      const isZodError = error instanceof ZodError

      if (!isZodError) {
        throw new InternalServerErrorException('Cannot validate value')
      }

      throw new ValidationException(error.errors)
    }

    return true
  }
}
