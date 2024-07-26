import { ApiProperty } from '@nestjs/swagger'
import { IsString } from 'class-validator'

export class LogoutDTO {
  @ApiProperty({ example: 'token' })
  @IsString()
  token: string
}
