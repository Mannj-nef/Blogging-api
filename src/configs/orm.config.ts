import { join } from 'path'
import { ConfigService } from '@nestjs/config'
import { TypeOrmModuleOptions } from '@nestjs/typeorm'

export const config = (configService: ConfigService): TypeOrmModuleOptions => {
  const configDB: TypeOrmModuleOptions = {
    type: 'postgres',
    host: configService.getOrThrow('DB_HOST'),
    port: +configService.getOrThrow('DB_PORT'),
    username: configService.getOrThrow('DB_USER'),
    password: configService.getOrThrow('DB_PASSWORD'),
    database: configService.getOrThrow('DB_NAME'),
    synchronize: true,
    entities: [join(__dirname, '/../entities/typeorm/*.entity{.ts,.js}')]
  }

  console.log('\x1b[36m', 'Connect to database success')

  return configDB
}
