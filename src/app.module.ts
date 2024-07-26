import { Module } from '@nestjs/common'
// import { ConfigModule } from '@nestjs/config'
// import { config } from './configs/orm.config'

// import { TypeOrmModule } from '@nestjs/typeorm'

import { AuthModule, UserModule } from './modules'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { ConfigModule } from '@nestjs/config'
// import { configuration } from './configs/configuration .config'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV || 'example'}`
    }),

    // TypeOrmModule.forRoot(config),

    UserModule,
    AuthModule
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
