import { Body, Controller, Post } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { LoginDTO, LogoutDTO, RegisterDTO, RefreshTokenDTO, ForgotPasswordDTO, ResetPasswordDTO } from './dto'
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
  logOut(@Body() { refreshToken }: LogoutDTO) {
    return this.authService.logout(refreshToken)
  }

  @Post('refresh-token')
  refreshToken(@Body() { refreshToken }: RefreshTokenDTO) {
    return this.authService.refreshToken({ refreshToken })
  }

  @Post('forgot-password')
  forgotPassword(@Body() { email }: ForgotPasswordDTO) {
    return this.authService.forgotPassword(email)
  }

  @Post('reset-password')
  resetPassword(@Body() payload: ResetPasswordDTO) {
    return this.authService.resetPassword(payload)
  }
}
