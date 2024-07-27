import { Injectable } from '@nestjs/common'
import { generateRandomNumber as randomOTP } from 'src/utils/generateRandom'
import { EmailService } from 'src/modules/email/email.service'
import { MESSAGE, MESSAGE_NAME } from 'src/shared/constants/message'
import { LoginDTO, RegisterDTO } from './dto'
import { Repository } from 'typeorm'
import { UserEntity } from 'src/entities/typeorm'
import { InjectRepository } from '@nestjs/typeorm'
import { ExitsException } from 'src/shared/exceptions/exists.exception'
import * as bcrypt from 'bcrypt'

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private mailerService: EmailService
  ) {}

  hashData(data: string) {
    return bcrypt.hashSync(data, 10)
  }

  async signUp(user: RegisterDTO) {
    const userExists = await this.userRepository.findOneBy({ email: user.email })

    if (userExists) {
      throw new ExitsException(MESSAGE_NAME.USER)
    }

    const hashPassword = this.hashData(user.password)

    await this.userRepository.save({
      ...user,
      password: hashPassword
    })

    return {
      message: MESSAGE.COMMON.SUCCESS('register'),
      token: 'token'
    }
  }

  async signIn({ email, password }: LoginDTO) {
    console.log(email, password)

    return {
      message: MESSAGE.COMMON.SUCCESS('login'),
      token: 'token'
    }
  }

  async forgotPassword(email: string) {
    console.log(email)

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
