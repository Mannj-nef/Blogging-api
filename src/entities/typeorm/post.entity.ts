import { CATEGORY, POST_STATUS } from 'src/shared/constants/enum'
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm'
import { ReactPostEntity } from './reactPost.entity'
import { UserEntity } from './user.entity'
import { CommentEntity } from './commentPost.entity'
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
  user: Pick<UserEntity, 'id' | 'email' | 'firstName' | 'lastName' | 'coverPhoto' | 'userName'>

  @OneToMany(() => CommentEntity, (comment) => comment.post, { cascade: true })
  comments: CommentEntity[]

  @OneToMany(() => ReactPostEntity, (reactPost) => reactPost.post, { cascade: true })
  @JoinColumn([{ name: 'reactPostId', referencedColumnName: 'id' }])
  reactPosts: ReactPostEntity[]
}
