import * as bcrypt from 'bcrypt'
import { ConfigService } from '@nestjs/config'
import { EmailService } from 'src/modules/email/email.service'
import { ExitsException } from 'src/exceptions/exists.exception'
import { generateRandomNumber as randomOTP } from 'src/utils/generate-random'
import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { JwtService } from '@nestjs/jwt'
import { LoginDTO, RegisterDTO, RefreshTokenDTO, ResetPasswordDTO } from './dto'
import { MESSAGE, MESSAGE_NAME } from 'src/constants/message'
import { NotFoundException } from 'src/exceptions/not-found.exception'
import { Repository } from 'typeorm'
import { UserEntity } from 'src/entities/typeorm'
import { v4 as uuidv4 } from 'uuid'

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private mailerService: EmailService,
    private jwtService: JwtService,
    private configService: ConfigService
  ) {}

  private hashData(data: string) {
    return bcrypt.hashSync(data, 10)
  }

  private async generateToken(payload: { userId: string; userName: string }) {
    const accessToken = await this.jwtService.signAsync(payload, {
      expiresIn: this.configService.getOrThrow('JWT_EXPIRES_ACCESS_IN'),
      secret: this.configService.getOrThrow('JWT_SECRET_ACCESS_KEY')
    })

    const refreshToken = await this.jwtService.signAsync(payload, {
      expiresIn: this.configService.getOrThrow('JWT_EXPIRES_REFRESH_IN'),
      secret: this.configService.getOrThrow('JWT_SECRET_REFRESH_KEY')
    })

    return { accessToken, refreshToken }
  }

  private async updateRefreshToken(userId: string, refreshToken: string | null) {
    let hashedRefreshToken = refreshToken

    if (!!refreshToken) {
      hashedRefreshToken = this.hashData(refreshToken)
    }

    await this.userRepository.update(userId, {
      refreshToken: hashedRefreshToken
    })
  }

  async signUp(user: RegisterDTO) {
    const userExists = await this.userRepository.findOneBy({ email: user.email })

    if (userExists) {
      throw new ExitsException(MESSAGE_NAME.USER)
    }

    const userId = uuidv4()

    const hashPassword = this.hashData(user.password)

    const [, token] = await Promise.all([
      this.userRepository.insert({
        ...user,
        id: userId,
        password: hashPassword
      }),

      this.generateToken({ userId, userName: user.userName })
    ])

    await this.updateRefreshToken(userId, token.refreshToken)

    return {
      message: MESSAGE.COMMON.SUCCESS('register'),
      token: token
    }
  }

  async signIn({ email, password }: LoginDTO) {
    const user = await this.userRepository.findOneBy({ email })

    if (!user) {
      throw new NotFoundException(MESSAGE_NAME.USER)
    }

    const comparePassword = bcrypt.compareSync(password, user.password)

    if (!comparePassword) {
      throw new HttpException(MESSAGE.AUTH.WRONG_PASSWORD, HttpStatus.UNAUTHORIZED)
    }

    const token = await this.generateToken({ userId: user.id, userName: user.userName })

    await this.updateRefreshToken(user.id, token.refreshToken)

    return {
      message: MESSAGE.COMMON.SUCCESS('login'),
      token
    }
  }

  async forgotPassword(email: string) {
    const user = await this.userRepository.findOneBy({ email })

    if (!user) {
      throw new NotFoundException(MESSAGE_NAME.USER)
    }

    const OTP_reset = `${randomOTP()}`

    await Promise.all([
      this.mailerService.sendResetPassword({
        recipients: [{ name: user.userName, address: user.email }],
        context: { OTP_reset }
      }),

      this.userRepository.update(user.id, {
        forgotPasswordOtp: this.hashData(OTP_reset)
      })
    ])

    return {
      message: `${MESSAGE.COMMON.SUCCESS('forgot-password')}, ${MESSAGE.AUTH.PLEASE_CHECK_EMAIL}`
    }
  }

  async logout(refreshToken: string) {
    try {
      const payload = await this.jwtService.verifyAsync(refreshToken, {
        secret: this.configService.getOrThrow('JWT_SECRET_REFRESH_KEY')
      })

      const user = await this.userRepository.findOneBy({ id: payload.userId })
      await this.updateRefreshToken(user.id, null)

      return {
        message: MESSAGE.COMMON.SUCCESS('logout')
      }
    } catch (error) {
      throw new UnauthorizedException()
    }
  }

  async refreshToken({ refreshToken }: RefreshTokenDTO) {
    try {
      const decodeToken = await this.jwtService.verifyAsync(refreshToken, {
        secret: this.configService.getOrThrow('JWT_SECRET_REFRESH_KEY')
      })

      const user = await this.userRepository.findOneBy({
        id: decodeToken.userId
      })

      const isCompare = bcrypt.compareSync(refreshToken, user.refreshToken)

      if (!isCompare) {
        throw new UnauthorizedException()
      }

      const token = await this.generateToken({ userId: user.id, userName: user.userName })

      await this.updateRefreshToken(user.id, token.refreshToken)

      return {
        token: token,
        message: MESSAGE.COMMON.SUCCESS('refresh token')
      }
    } catch (error) {
      throw new UnauthorizedException()
    }
  }

  async resetPassword(payload: ResetPasswordDTO) {
    if (payload.password !== payload.confirmPassword) {
      throw new HttpException(MESSAGE.AUTH.PASSWORD_NOT_MATCH, HttpStatus.BAD_REQUEST)
    }

    const user = await this.userRepository.findOneBy({ email: payload.email })

    if (!user) {
      throw new NotFoundException(MESSAGE_NAME.USER)
    }

    const compareOtp = bcrypt.compareSync(payload.otp, user.forgotPasswordOtp)

    if (!compareOtp) {
      throw new HttpException(MESSAGE.AUTH.WRONG_OTP, HttpStatus.UNAUTHORIZED)
    }

    const hashPassword = this.hashData(payload.password)

    const [, token] = await Promise.all([
      this.userRepository.update(user.id, {
        password: hashPassword,
        forgotPasswordOtp: null
      }),

      this.generateToken({ userId: user.id, userName: user.userName })
    ])

    return {
      message: MESSAGE.COMMON.SUCCESS('reset password'),
      token
    }
  }
}
