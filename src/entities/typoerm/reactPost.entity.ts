import { REACTION_TYPE } from 'src/shared/constants/enum'
import { Column, Entity, ManyToOne } from 'typeorm'
import { User } from './user.entity'
import { Post } from './post.entity'
import { BaseEntity } from './base.entity'

@Entity('react_posts')
export class ReactPost extends BaseEntity {
  @Column('uuid')
  user_id: string

  @Column('uuid')
  posts_id: string

  @Column({
    type: 'enum',
    enum: REACTION_TYPE,
    nullable: true,
  })
  reaction?: REACTION_TYPE

  @ManyToOne(() => User, (user) => user.reactPosts, { onDelete: 'CASCADE' })
  user: User

  @ManyToOne(() => Post, (post) => post.reactPosts, { onDelete: 'CASCADE' })
  post: Post
}
