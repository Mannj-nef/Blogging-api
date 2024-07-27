import { Module } from '@nestjs/common'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'
import { EmailService } from 'src/modules/email/email.service'
import { UserEntity } from 'src/entities/typeorm'
import { TypeOrmModule } from '@nestjs/typeorm'
// import { UserModule } from 'src/modules/user/user.module'

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  controllers: [AuthController],
  providers: [AuthService, EmailService]
})
export class AuthModule {}
