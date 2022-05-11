import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common'
import { UserService } from '../user'
import { AuthService } from './auth.service'
import { JwtAuthGuard } from './jwt-auth.guard'
import { LocalAuthGuard } from './local-auth.guard'
import { Public } from './public.decorator'

class SignUpDto {
  email: string
  password: string
  firstName: string
  lastName: string
  birthDay: number
  birthMonth: number
  birthYear: number
}

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UserService
  ) {}

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('/sign-in')
  async signIn(@Request() request) {
    const accessToken = await this.authService.generateAccessToken(request.user)
    return { accessToken }
  }

  @Public()
  @Post('/sign-up')
  async signUp(@Body() signUpDto: SignUpDto) {
    const {
      email,
      password,
      firstName,
      lastName,
      birthDay,
      birthMonth,
      birthYear,
    } = signUpDto

    const passwordHash = await this.authService.hashPassword(password)

    const user = await this.userService.create({
      email,
      passwordHash,
      profile: {
        create: {
          firstName,
          lastName,
          birthDay,
          birthMonth,
          birthYear,
        },
      },
    })

    return user
  }

  @UseGuards(JwtAuthGuard)
  @Get('/meow')
  async meow() {
    return 'Meow!'
  }
}
