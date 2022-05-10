import { Global, Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { EnvService } from './env.service'
import { validate } from './env.validation'

@Global()
@Module({
  imports: [ConfigModule.forRoot({ validate })],
  providers: [EnvService],
  exports: [EnvService],
})
export class EnvModule {}
