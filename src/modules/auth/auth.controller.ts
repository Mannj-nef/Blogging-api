import { Body, Controller, Post } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { MESSAGE } from 'src/shared/constants/message'
import { LoginDTO, LogoutDTO, RegisterDTO } from './dto'
import { AuthService } from './auth.service'

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  login(@Body() { email, password }: LoginDTO) {
    console.log(email, password)

    return {
      message: MESSAGE.COMMON.SUCCESS('login'),
      token: 'token'
    }
  }

  @Post('register')
  register(@Body() {}: RegisterDTO) {
    return {
      message: MESSAGE.COMMON.SUCCESS('register'),
      token: 'token'
    }
  }

  @Post('logout')
  logout(@Body() {}: LogoutDTO) {
    return {
      message: MESSAGE.COMMON.SUCCESS('logout')
    }
  }

  @Post('refresh-token')
  refreshToken() {
    return {
      message: MESSAGE.COMMON.SUCCESS('refresh-token'),
      token: 'token'
    }
  }

  @Post('forgot-password')
  forgotPassword() {
    return this.authService.forgotPassword('manhquan@yopmail.com')
  }

  @Post('reset-password')
  resetPassword() {
    return {
      message: MESSAGE.COMMON.SUCCESS('reset-password'),
      token: 'token'
    }
  }
}
