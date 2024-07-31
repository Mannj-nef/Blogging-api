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
  signIn(@Body() user: LoginDTO) {
    return this.authService.signIn(user)
  }

  @Post('register')
  register(@Body() user: RegisterDTO) {
    return this.authService.signUp(user)
  }

  @Post('logout')
  logOut(@Body() {}: LogoutDTO) {
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
  forgotPassword(@Body() { email }: { email: string }) {
    return this.authService.forgotPassword(email)
  }

  @Post('reset-password')
  resetPassword() {
    return {
      message: MESSAGE.COMMON.SUCCESS('reset-password'),
      token: 'token'
    }
  }
}
