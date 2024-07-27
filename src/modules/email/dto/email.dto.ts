import { ApiProperty } from '@nestjs/swagger'
import { Address } from 'nodemailer/lib/mailer'

export class EmailDTO {
  @ApiProperty()
  from?: string | Address

  @ApiProperty()
  recipients: Address

  @ApiProperty()
  context?: {
    [key: string]: any
  }
}
