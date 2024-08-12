import { ApiProperty } from '@nestjs/swagger'
import { CommentBaseDTO } from './commentBase.dto'

export class CreateCommentDTO extends CommentBaseDTO {
  @ApiProperty()
  parentId?: string
}
