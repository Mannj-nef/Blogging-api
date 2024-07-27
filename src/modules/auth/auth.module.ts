import { Module } from '@nestjs/common'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'
import { EmailService } from 'src/modules/email/email.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { User } from 'src/entities/typeorm/user.entity'

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [AuthController],
  providers: [AuthService, EmailService]
})
export class AuthModule {}
