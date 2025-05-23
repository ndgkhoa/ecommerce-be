import 'dotenv/config'
import fs from 'fs'
import path from 'path'
import { z } from 'zod'

import logger from '~/config/logger'

const privateKey = fs.readFileSync(path.join(__dirname, '../keys/private.key'), 'utf8')
const publicKey = fs.readFileSync(path.join(__dirname, '../keys/public.key'), 'utf8')

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  PORT: z.string().transform(Number).default('3001'),
  JWT_REFRESH_SECRET: z.string().min(32),
  JWT_ISSUER: z.string().default('https://localhost:3001/'),
  JWT_AUDIENCE: z.enum(['web-app', 'mobile-app']).default('web-app'),
  JWT_ACCESS_EXP: z.string().default('2h'),
  JWT_REFRESH_EXP: z.string().default('7d'),
  MONGO_URI: z.string().url(),
  CLOUDINARY_CLOUD_NAME: z.string(),
  CLOUDINARY_API_KEY: z.string(),
  CLOUDINARY_API_SECRET: z.string()
})

const env = envSchema.safeParse(process.env)

if (!env.success) {
  logger.error('Invalid environment variables:', env.error.format())
  process.exit(1)
}

const config = Object.freeze({ ...env.data, privateKey, publicKey })

export default config
