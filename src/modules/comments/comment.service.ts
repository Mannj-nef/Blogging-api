import { HttpException, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { CommentEntity, PostEntity } from 'src/entities/typeorm'
import { Repository } from 'typeorm'
import { GetCommentDTO, UpdateCommentDTO, CreateCommentDTO } from './dto'
import { NotFoundException } from 'src/exceptions/not-found.exception'
import { MESSAGE, MESSAGE_NAME } from 'src/constants/message'

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(CommentEntity) private readonly commentRepository: Repository<CommentEntity>,
    @InjectRepository(PostEntity) private readonly postRepository: Repository<PostEntity>
  ) {}

  async getCommentWidthPost(payload: GetCommentDTO) {
    const post = await this.postRepository.findOneBy({ id: payload.postId })

    if (!post) {
      throw new NotFoundException(MESSAGE_NAME.POST)
    }

    const comments = await this.commentRepository.find({
      where: { postId: payload.postId, parentId: null },
      relations: {
        user: true
      },
      select: {
        user: {
          id: true,
          userName: true,
          email: true,
          firstName: true,
          lastName: true,
          coverPhoto: true
        }
      }
    })

    const newComments = comments.map((comment) => {
      comment.replies = comments.filter((item) => item.parentId === comment.id)
      return comment
    })

    const result = newComments.filter((item) => item.parentId === null)

    return {
      message: MESSAGE.COMMON.SUCCESS('Get comment'),
      comments: result.reverse()
    }
  }

  async createComment({ payload, userId }: { payload: CreateCommentDTO; userId: string }) {
    const post = await this.postRepository.findOneBy({ id: payload.postId })

    if (!post) {
      throw new NotFoundException(MESSAGE_NAME.POST)
    }

    await this.commentRepository.save({
      postId: payload.postId,
      content: payload.content,
      parentId: payload.parentId ? payload.parentId : null,
      user: {
        id: userId
      }
    })

    return {
      message: MESSAGE.COMMON.SUCCESS('Create comment')
    }
  }

  async updateComment({ payload, userId, id }: { payload: UpdateCommentDTO; userId: string; id: string }) {
    const comment = await this.commentRepository.findOneBy({ id })

    if (!comment) {
      throw new NotFoundException(MESSAGE_NAME.COMMENT)
    }

    if (comment.userId !== userId) {
      throw new HttpException(MESSAGE.COMMON.ACCESS_DENIED, 403)
    }

    await this.commentRepository.update(comment.id, {
      content: payload.content
    })

    return {
      message: MESSAGE.COMMON.SUCCESS('Update comment')
    }
  }

  async deleteComment({ id, userId }: { id: string; userId: string }) {
    const comment = await this.commentRepository.findOneBy({ id })

    if (!comment) {
      throw new NotFoundException(MESSAGE_NAME.COMMENT)
    }

    if (comment.userId !== userId) {
      throw new HttpException(MESSAGE.COMMON.ACCESS_DENIED, 403)
    }

    await this.commentRepository.delete(comment.id)

    return {
      message: MESSAGE.COMMON.SUCCESS('Delete comment')
    }
  }
}
