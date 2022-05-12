import { Module } from '@nestjs/common'
import { AuthModule } from '../auth'
import { EnvModule } from '../env'
import { PrismaModule } from '../prisma'
import { UserModule } from '../user'
import { AppController } from './app.controller'

@Module({
  imports: [EnvModule, PrismaModule, AuthModule, UserModule],
  controllers: [AppController],
})
export class AppModule {}
