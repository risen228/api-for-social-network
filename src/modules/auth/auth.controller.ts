import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common'
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger'
import { User } from '@prisma/client'
import { UseZodGuard } from 'nestjs-zod'
import { CurrentUser, UserService } from '../user'
import {
  SignInBodySchema,
  SignInBodyDto,
  SignUpBodyDto,
  LoggedInResponseDto,
} from './auth.contracts'
import { UserAlreadyExistsException } from './auth.exceptions'
import { AuthService } from './auth.service'
import { LocalAuthGuard } from './local-auth.guard'
import { Public } from './public.decorator'

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UserService
  ) {}

  @Public()
  @UseGuards(LocalAuthGuard)
  // validate body before running the local strategy
  @UseZodGuard('body', SignInBodySchema)
  @ApiOkResponse({ type: LoggedInResponseDto })
  @Post('/sign-in')
  async signIn(@CurrentUser() user: User, @Body() _signInBody: SignInBodyDto) {
    const accessToken = await this.authService.generateAccessToken(user)
    return { user, accessToken }
  }

  @Public()
  @ApiCreatedResponse({ type: LoggedInResponseDto })
  @HttpCode(HttpStatus.CREATED)
  @Post('/sign-up')
  async signUp(@Body() signUpBody: SignUpBodyDto) {
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
