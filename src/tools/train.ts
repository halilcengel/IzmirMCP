import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { getTrainStations } from "../api/train.js";

export function registerTrainTools(server: McpServer) {
  server.tool(
    "get-train-stations",
    "Fetch all train stations (gar) in Izmir, including location and info.",
    {},
    async () => {
      const result = await getTrainStations();
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