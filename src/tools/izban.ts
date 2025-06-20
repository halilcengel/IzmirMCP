import { getIzbanDepartures, getIzbanStations } from "../api/izban.js";

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import z from "zod";

export function registerIzbanTools(server: McpServer) {
  server.tool(
    "get-izban-stations",
    "Retrieve the full list of İZBAN stations with IDs and names",
    {},
    async () => {
      const stations = await getIzbanStations();
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
    "get-izban-departures",
    "Get scheduled departures from one İZBAN station to another",
    {
      departureStationId: z
        .string()
        .describe(
          "ID of the departure station (e.g. '12345'), as returned by get-izban-stations"
        ),
      arrivalStationId: z
        .string()
        .describe(
          "ID of the arrival station (e.g. '67890'), as returned by get-izban-stations"
        ),
    },
    async ({ departureStationId, arrivalStationId }: { departureStationId: string; arrivalStationId: string }) => {
      const departures = await getIzbanDepartures(
        departureStationId,
        arrivalStationId
      );
      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(departures, null, 2),
          },
        ],
      };
    }
  );
} 