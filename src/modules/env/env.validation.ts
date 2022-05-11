import { z } from 'zod'
import { Env } from './types'

const EnvSchema = z.object({
  NODE_ENV: z
    .union([
      z.literal('development'),
      z.literal('production'),
      z.literal('test'),
    ])
    .default('development'),
  DATABASE_URL: z.string(),
  DATABASE_USERNAME: z.string(),
  DATABASE_PASSWORD: z.string(),
  JWT_SECRET: z.string(),
})

export function validate(raw: Record<string, unknown>): Env {
  let env: z.TypeOf<typeof EnvSchema>

  try {
    env = EnvSchema.parse(raw)
  } catch (error) {
    const isZodError = error instanceof z.ZodError
    if (!isZodError) throw new Error('Unknown error parsing .env file')

    console.error(`Invalid .env file. See below for detailed info.`)
    console.info('\n')
    console.info(error.format())

    // not throwing error for a cleaner message
    process.exit(1)
  }

  return {
    isDev: env.NODE_ENV === 'development',
    isProd: env.NODE_ENV === 'production',
    isTest: env.NODE_ENV === 'test',
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
