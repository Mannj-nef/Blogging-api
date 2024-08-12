import { ApiProperty } from '@nestjs/swagger'
import { IsUUID } from 'class-validator'

export class UnReactPostDTO {
  @ApiProperty()
  @IsUUID()
  postId: string
}
