#!/usr/bin/env node

import { StdioServer } from "./transports/stdio.js"
import { StreamableHttpServer } from "./transports/streamable-http.js"
import { config } from "./config.js"
import { initializePicnicClient } from "./utils/picnic-client.js"

// Parse command line arguments
function parseArgs() {
  const args = process.argv.slice(2)
  const options = {
    stdio: false,
    port: config.HTTP_PORT,
  }

  for (let i = 0; i < args.length; i++) {
    switch (args[i]) {
      case '--stdio':
        options.stdio = true
        break
      case '--port':
        if (i + 1 < args.length) {
          options.port = parseInt(args[i + 1], 10)
          i++
        }
        break
    }
  }

  return options
}

// Create and start the appropriate server
async function runServer() {
  await initializePicnicClient()

  const cliOptions = parseArgs()

  // Use --stdio flag to force STDIO transport, otherwise use HTTP by default (framework requirement)
  const useStdio = cliOptions.stdio || (!config.ENABLE_HTTP_SERVER && !cliOptions.stdio)

  if (!useStdio) {
    // Start HTTP server
    const server = new StreamableHttpServer({
      port: cliOptions.port,
      host: config.HTTP_HOST,
    })

    // Handle graceful shutdown for HTTP server
    const shutdown = async () => {
      console.error("Shutting down HTTP server...")
      try {
        await server.stop()
        console.error("HTTP server stopped")
        process.exit(0)
      } catch (error) {
        console.error("Error stopping server:", error)
        process.exit(1)
      }
    }

    process.on("SIGINT", shutdown)
    process.on("SIGTERM", shutdown)

    await server.start()
    console.error("MCP HTTP Server started successfully")
  } else {
    // Start stdio server
    const server = new StdioServer()
    await server.start()
  }
}

runServer().catch((error) => {
  console.error("Fatal error running server:", error)
  process.exit(1)
})
