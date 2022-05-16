import { INestApplication } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'
import { patchNestJsSwagger } from 'nestjs-zod'
import { AppModule } from '@app/modules/app'

function setupSwagger(app: INestApplication) {
  patchNestJsSwagger()

  const config = new DocumentBuilder()
    .setTitle('API For Social Network')
    .setDescription('A best choice for your pet-project')
    .setVersion('0.0.1')
    .build()

  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('api', app, document)
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  setupSwagger(app)

  await app.listen(5050)
}

bootstrap()
