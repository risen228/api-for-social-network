import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { Env } from './types'

@Injectable()
export class EnvService {
  constructor(private configService: ConfigService<Env, true>) {}

  private field<T extends keyof Env>(name: T) {
    return this.configService.get(name, { infer: true })
  }

  get isDev() {
    return this.field('isDev')
  }

  get isProd() {
    return this.field('isProd')
  }

  get isTest() {
    return this.field('isTest')
  }

  get database() {
    return this.field('database')
  }

  get jwt() {
    return this.field('jwt')
  }
}
