import * as dotenv from 'dotenv'
dotenv.config()

const env = process.env

export const ENV = {
  NODE_ENV: env.NODE_ENV,
  PORT: +env.PORT,
  PREFIX: env.PREFIX
} as const
