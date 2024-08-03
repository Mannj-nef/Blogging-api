import { Body, Controller, Get, Patch, Request, UseGuards } from '@nestjs/common'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'
import { UserService } from './user.service'
import { AuthGuard } from 'src/shared/guards/auth.guard'
import { UpdateUserDTO } from './dto/updateUser.dto'
import { UserResponse } from 'src/types/userResponse'

@ApiTags('users')
@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('get-me')
  getMe(@Request() req: Request & { user: UserResponse }) {
    return this.userService.getMe(req.user)
  }

  @Patch('update-me')
  updateMe(@Request() req: Request & { user: UserResponse }, @Body() userPayload: UpdateUserDTO) {
    return this.userService.updateMe({ userPayload, userId: req.user.id })
  }
}
