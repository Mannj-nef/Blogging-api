import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsNotEmpty, MaxLength, MinLength } from 'class-validator'

export class RegisterDTO {
  @ApiProperty({ example: 'E0VzA@example.com' })
  @IsEmail()
  email: string

  @ApiProperty()
  @IsNotEmpty()
  @MinLength(6)
  @MaxLength(20)
  password: string

  @ApiProperty()
  @IsNotEmpty()
  confirmPassword: string

  @ApiProperty()
  userName: string
}
