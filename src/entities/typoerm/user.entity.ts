import { Column, Entity, OneToMany } from 'typeorm'
import { ReactPost } from './reactPost.entity'
import { Post } from './post.entity'
import { Comment } from './commentPost.entity'
import { BaseEntity } from './base.entity'
import * as bcrypt from 'bcrypt'

@Entity({ name: 'users' })
export class User extends BaseEntity {
  @Column({ type: 'varchar', length: 255 })
  user_name: string

  @Column({ type: 'varchar', length: 255, nullable: true })
  first_name?: string

  @Column({ type: 'varchar', length: 255, nullable: true })
  last_name?: string

  @Column({ type: 'varchar', length: 255, unique: true })
  email: string

  @Column({ type: 'varchar', length: 255 })
  password: string

  @Column({ type: 'varchar', nullable: true })
  cover_photo?: string

  @Column({ type: 'int', nullable: true })
  phone_number?: number

  @Column({ type: 'date', nullable: true })
  date_of_birth?: Date

  @Column({ type: 'varchar', length: 255, nullable: true })
  city?: string

  @Column({ type: 'varchar', length: 255, nullable: true })
  biography?: string

  @Column({ type: 'varchar', length: 255, nullable: true })
  refresh_token?: string

  @Column({ type: 'int', nullable: true })
  forgot_password_otp?: number

  @OneToMany(() => Post, (post) => post.user, { cascade: true })
  posts: Post[]

  @OneToMany(() => ReactPost, (reactPost) => reactPost.user, { cascade: true })
  reactPosts: ReactPost[]

  @OneToMany(() => Comment, (comment) => comment.user, { cascade: true })
  comments: Comment[]

  comparePassword(password: string) {
    return bcrypt.compareSync(password, this.password)
  }
}
