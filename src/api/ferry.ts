import { baseApi } from "../http.js";
import { ApiError } from "../types.js";

/**
 * Get ferry timetables between two piers
 * @param kalkis - Departure pier ID
 * @param varis - Arrival pier ID
 * @param gunTipi - Day type (weekday, weekend, etc.)
 * @param detay - Detail level for the schedule
 * @returns Ferry timetable information
 */
const getFerryTimetables = async (
  kalkis: string,
  varis: string,
  gunTipi: string,
  detay: string
): Promise<unknown> => {
  try {
    if (!kalkis || kalkis.trim() === "") {
      throw new ApiError("Departure pier (kalkis) is required");
    }
    if (!varis || varis.trim() === "") {
      throw new ApiError("Arrival pier (varis) is required");
    }
    const response = await baseApi.get(
      `/izdeniz/vapursaatleri/${kalkis}/${varis}/${gunTipi}/${detay}`
    );
    return response.data;
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    throw new ApiError(
      `Failed to fetch ferry timetables from ${kalkis} to ${varis}`,
      undefined,
      error
    );
  }
};

/**
 * Get ferry timetables for a specific pier
 * @param iskeleId - Pier ID
 * @param gunId - Day ID
 * @returns Ferry schedules departing from the specified pier
 */
const getFerryTimetablesByPier = async (
  iskeleId: string,
  gunId: string
): Promise<unknown> => {
  try {
    if (!iskeleId || iskeleId.trim() === "") {
      throw new ApiError("Pier ID (iskeleId) is required");
    }
    if (!gunId || gunId.trim() === "") {
      throw new ApiError("Day ID (gunId) is required");
    }
    const response = await baseApi.get(
      `/izdeniz/iskelesefersaatleri/${iskeleId}/${gunId}`
    );
    return response.data;
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    throw new ApiError(
      `Failed to fetch ferry timetables for pier ${iskeleId}`,
      undefined,
      error
    );
  }
};

/**
 * Get ferry service working days
 * @returns List of working days with IDs
 */
const getFerryWorkingDays = async (): Promise<unknown> => {
  try {
    const response = await baseApi.get("/izdeniz/gunler");
    return response.data;
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    throw new ApiError("Failed to fetch ferry working days", undefined, error);
  }
};

/**
 * Get all ferry piers
 * @returns List of ferry piers with location information
 */
const getFerryPiers = async (): Promise<unknown> => {
  try {
    const response = await baseApi.get("/izdeniz/iskeleler");
    return response.data;
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    throw new ApiError("Failed to fetch ferry piers", undefined, error);
  }
};

export {
  getFerryTimetables,
  getFerryTimetablesByPier,
  getFerryWorkingDays,
  getFerryPiers,
}; 