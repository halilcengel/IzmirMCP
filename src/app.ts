import { registerEshotTools, registerIzbanTools } from "./tools/index.js";

import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { server } from "./server.js";

registerIzbanTools(server);
registerEshotTools(server);

async function app() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.log("IzmirUlasim MCP Server running on stdio");
}

app().catch((error) => {
  process.exit(1);
});

