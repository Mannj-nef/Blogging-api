import { REACTION_TYPE } from 'src/shared/constants/enum'
import { Column, Entity, ManyToOne } from 'typeorm'
import { UserEntity } from './user.entity'
import { PostEntity } from './post.entity'
import { BaseEntity } from './base.entity'

@Entity('react_posts')
export class ReactPostEntity extends BaseEntity {
  @Column('uuid')
  userId: string

  @Column('uuid')
  postsId: string

  @Column({
    type: 'enum',
    enum: REACTION_TYPE,
    nullable: true
  })
  reaction?: REACTION_TYPE

  @ManyToOne(() => UserEntity, (user) => user.reactPosts, { onDelete: 'CASCADE' })
  user: UserEntity

  @ManyToOne(() => PostEntity, (post) => post.reactPosts, { onDelete: 'CASCADE' })
  post: PostEntity
}
