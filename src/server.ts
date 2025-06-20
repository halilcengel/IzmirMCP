import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import config from "./config.js";

const server = new McpServer({
    name: config.name,
    version: config.version,
    capabilities: {
      resources: {},
      tools: {},
    },
  });

  export { server };