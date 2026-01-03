import { baseApi } from "../http.js";
import { ApiError } from "../types.js";

/**
 * Get all metro stations in Izmir
 * @returns Array of metro stations with location and order information
 */
const getMetroStations = async (): Promise<unknown> => {
  try {
    const response = await baseApi.get("/metro/istasyonlar");
    return response.data;
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    throw new ApiError("Failed to fetch metro stations", undefined, error);
  }
};

/**
 * Get metro service frequencies/schedules
 * @returns Metro service frequency information
 */
const getMetroSeferFrequencies = async (): Promise<unknown> => {
  try {
    const response = await baseApi.get("/metro/sefersaatleri");
    return response.data;
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    throw new ApiError("Failed to fetch metro frequencies", undefined, error);
  }
};

export { getMetroStations, getMetroSeferFrequencies }; 