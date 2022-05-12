import { Controller, Post, UseGuards } from '@nestjs/common'
import { User } from '@prisma/client'
import { CurrentUser, UserService } from '../user'
import { ZodBody, ZodGuardBody } from '../zod'
import {
  SignInBodySchema,
  SignUpBody,
  SignUpBodySchema,
} from './auth.contracts'
import { UserAlreadyExistsException } from './auth.exceptions'
import { AuthService } from './auth.service'
import { LocalAuthGuard } from './local-auth.guard'
import { Public } from './public.decorator'

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UserService
  ) {}

  @Public()
  @UseGuards(LocalAuthGuard)
  // validate body before running the local strategy
  @ZodGuardBody(SignInBodySchema)
  @Post('/sign-in')
  async signIn(@CurrentUser() user: User) {
    const accessToken = await this.authService.generateAccessToken(user)
    return { accessToken }
  }

  @Public()
  @Post('/sign-up')
  async signUp(@ZodBody(SignUpBodySchema) signUpBody: SignUpBody) {
    const {
      email,
      password,
      firstName,
      lastName,
      birthDay,
      birthMonth,
      birthYear,
    } = signUpBody

    const passwordHash = await this.authService.hashPassword(password)

    let user: User

    try {
      user = await this.userService.create({
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
    } catch (error) {
      throw new UserAlreadyExistsException()
    }

    const accessToken = await this.authService.generateAccessToken(user)
    return { user, accessToken }
  }
}
