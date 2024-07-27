import * as dotenv from 'dotenv'
dotenv.config()

const env = process.env

export const ENV = {
  NODE_ENV: env.NODE_ENV,
  PORT: +env.PORT,
  PREFIX: env.PREFIX,

  // email
  MAIL_HOST: env.MAIL_HOST,
  MAIL_PORT: +env.MAIL_PORT,
  MAIL_USER: env.MAIL_USER,
  MAIL_PASSWORD: env.MAIL_PASSWORD,
  MAIL_FROM_NAME: env.MAIL_FROM_NAME,

  // DB
  DB_HOST: env.DB_HOST,
  DB_PORT: +env.DB_PORT,
  DB_USER: env.DB_USER,
  DB_PASSWORD: env.DB_PASSWORD,
  DB_NAME: env.DB_NAME
} as const
