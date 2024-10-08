import { Module } from '@nestjs/common'
import { config } from './configs/orm.config'

import { TypeOrmModule } from '@nestjs/typeorm'

import { AuthModule, UserModule, EmailModule, CommentModule, ReactionModule, PostModule } from './modules'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { ConfigModule, ConfigService } from '@nestjs/config'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV || 'example'}`
    }),

    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: config,
      inject: [ConfigService]
    }),

    UserModule,
    AuthModule,
    EmailModule,
    PostModule,
    ReactionModule,
    CommentModule
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
