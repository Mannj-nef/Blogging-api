import { ApiProperty } from '@nestjs/swagger'

export class GetPostDTO {
  @ApiProperty()
  title = ''

  @ApiProperty({ example: true })
  trending?: boolean
  @ApiProperty({ example: true })
  isLatest?: boolean

  @ApiProperty()
  category: string

  @ApiProperty()
  limit: number

  @ApiProperty()
  page = 1
}
