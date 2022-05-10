import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { User } from '@prisma/client'
import * as bcrypt from 'bcrypt'
import { UserService } from '../user'
import { JwtPayload } from './types'

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService
  ) {}

  private readonly HASH_ROUNDS = 10

  async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, this.HASH_ROUNDS)
  }

  async validateUser(email: string, password: string): Promise<User | null> {
    const user = await this.userService.findOne({ email })
    if (!user) return null
    const match = await bcrypt.compare(password, user.passwordHash)
    if (!match) return null
    return user
  }

  async generateAccessToken(user: User): Promise<string> {
    const payload: JwtPayload = { userId: user.id, sub: user.id }
    return this.jwtService.signAsync(payload)
  }
}
