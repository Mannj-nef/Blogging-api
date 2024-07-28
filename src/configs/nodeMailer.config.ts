import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter'
import { ConfigService } from '@nestjs/config'

export const config = async (configService: ConfigService) => ({
  transport: {
    service: 'gmail',
    host: configService.getOrThrow('MAIL_HOST'),
    port: configService.getOrThrow('MAIL_PORT'),
    secure: false,
    auth: {
      user: configService.getOrThrow('MAIL_USER'),
      pass: configService.getOrThrow('MAIL_PASSWORD')
    },
    tls: {
      rejectUnauthorized: false
    }
  },
  defaults: {
    from: {
      name: configService.getOrThrow('MAIL_FROM_NAME'),
      address: configService.getOrThrow('MAIL_USER')
    }
  },
  template: {
    dir: 'src/templates',
    adapter: new HandlebarsAdapter(),
    options: {
      strict: true
    }
  }
})
