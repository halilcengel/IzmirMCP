import { baseApi } from "../http.js";
import { ApiError, IzbanStation, IzbanDeparture, IzbanFareTariff } from "../types.js";

/**
 * Get all İZBAN suburban train stations
 * @returns Array of İZBAN stations with IDs and names
 */
const getIzbanStations = async (): Promise<IzbanStation[]> => {
  try {
    const response = await baseApi.get("/izban/istasyonlar");
    return response.data;
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    throw new ApiError("Failed to fetch İZBAN stations", undefined, error);
  }
};

/**
 * Get scheduled departures between two İZBAN stations
 * @param departureStationId - ID of the departure station
 * @param arrivalStationId - ID of the arrival/destination station
 * @returns Array of departure times and journey information
 */
const getIzbanDepartures = async (
  departureStationId: string,
  arrivalStationId: string
): Promise<IzbanDeparture[]> => {
  try {
    if (!departureStationId || departureStationId.trim() === "") {
      throw new ApiError("Departure station ID is required");
    }
    if (!arrivalStationId || arrivalStationId.trim() === "") {
      throw new ApiError("Arrival station ID is required");
    }

    const response = await baseApi.get(
      `/izban/sefersaatleri/${departureStationId}/${arrivalStationId}`
    );
    return response.data;
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    throw new ApiError(
      `Failed to fetch departures from ${departureStationId} to ${arrivalStationId}`,
      undefined,
      error
    );
  }
};

/**
 * Calculate İZBAN fare between two stations
 * @param BinisIstasyonuId - Boarding/departure station ID
 * @param InisIstasyonuId - Alighting/arrival station ID
 * @param Aktarma - Transfer indicator: "0" for no transfer, "1" for transfer
 * @param httMi - HTT (Halk Taşıma Taşıtı) card indicator: "0" for no, "1" for yes
 * @returns Fare tariff information including price and distance
 */
const getIzbanFareTariff = async (
  BinisIstasyonuId: string,
  InisIstasyonuId: string,
  Aktarma: string,
  httMi: string
): Promise<IzbanFareTariff> => {
  try {
    if (!BinisIstasyonuId || BinisIstasyonuId.trim() === "") {
      throw new ApiError("Boarding station ID is required");
    }
    if (!InisIstasyonuId || InisIstasyonuId.trim() === "") {
      throw new ApiError("Alighting station ID is required");
    }
    if (!["0", "1"].includes(Aktarma)) {
      throw new ApiError("Aktarma must be '0' (no transfer) or '1' (transfer)");
    }
    if (!["0", "1"].includes(httMi)) {
      throw new ApiError("httMi must be '0' (no HTT card) or '1' (with HTT card)");
    }

    const response = await baseApi.get(
      `/izban/tutarhesaplama/${BinisIstasyonuId}/${InisIstasyonuId}/${Aktarma}/${httMi}`
    );
    return response.data;
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    throw new ApiError(
      `Failed to calculate fare from ${BinisIstasyonuId} to ${InisIstasyonuId}`,
      undefined,
      error
    );
  }
};

export { getIzbanStations, getIzbanDepartures, getIzbanFareTariff };

