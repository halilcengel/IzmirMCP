import {
  getEshotLines,
  getEshotStations,
  getLineBusLocations,
  getNearestLineBusByStation,
  getStationNearestBus,
} from "../api/eshot.js";

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import z from "zod";

export function registerEshotTools(server: McpServer) {
  server.tool(
    "get-eshot-stations",
    "Search ESHOT stops by name or address and return matching station records",
    {
      query: z
        .string()
        .optional()
        .describe(
          "Partial or full station name/address to filter results (e.g. 'Alsancak')"
        ),
      limit: z
        .number()
        .optional()
        .describe(
          "Maximum number of station records to return (default server-side limit applies if omitted)"
        ),
    },
    async ({ query, limit }: { query?: string; limit?: number }) => {
      const stations = await getEshotStations(query, limit);
      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(stations, null, 2),
          },
        ],
      };
    }
  );

  server.tool(
    "get-eshot-lines",
    "Search ESHOT bus lines by number or name and return matching line records",
    {
      query: z
        .string()
        .optional()
        .describe(
          "Partial or full line number/name to filter results (e.g. '202' or 'Bornova')"
        ),
      limit: z
        .number()
        .optional()
        .describe(
          "Maximum number of line records to return (default server-side limit applies if omitted)"
        ),
    },
    async ({ query, limit }: { query?: string; limit?: number }) => {
      const lines = await getEshotLines(query, limit);
      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(lines, null, 2),
          },
        ],
      };
    }
  );

  server.tool(
    "get-line-approaching-buses",
    "Get buses of a line approaching a specific stop",
    {
      hatNo: z
        .string()
        .describe(
          "Bus line number (hatNo) whose approaching buses you want to retrieve, e.g. '551' or '35G'"
        ),
      durakId: z
        .string()
        .describe(
          "Stop ID (durakId) where you want to see which buses are about to arrive"
        ),
    },
    async ({ hatNo, durakId }: { hatNo: string; durakId: string }) => {
      const result = await getNearestLineBusByStation(hatNo, durakId);
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
    "get-line-bus-locations",
    "Get real-time locations of all buses on a given line",
    {
      hatNo: z
        .string()
        .describe(
          "Bus line number (hatNo) whose current GPS positions you want, e.g. '551' or '35G'"
        ),
    },
    async ({ hatNo }: { hatNo: string }) => {
      const result = await getLineBusLocations(hatNo);
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
    "get-station-approaching-buses",
    "Get real-time positions of buses approaching a specific stop",
    {
      durakId: z
        .string()
        .describe(
          "Stop ID (durakId) for which you want to retrieve buses that are currently heading toward it"
        ),
    },
    async ({ durakId }: { durakId: string }) => {
      const result = await getStationNearestBus(durakId);
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