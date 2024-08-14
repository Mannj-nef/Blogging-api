import { Module } from '@nestjs/common'
import { CommentController } from './comments.controller'
import { CommentService } from './comments.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { CommentEntity, PostEntity, UserEntity } from 'src/entities/typeorm'

@Module({
  imports: [TypeOrmModule.forFeature([PostEntity, UserEntity, CommentEntity])],
  controllers: [CommentController],
  providers: [CommentService]
})
export class CommentModule {}
