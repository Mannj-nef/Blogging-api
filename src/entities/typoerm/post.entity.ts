import { CATEGORY, POST_STATUS } from 'src/shared/constants/enum'
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm'
import { ReactPost } from './reactPost.entity'
import { User } from './user.entity'
import { Comment } from './commentPost.entity'
import { BaseEntity } from './base.entity'

@Entity({ name: 'posts' })
export class Post extends BaseEntity {
  @Column('uuid')
  user_id: string

  @Column({ type: 'varchar', length: 255 })
  title: string

  @Column({ type: 'varchar', length: 255 })
  slug: string

  @Column({ type: 'enum', enum: CATEGORY })
  category: CATEGORY

  @Column({ type: 'varchar', length: 255, nullable: true })
  image_thumbnail?: string

  @Column({ type: 'text' })
  content: string

  @Column({ type: 'enum', enum: POST_STATUS, default: POST_STATUS.PUBLIC })
  status: POST_STATUS

  @Column({ type: 'int', default: 0 })
  popularity: number

  @ManyToOne(() => User, (user) => user.posts, { onDelete: 'CASCADE' })
  user: User

  @OneToMany(() => Comment, (comment) => comment.post, { cascade: true })
  comments: Comment[]

  @OneToMany(() => ReactPost, (reactPost) => reactPost.post, { cascade: true })
  reactPosts: ReactPost[]
}
