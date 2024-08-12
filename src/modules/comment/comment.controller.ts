import { Body, Controller, Delete, Get, Param, Patch, Post, Query, Request, UseGuards } from '@nestjs/common'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'
import { AuthGuard } from 'src/shared/guards/auth.guard'
import { CommentService } from './comment.service'
import { GetCommentDTO } from './dto/getComment.dot'
import { CreateCommentDTO } from './dto/createComment.dto'
import { UserResponse } from 'src/types/userResponse'
import { UpdateCommentDTO } from './dto/updateComment.dto'

@ApiTags('comment')
@Controller('comment')
export class CommentController {
  constructor(private commentService: CommentService) {}

  @Get()
  getCommentWidthPost(@Query() payload: GetCommentDTO) {
    return this.commentService.getCommentWidthPost(payload)
  }

  @Post()
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  createComment(@Body() payload: CreateCommentDTO, @Request() req: { user: UserResponse }) {
    return this.commentService.createComment({ userId: req.user.id, payload })
  }

  @ApiBearerAuth()
  @Patch(':id')
  @UseGuards(AuthGuard)
  updateComment(@Body() payload: UpdateCommentDTO, @Request() req: { user: UserResponse }, @Param('id') id: string) {
    return this.commentService.updateComment({ payload, userId: req.user.id, id })
  }

  @ApiBearerAuth()
  @Delete(':id')
  @UseGuards(AuthGuard)
  deleteComment(@Param('id') id: string, @Request() req: { user: UserResponse }) {
    return this.commentService.deleteComment({ id, userId: req.user.id })
  }
}
