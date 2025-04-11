import { z } from "zod"

const envSchema = z.object({
  DATABASE_URL: z.string(),
  DIRECT_URL: z.string(),
  JWT_SECRET_KEY: z.string(),
})

export const env = envSchema.parse(process.env)
