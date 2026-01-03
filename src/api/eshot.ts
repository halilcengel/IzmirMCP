import { baseApi, ckanApi } from "../http.js";
import config from "../config.js";
import { ApiError, CKANResponse, EshotStation, EshotLine } from "../types.js";

/**
 * Get ESHOT bus stations by search query
 * @param query - Optional search string to filter stations
 * @param limit - Optional limit for number of results
 * @returns CKAN response with station records
 */
const getEshotStations = async (
  query?: string,
  limit?: number
): Promise<CKANResponse<EshotStation>> => {
  try {
    const response = await ckanApi.get("/datastore_search", {
      params: {
        q: query,
        resource_id: config.eshotDurakResourceId,
        limit: limit,
      },
    });
    return response.data;
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    throw new ApiError("Failed to fetch ESHOT stations", undefined, error);
  }
};

/**
 * Get ESHOT bus lines by search query
 * @param query - Optional search string to filter lines
 * @param limit - Optional limit for number of results
 * @returns CKAN response with line records
 */
const getEshotLines = async (
  query?: string,
  limit?: number
): Promise<CKANResponse<EshotLine>> => {
  try {
    const response = await ckanApi.get("/datastore_search", {
      params: {
        q: query,
        resource_id: config.eshotHatResourceId,
        limit: limit,
      },
    });
    return response.data;
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    throw new ApiError("Failed to fetch ESHOT lines", undefined, error);
  }
};

/**
 * Get real-time locations of all buses on a specific line
 * @param lineId - The bus line number (e.g., "551", "35G")
 * @returns Array of bus locations with GPS coordinates
 */
const getLineBusLocations = async (lineId: string): Promise<unknown> => {
  try {
    if (!lineId || lineId.trim() === "") {
      throw new ApiError("Line ID is required");
    }
    const response = await baseApi.get(`/iztek/hatotobuskonumlari/${lineId}`);
    return response.data;
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    throw new ApiError(
      `Failed to fetch bus locations for line ${lineId}`,
      undefined,
      error
    );
  }
};

/**
 * Get buses approaching a specific station
 * @param stationId - The station/stop ID
 * @returns Array of approaching buses with arrival estimates
 */
const getStationNearestBus = async (stationId: string): Promise<unknown> => {
  try {
    if (!stationId || stationId.trim() === "") {
      throw new ApiError("Station ID is required");
    }
    const response = await baseApi.get(
      `/iztek/duragayaklasanotobusler/${stationId}`
    );
    return response.data;
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    throw new ApiError(
      `Failed to fetch approaching buses for station ${stationId}`,
      undefined,
      error
    );
  }
};

/**
 * Get buses of a specific line approaching a specific station
 * @param lineId - The bus line number
 * @param stationId - The station/stop ID
 * @returns Array of buses on this line approaching the station
 */
const getNearestLineBusByStation = async (
  lineId: string,
  stationId: string
): Promise<unknown> => {
  try {
    if (!lineId || lineId.trim() === "") {
      throw new ApiError("Line ID is required");
    }
    if (!stationId || stationId.trim() === "") {
      throw new ApiError("Station ID is required");
    }
    const response = await baseApi.get(
      `/iztek/istasyonhatotobuskonumlari/${lineId}/${stationId}`
    );
    return response.data;
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    throw new ApiError(
      `Failed to fetch buses for line ${lineId} at station ${stationId}`,
      undefined,
      error
    );
  }
};

/**
 * Get nearby ESHOT stations by geographic coordinates
 * @param x - Longitude coordinate
 * @param y - Latitude coordinate
 * @param inCoordSys - Input coordinate system (default: EPSG:4326)
 * @param outCoordSys - Output coordinate system (default: EPSG:4326)
 * @returns Array of nearby stations
 */
const getNearbyStationsByCoords = async (
  x: number,
  y: number,
  inCoordSys: string = "EPSG:4326",
  outCoordSys: string = "EPSG:4326"
): Promise<unknown> => {
  try {
    // Validate coordinates for EPSG:4326 (WGS84)
    if (inCoordSys === "EPSG:4326") {
      if (x < -180 || x > 180) {
        throw new ApiError("Longitude must be between -180 and 180");
      }
      if (y < -90 || y > 90) {
        throw new ApiError("Latitude must be between -90 and 90");
      }
    }

    const response = await baseApi.get("/ibb/cbs/noktayayakinduraklar", {
      params: {
        x,
        y,
        inCoordSys,
        outCoordSys,
      },
    });
    return response.data;
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    throw new ApiError(
      `Failed to fetch nearby stations for coordinates (${x}, ${y})`,
      undefined,
      error
    );
  }
};

export {
  getEshotStations,
  getEshotLines,
  getLineBusLocations,
  getStationNearestBus,
  getNearestLineBusByStation,
  getNearbyStationsByCoords,
};

