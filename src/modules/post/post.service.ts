import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { PostEntity, ReactPostEntity, CommentEntity } from 'src/entities/typeorm'
import { Repository } from 'typeorm'
import { CreatePostDTO } from './dto/createPost.dto'
import { MESSAGE, MESSAGE_NAME } from 'src/shared/constants/message'

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(PostEntity)
    private readonly postRepository: Repository<PostEntity>,
    @InjectRepository(ReactPostEntity)
    private readonly reactPostRepository: Repository<ReactPostEntity>,
    @InjectRepository(CommentEntity)
    private readonly commentRepository: Repository<CommentEntity>
  ) {}

  async getPostDetail({ id }: { id: string }) {
    const post = await this.postRepository.findOneBy({ id })

    if (!post) {
      throw new NotFoundException(MESSAGE_NAME.POST)
    }
    console.log({ post })
    return {
      message: MESSAGE.COMMON.SUCCESS('Get post detail')
    }
  }

  async createPost({ payload, userId }: { payload: CreatePostDTO; userId: string }) {
    await this.postRepository.save({
      userId,
      title: payload.title,
      slug: payload.slug,
      category: payload.category,
      imageThumbnail: payload.imageThumbnail,
      content: payload.content,
      status: payload.status
    })

    return {
      message: MESSAGE.COMMON.SUCCESS('Create post')
    }
  }

  async updatePost({ payload, postId, userId }: { payload: CreatePostDTO; postId: string; userId: string }) {
    const post = await this.postRepository.findOneBy({ id: postId, userId: userId })

    if (!post) {
      throw new NotFoundException(MESSAGE_NAME.POST)
    }

    await this.postRepository.update(post.id, {
      title: payload.title,
      slug: payload.slug,
      category: payload.category,
      imageThumbnail: payload.imageThumbnail,
      content: payload.content,
      status: payload.status
    })

    return {
      message: MESSAGE.COMMON.SUCCESS('Update post')
    }
  }

  async deletePost({ postId, userId }: { postId: string; userId: string }) {
    const post = await this.postRepository.findOneBy({ id: postId, userId })

    if (!post) {
      throw new NotFoundException(MESSAGE_NAME.POST)
    }

    await this.postRepository.delete(post.id)

    return {
      message: MESSAGE.COMMON.SUCCESS('Delete post')
    }
  }
}
