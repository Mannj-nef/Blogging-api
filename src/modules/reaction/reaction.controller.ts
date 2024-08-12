import { Body, Controller, Delete, Param, Post, Request, UseGuards } from '@nestjs/common'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'
import { AuthGuard } from 'src/shared/guards/auth.guard'
import { ReactionService } from './reaction.service'
import { ReactPostDTO } from './dto/reactPost.dto'
import { UserResponse } from 'src/types/userResponse'
import { UnReactPostDTO } from './dto/unReactPost.dto'

@ApiTags('Reaction')
@Controller('reaction')
@UseGuards(AuthGuard)
@ApiBearerAuth()
export class ReactionController {
  constructor(private reactionService: ReactionService) {}

  @Post()
  reactPost(@Body() payload: ReactPostDTO, @Request() req: Request & { user: UserResponse }) {
    return this.reactionService.reactPost({ payload, userId: req.user.id })
  }

  @Delete(':postId')
  unReactionPost(@Param() payload: UnReactPostDTO, @Request() req: Request & { user: UserResponse }) {
    return this.reactionService.unReactionPost({ payload, userId: req.user.id })
  }
}
