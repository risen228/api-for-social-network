import {
  PipeTransform,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common'
import { ZodSchema, ZodError } from 'zod'
import { ValidationException } from './zod.exceptions'

@Injectable()
export class ZodValidationPipe implements PipeTransform {
  constructor(private schema: ZodSchema) {}

  transform(value: unknown) {
    try {
      return this.schema.parse(value)
    } catch (error) {
      const isZodError = error instanceof ZodError

      if (!isZodError) {
        throw new InternalServerErrorException('Cannot validate value')
      }

      throw new ValidationException(error.errors)
    }
  }
}
