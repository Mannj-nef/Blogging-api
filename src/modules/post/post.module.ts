import { Module } from '@nestjs/common'
import { PostController } from './post.controller'
import { PostService } from './post.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { CommentEntity, PostEntity, ReactPostEntity, UserEntity } from 'src/entities/typeorm'

@Module({
  imports: [TypeOrmModule.forFeature([PostEntity, ReactPostEntity, CommentEntity, UserEntity])],
  controllers: [PostController],
  providers: [PostService]
})
export class PostModule {}
