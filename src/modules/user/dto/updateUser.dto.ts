import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsNotEmpty, IsNumber } from 'class-validator'

export class UpdateUserDTO {
  @ApiProperty({ example: 'E0VzA@example.com' })
  @IsEmail()
  email: string

  @ApiProperty()
  firstName: string

  @ApiProperty()
  lastName: string

  @ApiProperty()
  @IsNotEmpty()
  userName: string

  @ApiProperty({ example: 1234567890 })
  @IsNumber()
  phoneNumber: number

  @ApiProperty({ example: '2022-01-01' })
  dateOfBirth: Date

  @ApiProperty()
  city: string

  @ApiProperty()
  biography: string
}
