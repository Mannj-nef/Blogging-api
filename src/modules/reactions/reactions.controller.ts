import { Body, Controller, Delete, Param, Post, Request, UseGuards } from '@nestjs/common'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'
import { AuthGuard } from 'src/guards/auth.guard'
import { ReactionService } from './reactions.service'
import { ReactPostDTO, UnReactPostDTO } from './dto'
import { UserResponse } from 'src/types/user-response'

@ApiTags('reactions')
@Controller('reactions')
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
