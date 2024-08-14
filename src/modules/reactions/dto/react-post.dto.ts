import { ApiProperty } from '@nestjs/swagger'
import { IsEnum, IsNotEmpty, IsUUID } from 'class-validator'
import { REACTION_TYPE } from 'src/constants/enum'

export class ReactPostDTO {
  @ApiProperty()
  @IsNotEmpty()
  @IsUUID()
  postId: string

  @ApiProperty()
  @IsNotEmpty()
  @IsEnum(REACTION_TYPE)
  reaction: REACTION_TYPE
}
