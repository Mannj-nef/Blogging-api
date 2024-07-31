import { Column, Entity, OneToMany } from 'typeorm'
import { ReactPostEntity } from './reactPost.entity'
import { PostEntity } from './post.entity'
import { CommentEntity } from './commentPost.entity'
import { BaseEntity } from './base.entity'

@Entity({ name: 'users' })
export class UserEntity extends BaseEntity {
  @Column({ type: 'varchar', length: 255 })
  userName: string

  @Column({ type: 'varchar', length: 255, nullable: true })
  firstName?: string

  @Column({ type: 'varchar', length: 255, nullable: true })
  lastName?: string

  @Column({ type: 'varchar', length: 255, unique: true })
  email: string

  @Column({ type: 'varchar', length: 255 })
  password: string

  @Column({ type: 'varchar', nullable: true })
  coverPhoto?: string

  @Column({ type: 'int', nullable: true })
  phoneNumber?: number

  @Column({ type: 'date', nullable: true })
  dateOfBirth?: Date

  @Column({ type: 'varchar', length: 255, nullable: true })
  city?: string

  @Column({ type: 'varchar', length: 255, nullable: true })
  biography?: string

  @Column({ type: 'varchar', length: 255, nullable: true })
  refreshToken?: string // hashData

  @Column({ type: 'varchar', nullable: true })
  forgotPasswordOtp?: string // hashData

  @OneToMany(() => PostEntity, (post) => post.user, { cascade: true })
  posts: PostEntity[]

  @OneToMany(() => ReactPostEntity, (reactPost) => reactPost.user, { cascade: true })
  reactPosts: ReactPostEntity[]

  @OneToMany(() => CommentEntity, (comment) => comment.user, { cascade: true })
  comments: CommentEntity[]
}
