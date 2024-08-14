import { Controller, Get } from '@nestjs/common'
import { AppService } from './app.service'

const env = process.env.NODE_ENV
const envFilename = `.env.${env}`

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    console.log('envFilename', envFilename)

    return this.appService.getHello()
  }
}
