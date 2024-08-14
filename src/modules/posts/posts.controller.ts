import { Body, Controller, Delete, Get, Param, Patch, Post, Query, Request, UseGuards } from '@nestjs/common'
import { CreatePostDTO, GetPostDTO } from './dto'
import { ApiBearerAuth, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger'
import { AuthGuard } from 'src/guards/auth.guard'
import { PostService } from './posts.service'
import { UserResponse } from 'src/types/user-response'

@ApiTags('posts')
@Controller('posts')
export class PostController {
  constructor(private postService: PostService) {}

  @Get()
  @ApiQuery({ name: 'title', required: false })
  @ApiQuery({ name: 'trending', required: false })
  @ApiQuery({ name: 'isLatest', required: false })
  @ApiQuery({ name: 'category', required: false })
  getPosts(@Query() param: GetPostDTO) {
    return this.postService.getPosts(param)
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Get('user/:id')
  getYourPosts(@Request() req: Request & { user: UserResponse }) {
    return this.postService.getYourPosts({ userId: req.user.id })
  }

  @ApiParam({ name: 'id' })
  @Get(':id')
  getPostDetail(@Param() param: { id: string }, @Query() query: { userId?: string }) {
    return this.postService.getPostDetail({ id: param.id, userId: query.userId })
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Post()
  createPost(@Body() payload: CreatePostDTO, @Request() req: Request & { user: UserResponse }) {
    return this.postService.createPost({ payload, userId: req.user.id })
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @ApiParam({ name: 'id' })
  @Patch(':id')
  updatePost(
    @Body() payload: CreatePostDTO,
    @Param() param: { id: string },
    @Request() req: Request & { user: UserResponse }
  ) {
    return this.postService.updatePost({ payload, postId: param.id, userId: req.user.id })
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @ApiParam({ name: 'id' })
  @Delete(':id')
  deletePost(@Param() param: { id: string }, @Request() req: Request & { user: UserResponse }) {
    return this.postService.deletePost({ postId: param.id, userId: req.user.id })
  }
}
