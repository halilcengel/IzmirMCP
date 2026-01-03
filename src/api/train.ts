import { baseApi } from "../http.js";
import { ApiError } from "../types.js";

/**
 * Get all train stations in Izmir
 * @returns Array of train stations with location information
 */
const getTrainStations = async (): Promise<unknown> => {
  try {
    const response = await baseApi.get("/ibb/cbs/trengarlari");
    return response.data;
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    throw new ApiError("Failed to fetch train stations", undefined, error);
  }
};

export { getTrainStations }; 