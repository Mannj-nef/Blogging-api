import { Body, Controller, Post } from '@nestjs/common'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'
import { MESSAGE } from 'src/shared/constants/message'
import { LoginDTO, LogoutDTO, RegisterDTO } from './dto'
import { AuthService } from './auth.service'

@ApiBearerAuth()
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
