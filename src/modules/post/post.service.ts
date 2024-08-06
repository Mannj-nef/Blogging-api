import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { PostEntity, ReactPostEntity, CommentEntity } from 'src/entities/typeorm'
import { Repository } from 'typeorm'
import { CreatePostDTO } from './dto/createPost.dto'
import { MESSAGE } from 'src/shared/constants/message'

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

  async createPostDTO({ payload, userId }: { payload: CreatePostDTO; userId: string }) {
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

  async updatePostDTO({ payload, postId }: { payload: CreatePostDTO; postId: string }) {
    const post = await this.postRepository.findOneBy({ id: postId })

    if (!post) {
      return {
        message: MESSAGE.COMMON.NOT_FOUND('Post')
      }
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
}
