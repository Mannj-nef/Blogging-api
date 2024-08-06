import { Body, Controller, Param, Patch, Post, Request, UseGuards } from '@nestjs/common'
import { CreatePostDTO } from './dto/createPost.dto'
import { ApiBearerAuth, ApiParam, ApiTags } from '@nestjs/swagger'
import { AuthGuard } from 'src/shared/guards/auth.guard'
import { PostService } from './post.service'
import { UserResponse } from 'src/types/userResponse'

@ApiTags('posts')
@Controller('posts')
export class PostController {
  constructor(private postService: PostService) {}

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Post()
  createPost(@Body() payload: CreatePostDTO, @Request() req: Request & { user: UserResponse }) {
    return this.postService.createPostDTO({ payload, userId: req.user.id })
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @ApiParam({ name: 'id' })
  @Patch(':id')
  updatePost(@Body() payload: CreatePostDTO, @Param() param: { id: string }) {
    return this.postService.updatePostDTO({ payload, postId: param.id })
  }
}
