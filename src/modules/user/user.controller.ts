import { Controller, Get } from '@nestjs/common'
import { User } from '@prisma/client'
import { CurrentUser } from './current-user.decorator'

@Controller('users')
export class UserController {
  @Get('/me')
  async findOne(@CurrentUser() user: User) {
    return user
  }
}
