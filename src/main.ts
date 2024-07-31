import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { ENV } from './shared/constants/env'
import { ValidationPipe } from '@nestjs/common'
import { SwaggerModule } from '@nestjs/swagger'
import { config as configSwagger } from './configs/swagger.config'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.enableCors()
  app.setGlobalPrefix(ENV.PREFIX)
  app.useGlobalPipes(new ValidationPipe())

  console.log({ ENV })

  const document = SwaggerModule.createDocument(app, configSwagger)
  SwaggerModule.setup(`${ENV.PREFIX}/docs`, app, document)

  await app.listen(ENV.PORT)

  console.log(
    '\x1b[36m',
    `\nServer listening on: http://localhost:${ENV.PORT}/${ENV.PREFIX}\nAPI docs: http://localhost:${ENV.PORT}/${ENV.PREFIX}/docs`
  )
}
bootstrap()
