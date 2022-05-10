import { Controller, Post, Request, UseGuards } from '@nestjs/common'
import { AuthService } from './auth.service'
import { LocalAuthGuard } from './local-auth.guard'

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('/sign-in')
  async signIn(@Request() request) {
    const accessToken = await this.authService.generateAccessToken(request.user)
    return { accessToken }
  }
}
