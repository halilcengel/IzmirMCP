import { baseApi } from "../http.js";
import { ApiError } from "../types.js";

/**
 * Get all tram lines in Izmir
 * @returns Array of tram lines with route information
 */
const getTramLines = async (): Promise<unknown> => {
  try {
    const response = await baseApi.get("/tramvay/hatlar");
    return response.data;
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    throw new ApiError("Failed to fetch tram lines", undefined, error);
  }
};

/**
 * Get tram stations for a specific service/route
 * @param seferId - Service/route ID
 * @returns Array of stations for the specified tram service
 */
const getTramStationsBySeferId = async (seferId: string): Promise<unknown> => {
  try {
    if (!seferId || seferId.trim() === "") {
      throw new ApiError("Service ID (seferId) is required");
    }
    const response = await baseApi.get(`/tramvay/istasyonlar/${seferId}`);
    return response.data;
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    throw new ApiError(
      `Failed to fetch tram stations for service ${seferId}`,
      undefined,
      error
    );
  }
};

/**
 * Get tram service frequency/schedule for a specific route
 * @param seferId - Service/route ID
 * @returns Service frequency information for the specified tram route
 */
const getTramSeferFrequencyBySeferId = async (seferId: string): Promise<unknown> => {
  try {
    if (!seferId || seferId.trim() === "") {
      throw new ApiError("Service ID (seferId) is required");
    }
    const response = await baseApi.get(`/tramvay/seferler/${seferId}`);
    return response.data;
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    throw new ApiError(
      `Failed to fetch tram frequencies for service ${seferId}`,
      undefined,
      error
    );
  }
};

export { getTramLines, getTramStationsBySeferId, getTramSeferFrequencyBySeferId }; 