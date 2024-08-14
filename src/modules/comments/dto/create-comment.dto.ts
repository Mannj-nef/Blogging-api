import { ApiProperty } from '@nestjs/swagger'
import { CommentBaseDTO } from './comment-base.dto'

export class CreateCommentDTO extends CommentBaseDTO {
  @ApiProperty()
  parentId?: string
}
