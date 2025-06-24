import {
  getFerryPiers,
  getFerryTimetables,
  getFerryTimetablesByPier,
  getFerryWorkingDays,
} from "../api/ferry.js";

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";

export function registerFerryTools(server: McpServer) {
  server.tool(
    "get-ferry-timetables",
    "Fetch ferry timetables for given departure, arrival, day type, and detail.",
    {
      kalkis: z.string().describe("Departure pier ID/name."),
      varis: z.string().describe("Arrival pier ID/name."),
      gunTipi: z.string().describe("Day type (e.g. weekday, weekend, holiday)."),
      detay: z.string().describe("Detail parameter (e.g. 0 or 1)."),
    },
    async ({ kalkis, varis, gunTipi, detay }: { kalkis: string; varis: string; gunTipi: string; detay: string }) => {
      const result = await getFerryTimetables(kalkis, varis, gunTipi, detay);
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
    "get-ferry-timetables-by-pier",
    "Fetch ferry timetables for a specific pier and day.",
    {
      iskeleId: z.string().describe("Pier (iskele) ID."),
      gunId: z.string().describe("Day ID (e.g. 1 for weekday, 2 for weekend, etc.)."),
    },
    async ({ iskeleId, gunId }: { iskeleId: string; gunId: string }) => {
      const result = await getFerryTimetablesByPier(iskeleId, gunId);
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
    "get-ferry-working-days",
    "Fetch ferry working days.",
    {},
    async () => {
      const result = await getFerryWorkingDays();
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
    "get-ferry-piers",
    "Fetch ferry and car ferry pier information.",
    {},
    async () => {
      const result = await getFerryPiers();
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