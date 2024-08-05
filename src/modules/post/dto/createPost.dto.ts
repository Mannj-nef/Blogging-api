import { ApiProperty } from '@nestjs/swagger'
import { IsEnum, IsNotEmpty, IsString } from 'class-validator'
import { CATEGORY, POST_STATUS } from 'src/shared/constants/enum'

export class CreatePostDTO {
  @ApiProperty({ example: 'post title' })
  @IsNotEmpty()
  title: string

  @ApiProperty({ example: 'post-title' })
  @IsNotEmpty()
  slug: string

  @ApiProperty({ example: CATEGORY.FE })
  @IsNotEmpty()
  @IsEnum(CATEGORY)
  category: CATEGORY

  @ApiProperty({ example: 'url image thumbnail' })
  @IsString()
  imageThumbnail: string

  @ApiProperty({ example: '<h2>Tile</h2> <p>hello world</p>' })
  @IsNotEmpty()
  @IsString()
  content: string

  @ApiProperty({ example: POST_STATUS.PUBLIC })
  @IsNotEmpty()
  @IsEnum(POST_STATUS)
  status: POST_STATUS
}
