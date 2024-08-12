import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { PostEntity, ReactPostEntity, CommentEntity } from 'src/entities/typeorm'
import { ILike, Repository } from 'typeorm'
import { CreatePostDTO } from './dto/createPost.dto'
import { MESSAGE, MESSAGE_NAME } from 'src/shared/constants/message'
import { GetPostDTO } from './dto/getPost.dto.'
import { POST_STATUS } from 'src/shared/constants/enum'

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

  async getPosts(param: GetPostDTO) {
    const { title, trending, isLatest, category, limit, page } = param

    if (Boolean(trending)) {
      const posts = await this.postRepository.find({
        where: {
          status: POST_STATUS.PUBLIC
        },
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
        },
        order: {
          popularity: 'DESC'
        },
        take: 4
      })

      return {
        message: MESSAGE.COMMON.SUCCESS('Get posts'),
        posts
      }
    }

    if (Boolean(isLatest)) {
      const posts = await this.postRepository.find({
        where: {
          status: POST_STATUS.PUBLIC
        },
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
        },
        order: {
          createdAt: 'DESC'
        },
        take: 4
      })

      return {
        message: MESSAGE.COMMON.SUCCESS('Get posts'),
        posts
      }
    }

    const posts = await this.postRepository.find({
      where: {
        category,
        title: title ? ILike(`%${title}%`) : undefined,
        status: POST_STATUS.PUBLIC
      },
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
      },
      order: {
        createdAt: 'DESC'
      },
      skip: (page - 1) * limit,
      take: limit
    })

    return {
      message: MESSAGE.COMMON.SUCCESS('Get posts'),
      posts
    }
  }

  async getYourPosts({ userId }: { userId: string }) {
    const posts = await this.postRepository.find({
      where: { user: { id: userId } },
      relations: { user: true }
    })

    return {
      message: MESSAGE.COMMON.SUCCESS('Get posts'),
      posts
    }
  }

  async getPostDetail({ id, userId }: { id: string; userId?: string }) {
    const post = await this.postRepository.findOne({
      where: { id },
      relations: { user: true },
      select: {
        user: {
          id: true,
          firstName: true,
          lastName: true,
          coverPhoto: true,
          userName: true,
          email: true
        }
      }
    })

    if (!post) {
      throw new NotFoundException(MESSAGE_NAME.POST)
    }

    const [totalComment, totalReaction, reactionType] = await Promise.all([
      await this.commentRepository.count({
        where: { postId: post.id }
      }),

      await this.reactPostRepository.count({ where: { postId: post.id } }),
      await this.reactPostRepository.findOne({ where: { postId: post.id, userId } }),

      await this.postRepository.update(id, { popularity: post.popularity + 1 })
    ])

    const newPostDetail = {
      ...post,
      commentTotal: totalComment,
      reaction: {
        total: totalReaction,
        type: reactionType ? reactionType.reaction : null
      }
    }

    return {
      message: MESSAGE.COMMON.SUCCESS('Get post detail'),
      post: newPostDetail
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
