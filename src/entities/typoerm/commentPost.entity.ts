import { Column, Entity, ManyToOne } from 'typeorm'
import { User } from './user.entity'
import { Post } from './post.entity'
import { BaseEntity } from './base.entity'

@Entity({ name: 'comments' })
export class Comment extends BaseEntity {
  @Column('uuid')
  user_id: string

  @Column('uuid')
  posts_id: string

  @Column('uuid', { nullable: true })
  parent_id?: string

  @Column({ type: 'varchar', length: 255 })
  content: string

  @ManyToOne(() => User, (user) => user.comments, { onDelete: 'CASCADE' })
  user: User

  @ManyToOne(() => Post, (post) => post.comments, { onDelete: 'CASCADE' })
  post: Post
}
