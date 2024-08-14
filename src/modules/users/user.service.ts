import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { UserEntity } from 'src/entities/typeorm'
import { MESSAGE, MESSAGE_NAME } from 'src/constants/message'
import { Repository } from 'typeorm'
import { UpdateUserDTO } from './dto'
import { UserResponse } from 'src/types/user-response'
import { calculateAge } from 'src/utils/generate-random'

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>
  ) {}

  getMe(user: UserResponse) {
    return {
      user: user,
      message: MESSAGE.COMMON.SUCCESS('Get user')
    }
  }

  async updateMe({ userId, userPayload }: { userPayload: UpdateUserDTO; userId: string }) {
    const user = await this.userRepository.findOneBy({ id: userId })

    if (!user) {
      throw new NotFoundException(MESSAGE_NAME.USER)
    }

    if (userPayload.dateOfBirth) {
      const ageUser = calculateAge(new Date(userPayload.dateOfBirth))

      if (ageUser < 6) {
        throw new HttpException(MESSAGE.USER.MINIMUM_AGE, HttpStatus.BAD_REQUEST)
      }
    } else {
      userPayload.dateOfBirth = null
    }

    await this.userRepository.update(userId, userPayload)

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, forgotPasswordOtp, refreshToken, ...rest } = user

    const updatedUser = {
      ...rest,
      ...userPayload
    }

    return {
      user: updatedUser,
      message: MESSAGE.COMMON.SUCCESS('Update user')
    }
  }
}
