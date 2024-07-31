import { ApiProperty } from '@nestjs/swagger'
import { IsDate, IsEmail, IsNotEmpty, IsNumber } from 'class-validator'

export class UpdateUserDTO {
  @ApiProperty({ example: 'E0VzA@example.com' })
  @IsEmail()
  email: string

  @ApiProperty()
  @IsNotEmpty()
  firstName: string

  @ApiProperty()
  @IsNotEmpty()
  lastName: string

  @ApiProperty()
  @IsNotEmpty()
  userName: string

  @ApiProperty({ example: 1234567890 })
  @IsNotEmpty()
  @IsNumber()
  phoneNumber: number

  @ApiProperty({ example: '2022-01-01' })
  @IsNotEmpty()
  @IsDate()
  dateOfBirth: Date

  @ApiProperty()
  @IsNotEmpty()
  city: string

  @ApiProperty()
  @IsNotEmpty()
  biography: string
}
