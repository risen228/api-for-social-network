import { Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { User } from '@prisma/client'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { EnvService } from '../env'
import { UserService } from '../user'
import { CurrentUserNotExistException } from './auth.exceptions'
import { JwtPayload } from './types'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private env: EnvService, private userService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: env.jwt.secret,
    })
  }

  async validate(payload: JwtPayload): Promise<User> {
    const user = await this.userService.findOne({ id: payload.userId })

    if (!user) {
      throw new CurrentUserNotExistException()
    }

    return user
  }
}
