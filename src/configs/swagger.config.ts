import { DocumentBuilder } from '@nestjs/swagger'

export const config = new DocumentBuilder()
  .setTitle('Blogging API docs')
  .setDescription('The blogging API description')
  .setVersion('1.0')
  .addTag('blogging')
  .addBearerAuth()
  .build()
