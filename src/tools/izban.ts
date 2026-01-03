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
    "Calculate the fare/price for an İZBAN suburban train journey between two stations. Factors in transfer status and HTT card usage for accurate pricing.",
    {
      BinisIstasyonuId: z.string().min(1).describe("Boarding/departure station ID (get from get-izban-stations)"),
      InisIstasyonuId: z.string().min(1).describe("Alighting/arrival station ID (get from get-izban-stations)"),
      Aktarma: z.enum(["0", "1"]).describe("Transfer status: '0' for direct journey (no transfer), '1' for journey with transfer"),
      httMi: z.enum(["0", "1"]).describe("HTT card usage: '0' for without HTT (Halk Taşıma Taşıtı) card, '1' for with HTT card (discounted fare)"),
    },
    async ({ BinisIstasyonuId, InisIstasyonuId, Aktarma, httMi }: { BinisIstasyonuId: string; InisIstasyonuId: string; Aktarma: string; httMi: string }) => {
      try {
        const result = await getIzbanFareTariff(BinisIstasyonuId, InisIstasyonuId, Aktarma, httMi);
        return {
          content: [
            {
              type: "text",
              text: JSON.stringify(result, null, 2),
            },
          ],
        };
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : "Unknown error occurred";
        return {
          content: [
            {
              type: "text",
              text: JSON.stringify({ error: errorMessage, success: false }, null, 2),
            },
          ],
          isError: true,
        };
      }
    }
  );
} 