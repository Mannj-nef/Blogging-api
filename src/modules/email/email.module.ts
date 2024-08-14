import { Module } from '@nestjs/common'
import { EmailController } from './email.controller'
import { EmailService } from './email.service'
import { MailerModule } from '@nestjs-modules/mailer'
import { ConfigService } from '@nestjs/config'
import { config } from 'src/configs/node-mailer.config'

@Module({
  imports: [
    MailerModule.forRootAsync({
      useFactory: config,
      inject: [ConfigService]
    })
  ],
  controllers: [EmailController],
  providers: [EmailService]
})
export class EmailModule {}
