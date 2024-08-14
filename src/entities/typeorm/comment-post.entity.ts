import { Column, Entity, ManyToOne, OneToMany } from 'typeorm'
import { UserEntity } from './user.entity'
import { PostEntity } from './post.entity'
import { BaseEntity } from './base.entity'

@Entity({ name: 'comments' })
export class CommentEntity extends BaseEntity {
  @Column('uuid')
  userId: string

  @Column('uuid')
  postId: string

  @Column('uuid', { nullable: true })
  parentId: string

  @Column({ type: 'varchar', length: 255 })
  content: string

  @ManyToOne(() => UserEntity, (user) => user.comments, { onDelete: 'CASCADE' })
  user: UserEntity

  @ManyToOne(() => PostEntity, (post) => post.comments, { onDelete: 'CASCADE' })
  post: PostEntity

  @OneToMany(() => CommentEntity, (comment) => comment.parentId, { onDelete: 'CASCADE' })
  replies: CommentEntity[]
}
