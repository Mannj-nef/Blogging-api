import { Injectable } from '@nestjs/common'
import { generateRandomNumber as randomOTP } from 'src/utils/generateRandom'
import { EmailService } from 'src/modules/email/email.service'
import { MESSAGE } from 'src/shared/constants/message'

@Injectable()
export class AuthService {
  constructor(private mailerService: EmailService) {}
  async forgotPassword(email: string) {
    console.log({ email })

    const user = { name: 'quan', email: 'manhquan.05012002@gmail.com' }

    const OTP_reset = randomOTP()

    Promise.all([
      await this.mailerService.sendResetPassword({
        recipients: [{ name: user.name, address: user.email }],
        context: { OTP_reset }
      })
    ])

    return {
      message: MESSAGE.COMMON.SUCCESS('forgot-password')
    }
  }
}
