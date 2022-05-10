import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { Env } from './types'

@Injectable()
export class EnvService {
  constructor(private configService: ConfigService<Env, true>) {}

  get database() {
    return this.configService.get('database', { infer: true })
  }

  get jwt() {
    return this.configService.get('jwt', { infer: true })
  }
}
