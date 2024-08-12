import { ApiProperty } from '@nestjs/swagger'
import { IsString } from 'class-validator'

export class CommentBaseDTO {
  @ApiProperty()
  @IsString()
  postId: string

  @ApiProperty()
  @IsString()
  content: string
}
