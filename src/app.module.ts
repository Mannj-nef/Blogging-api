import { Module } from '@nestjs/common'
import { config } from './configs/orm.config'

import { TypeOrmModule } from '@nestjs/typeorm'

import { AuthModule, UserModule, EmailModule } from './modules'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { ConfigModule } from '@nestjs/config'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV || 'example'}`
    }),

    TypeOrmModule.forRoot(config),

    UserModule,
    AuthModule,
    EmailModule
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
