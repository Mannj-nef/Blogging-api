import { ApiProperty } from '@nestjs/swagger'
import { IsOptional } from 'class-validator'
import { CATEGORY } from 'src/shared/constants/enum'

export class GetPostDTO {
  @ApiProperty()
  @IsOptional()
  title?: string

  @ApiProperty()
  @IsOptional()
  trending?: boolean

  @ApiProperty()
  @IsOptional()
  category?: CATEGORY

  @ApiProperty()
  @IsOptional()
  isLatest?: boolean

  @ApiProperty()
  page: number

  @ApiProperty()
  limit: number
}
