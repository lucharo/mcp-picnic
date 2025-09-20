import { z } from "zod"
import dotenv from "dotenv"

dotenv.config()

const configSchema = z.object({
  PICNIC_USERNAME: z.string(),
  PICNIC_PASSWORD: z.string(),
  PORT: z
    .string()
    .transform((val) => parseInt(val, 10))
    .optional(),
  HTTP_PORT: z
    .string()
    .transform((val) => parseInt(val, 10))
    .default("8080"),
  HTTP_HOST: z.string().default("localhost"),
})

const parsedConfig = configSchema.parse(process.env)

export const config = {
  ...parsedConfig,
  // Use PORT if available, otherwise fall back to HTTP_PORT, finally default to 8080
  HTTP_PORT: parsedConfig.PORT ?? parsedConfig.HTTP_PORT ?? 8080,
}
