import { ApiProperty } from '@nestjs/swagger'
import { IsEmail } from 'class-validator'

export class ForgotPasswordDTO {
  @ApiProperty({ example: 'E0VzA@example.com' })
  @IsEmail()
  email: string
}
