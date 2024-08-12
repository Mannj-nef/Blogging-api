import { Injectable, NotFoundException } from '@nestjs/common'
import { ReactPostDTO } from './dto/reactPost.dto'
import { MESSAGE, MESSAGE_NAME } from 'src/shared/constants/message'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { PostEntity, ReactPostEntity } from 'src/entities/typeorm'

@Injectable()
export class ReactionService {
  constructor(
    @InjectRepository(ReactPostEntity) private readonly reactionRepository: Repository<ReactPostDTO>,
    @InjectRepository(PostEntity) private readonly postRepository: Repository<PostEntity>
  ) {}

  async reactPost({ payload, userId }: { payload: ReactPostDTO; userId: string }) {
    const post = await this.postRepository.findOneBy({ id: payload.postId })

    if (!post) {
      throw new NotFoundException(MESSAGE_NAME.POST)
    }

    await this.reactionRepository.save({
      postId: payload.postId,
      userId,
      reaction: payload.reaction
    })

    return {
      message: MESSAGE.COMMON.SUCCESS('react post')
    }
  }
}
