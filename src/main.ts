import { NestFactory } from '@nestjs/core'
import { AppModule } from '@app/modules/app'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  await app.listen(5050)
}

bootstrap()
