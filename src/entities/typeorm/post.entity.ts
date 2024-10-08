import { CATEGORY, POST_STATUS } from 'src/constants/enum'
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm'
import { ReactPostEntity } from './react-post.entity'
import { UserEntity } from './user.entity'
import { CommentEntity } from './comment-post.entity'
import { BaseEntity } from './base.entity'

@Entity({ name: 'posts' })
export class PostEntity extends BaseEntity {
  @Column('uuid')
  userId: string

  @Column({ type: 'varchar', length: 255 })
  title: string

  @Column({ type: 'varchar', length: 255 })
  slug: string

  @Column({ type: 'enum', enum: CATEGORY })
  category: CATEGORY

  @Column({ type: 'varchar', length: 255, nullable: true })
  imageThumbnail?: string

  @Column({ type: 'text' })
  content: string

  @Column({ type: 'enum', enum: POST_STATUS, default: POST_STATUS.PUBLIC })
  status: POST_STATUS

  @Column({ type: 'int', default: 0 })
  popularity: number

  @ManyToOne(() => UserEntity, (user) => user.posts, { onDelete: 'CASCADE' })
  user: UserEntity

  @OneToMany(() => CommentEntity, (comment) => comment.post, { cascade: true })
  comments: CommentEntity[]

  @OneToMany(() => ReactPostEntity, (reactPost) => reactPost.post, { cascade: true })
  reactPosts: ReactPostEntity[]
}
