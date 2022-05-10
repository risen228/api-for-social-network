import { Module } from '@nestjs/common'
import { EnvModule } from '../env'
import { UserController } from '../user'
import { AppController } from './app.controller'
import { AppService } from './app.service'

@Module({
  imports: [EnvModule],
  controllers: [AppController, UserController],
  providers: [AppService],
})
export class AppModule {}
