import { registerEshotTools, registerIzbanTools } from "./tools/index.js";

import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { server } from "./server.js";

registerIzbanTools(server);
registerEshotTools(server);

async function app() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("IzmirUlasim MCP Server running on stdio");
}

app().catch((error) => {
    console.error("Fatal error in app():", error);
  process.exit(1);
});

