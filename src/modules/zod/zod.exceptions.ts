import { BadRequestException, HttpStatus } from '@nestjs/common'
import { ZodIssue } from 'zod'

export class ValidationException extends BadRequestException {
  constructor(errors: ZodIssue[]) {
    super({
      statusCode: HttpStatus.BAD_REQUEST,
      message: 'Validation failed',
      errors,
    })
  }
}
