import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { User } from '@prisma/client'
import * as bcrypt from 'bcrypt'
import { JwtPayload } from './types'

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  private readonly HASH_ROUNDS = 10

  async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, this.HASH_ROUNDS)
  }

  async validateUser(password: string, hash: string): Promise<boolean> {
    return bcrypt.compare(password, hash)
  }

  async generateAccessToken(user: User): Promise<string> {
    const payload: JwtPayload = { userId: user.id, sub: user.id }
    return this.jwtService.signAsync(payload)
  }
}
