import { Module } from '@nestjs/common'
import { APP_PIPE } from '@nestjs/core'
import { ZodValidationPipe } from 'nestjs-zod'
import { AuthModule } from '../auth'
import { EnvModule } from '../env'
import { PrismaModule } from '../prisma'
import { UserModule } from '../user'
import { AppController } from './app.controller'

@Module({
  imports: [EnvModule, PrismaModule, AuthModule, UserModule],
  providers: [{ provide: APP_PIPE, useClass: ZodValidationPipe }],
  controllers: [AppController],
})
export class AppModule {}
