import { getMetroSeferFrequencies, getMetroStations } from "../api/metro.js";

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";

export function registerMetroTools(server: McpServer) {
  server.tool(
    "get-metro-stations",
    "Fetch all metro stations in Izmir, including order and location data.",
    {},
    async () => {
      const result = await getMetroStations();
      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(result, null, 2),
          },
        ],
      };
    }
  );

  server.tool(
    "get-metro-sefer-frequencies",
    "Fetch metro sefer (trip) frequencies in Izmir.",
    {},
    async () => {
      const result = await getMetroSeferFrequencies();
      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(result, null, 2),
          },
        ],
      };
    }
  );
} 