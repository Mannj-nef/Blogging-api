import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsNotEmpty } from 'class-validator'

export class LoginDTO {
  @ApiProperty({ example: 'E0VzA@example.com' })
  @IsEmail()
  email: string

  @ApiProperty()
  @IsNotEmpty()
  password: string
}
