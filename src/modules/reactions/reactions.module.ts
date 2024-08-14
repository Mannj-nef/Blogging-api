import { Module } from '@nestjs/common'
import { ReactionController } from './reactions.controller'
import { ReactionService } from './reactions.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { PostEntity, ReactPostEntity, UserEntity } from 'src/entities/typeorm'

@Module({
  imports: [TypeOrmModule.forFeature([ReactPostEntity, UserEntity, PostEntity])],
  controllers: [ReactionController],
  providers: [ReactionService]
})
export class ReactionModule {}
