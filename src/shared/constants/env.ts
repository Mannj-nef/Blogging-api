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
  MAIL_FROM_NAME: env.MAIL_FROM_NAME
} as const
