import { Injectable, NotFoundException } from '@nestjs/common'
import { ReactPostDTO, UnReactPostDTO } from './dto'
import { MESSAGE, MESSAGE_NAME } from 'src/constants/message'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { PostEntity, ReactPostEntity } from 'src/entities/typeorm'

@Injectable()
export class ReactionService {
  constructor(
    @InjectRepository(ReactPostEntity) private readonly reactionRepository: Repository<ReactPostEntity>,
    @InjectRepository(PostEntity) private readonly postRepository: Repository<PostEntity>
  ) {}

  async reactPost({ payload, userId }: { payload: ReactPostDTO; userId: string }) {
    const post = await this.postRepository.findOneBy({ id: payload.postId })

    if (!post) {
      throw new NotFoundException(MESSAGE_NAME.POST)
    }

    const reactionPost = await this.reactionRepository.findOneBy({ postId: post.id, userId })

    if (reactionPost) {
      await this.reactionRepository.update({ id: reactionPost.id }, { reaction: payload.reaction })
    } else {
      await this.reactionRepository.save({
        postId: payload.postId,
        userId,
        reaction: payload.reaction
      })
    }

    return {
      message: MESSAGE.COMMON.SUCCESS('react post')
    }
  }

  async unReactionPost({ payload, userId }: { payload: UnReactPostDTO; userId: string }) {
    const post = await this.postRepository.findOneBy({ id: payload.postId })

    if (!post) {
      throw new NotFoundException(MESSAGE_NAME.POST)
    }

    const reactionPost = await this.reactionRepository.findOneBy({ postId: post.id, userId })

    if (!reactionPost) {
      throw new NotFoundException(MESSAGE_NAME.REACTION)
    }

    await this.reactionRepository.delete({ id: reactionPost.id })

    return {
      message: MESSAGE.COMMON.SUCCESS('un react post')
    }
  }
}
