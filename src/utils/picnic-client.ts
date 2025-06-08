import PicnicClient from "picnic-api"
import { config } from "../config.js"

// Singleton instance for caching
let picnicClientInstance: InstanceType<typeof PicnicClient> | null = null

export async function initializePicnicClient(
  username?: string,
  password?: string,
  countryCode: "NL" | "DE" = "NL",
  apiVersion: string = "15",
): Promise<void> {
  if (picnicClientInstance) {
    return
  }

  console.error("Initializing Picnic client...")
  const client = new PicnicClient({
    countryCode,
    apiVersion,
  })

  const loginUsername = username || config.PICNIC_USERNAME
  const loginPassword = password || config.PICNIC_PASSWORD

  await client.login(loginUsername, loginPassword)
  picnicClientInstance = client
  console.error("Picnic client initialized successfully.")
}

export function getPicnicClient(): InstanceType<typeof PicnicClient> {
  if (!picnicClientInstance) {
    throw new Error("Picnic client has not been initialized. Call initializePicnicClient() first.")
  }
  return picnicClientInstance
}

export function resetPicnicClient(): void {
  picnicClientInstance = null
}
