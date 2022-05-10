import { z } from 'zod'
import { Env } from './types'

const EnvSchema = z.object({
  DATABASE_URL: z.string(),
  DATABASE_USERNAME: z.string(),
  DATABASE_PASSWORD: z.string(),
  JWT_SECRET: z.string(),
})

export function validate(raw: Record<string, unknown>): Env {
  const env = EnvSchema.parse(raw)

  return {
    database: {
      url: env.DATABASE_URL,
      username: env.DATABASE_USERNAME,
      password: env.DATABASE_PASSWORD,
    },
    jwt: {
      secret: env.JWT_SECRET,
    },
  }
}
