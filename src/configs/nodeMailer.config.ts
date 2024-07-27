import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter'
import { ConfigService } from '@nestjs/config'

export const config = async (configService: ConfigService) => ({
  transport: {
    service: 'gmail',
    host: configService.get('MAIL_HOST'),
    port: configService.get('MAIL_PORT'),
    secure: false,
    auth: {
      user: configService.get('MAIL_USER'),
      pass: configService.get('MAIL_PASSWORD')
    },
    tls: {
      rejectUnauthorized: false
    }
  },
  defaults: {
    from: {
      name: configService.get('MAIL_FROM_NAME'),
      address: configService.get('MAIL_USER')
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
