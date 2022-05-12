import { Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { User } from '@prisma/client'
import { Strategy } from 'passport-local'
import { UserService } from '../user'
import { WrongCredentialsException } from './auth.exceptions'
import { AuthService } from './auth.service'

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(
    private userService: UserService,
    private authService: AuthService
  ) {
    super({ usernameField: 'email' })
  }

  async validate(email: string, password: string): Promise<User> {
    const user = await this.userService.findOne({ email })

    if (!user) {
      throw new WrongCredentialsException()
    }

    const match = await this.authService.validateUser(
      password,
      user.passwordHash
    )

    if (!match) {
      throw new WrongCredentialsException()
    }

    return user
  }
}
