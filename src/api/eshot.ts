import { baseApi, ckanApi } from "../http.js";

import config from "../config.js";

const getEshotStations = async (query?: string, limit?: number) => {
  const response = await ckanApi.get("/datastore_search", {
    params: {
      q: query,
      resource_id: config.eshotDurakResourceId,
      limit: limit,
    },
  });
  return response.data;
};

const getEshotLines = async (query?: string, limit?: number) => {
  const response = await ckanApi.get("/datastore_search", {
    params: {
      q: query,
      resource_id: config.eshotHatResourceId,
      limit: limit,
    },
  });
  return response.data;
};

const getLineBusLocations = async (lineId: string) => {
  const response = await baseApi.get(`/iztek/hatotobuskonumlari/${lineId}`);
  return response.data;
};

const getStationNearestBus = async (stationId: string) => {
  const response = await baseApi.get(
    `/iztek/duragayaklasanotobusler/${stationId}`
  );
  return response.data;
};

const getNearestLineBusByStation = async (
  lineId: string,
  stationId: string
) => {
  const response = await baseApi.get(
    `/iztek/istasyonhatotobuskonumlari/${lineId}/${stationId}`
  );
  return response.data;
};

const getNearbyStationsByCoords = async (
  x: number,
  y: number,
  inCoordSys: string = "EPSG:4326",
  outCoordSys: string = "EPSG:4326"
) => {
  const response = await baseApi.get("/ibb/cbs/noktayayakinduraklar", {
    params: {
      x,
      y,
      inCoordSys,
      outCoordSys,
    },
  });
  return response.data;
};

export {
  getEshotStations,
  getEshotLines,
  getLineBusLocations,
  getStationNearestBus,
  getNearestLineBusByStation,
  getNearbyStationsByCoords,
};

