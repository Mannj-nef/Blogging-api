import { Module } from '@nestjs/common'
import { EmailController } from './email.controller'
import { EmailService } from './email.service'
import { MailerModule } from '@nestjs-modules/mailer'
// import { join } from 'path'
import { ConfigService } from '@nestjs/config'
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter'

@Module({
  imports: [
    MailerModule.forRootAsync({
      useFactory: async (configService: ConfigService) => ({
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
      }),
      inject: [ConfigService]
    })
  ],
  controllers: [EmailController],
  providers: [EmailService]
})
export class EmailModule {}
