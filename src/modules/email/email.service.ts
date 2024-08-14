import { MailerService } from '@nestjs-modules/mailer'
import { Injectable } from '@nestjs/common'
import { EmailDTO } from './dto'

@Injectable()
export class EmailService {
  constructor(private readonly mailerService: MailerService) {}

  async sendResetPassword(email: EmailDTO) {
    try {
      await this.mailerService.sendMail({
        to: email.recipients,
        subject: 'Reset password code',
        template: './resetPassword.hbs',
        context: {
          name: email.recipients[0].name,
          email: email.recipients[0].address,
          link: 'google.com',
          otp: email.context.OTP_reset
        }
      })
    } catch (error) {
      // throw new SendEmailFailedException()
      throw new Error(error)
    }
  }
}
