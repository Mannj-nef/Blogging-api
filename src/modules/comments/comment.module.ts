import { Module } from '@nestjs/common'
import { CommentController } from './comment.controller'
import { CommentService } from './comment.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { CommentEntity, PostEntity, UserEntity } from 'src/entities/typeorm'

@Module({
  imports: [TypeOrmModule.forFeature([PostEntity, UserEntity, CommentEntity])],
  controllers: [CommentController],
  providers: [CommentService]
})
export class CommentModule {}
