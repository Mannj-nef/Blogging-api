import { ApiProperty } from '@nestjs/swagger'
import { IsString } from 'class-validator'

export class GetCommentDTO {
  @ApiProperty()
  @IsString()
  postId: string

  @ApiProperty()
  @IsString()
  page: number

  @ApiProperty()
  @IsString()
  limit: number
}
