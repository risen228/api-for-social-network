import { HttpException } from '@nestjs/common'

interface Extend {
  code: string
  message: string
}

export type ExtendedException = new () => HttpException

export function extendException(
  factory: new (message: string) => HttpException,
  extend: Extend
): ExtendedException {
  return class ExtendedException extends factory {
    code: string

    constructor() {
      super(extend.message)
      this.code = extend.code
    }
  }
}
