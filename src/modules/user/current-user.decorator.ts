import { createParamDecorator, ExecutionContext } from '@nestjs/common'

export const CurrentUser = createParamDecorator(
  (_, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest()
    return request.user
  }
)
