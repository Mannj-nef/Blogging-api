import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common'
import { CreatePostDTO } from './dto/createPost.dto'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'
import { AuthGuard } from 'src/shared/guards/auth.guard'
import { PostService } from './post.service'
import { UserResponse } from 'src/types/userResponse'

@ApiTags('post')
@Controller('post')
export class PostController {
  constructor(private postService: PostService) {}

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Post()
  createPost(@Body() payload: CreatePostDTO, @Request() req: Request & { user: UserResponse }) {
    return this.postService.createPostDTO({ payload, userId: req.user.id })
  }
}
