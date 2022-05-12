import { Controller, Get } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { User } from '@prisma/client'
import { CurrentUser } from './current-user.decorator'

@ApiTags('Users')
@Controller('users')
export class UserController {
  @Get('/me')
  async findOne(@CurrentUser() user: User) {
    return user
  }
}
