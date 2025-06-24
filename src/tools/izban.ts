import { getIzbanDepartures, getIzbanFareTariff, getIzbanStations } from "../api/izban.js";

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

  server.tool(
    "get-izban-fare-tariff",
    "Get suburban (İZBAN) fare tariff for a given boarding and alighting station, transfer, and httMi.",
    {
      BinisIstasyonuId: z.string().describe("Boarding station ID."),
      InisIstasyonuId: z.string().describe("Alighting station ID."),
      Aktarma: z.string().describe("Transfer (Aktarma) parameter, e.g. '0' or '1'."),
      httMi: z.string().describe("HTT Mi parameter, e.g. '0' or '1'."),
    },
    async ({ BinisIstasyonuId, InisIstasyonuId, Aktarma, httMi }: { BinisIstasyonuId: string; InisIstasyonuId: string; Aktarma: string; httMi: string }) => {
      const result = await getIzbanFareTariff(BinisIstasyonuId, InisIstasyonuId, Aktarma, httMi);
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