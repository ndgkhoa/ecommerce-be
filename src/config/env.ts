import 'dotenv/config'
import { z } from 'zod'

import logger from '~/utils/logger'

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  PORT: z.string().transform(Number).default('3001'),
  JWT_SECRET: z.string(),
  JWT_ISSUER: z.string().default('https://localhost:3001/'),
  JWT_AUDIENCE: z.enum(['web-app', 'mobile-app']).default('web-app'),
  JWT_ACCESS_EXP: z.number().default(7 * 24 * 60 * 60),
  JWT_REFRESH_EXP: z.number().default(7 * 24 * 60 * 60),
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

const config = Object.freeze(env.data)

export default config
