import { getTramLines, getTramSeferFrequencyBySeferId, getTramStationsBySeferId } from "../api/tram.js";

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";

export function registerTramTools(server: McpServer) {
  server.tool(
    "get-tram-lines",
    "Fetch all tramvay (tram) lines in Izmir.",
    {},
    async () => {
      const result = await getTramLines();
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
    "get-tram-stations-by-sefer-id",
    "Fetch tramvay (tram) stations for a given sefer (trip) ID.",
    {
      seferId: z
        .string()
        .describe("Sefer (trip) ID for which to fetch tram stations, e.g. '1'."),
    },
    async ({ seferId }: { seferId: string }) => {
      const result = await getTramStationsBySeferId(seferId);
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
    "get-tram-sefer-frequency-by-sefer-id",
    "Fetch tramvay (tram) sefer (trip) frequency for a given sefer (trip) ID.",
    {
      seferId: z
        .string()
        .describe("Sefer (trip) ID for which to fetch tram sefer frequency, e.g. '1'."),
    },
    async ({ seferId }: { seferId: string }) => {
      const result = await getTramSeferFrequencyBySeferId(seferId);
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