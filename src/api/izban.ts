import { baseApi } from "../http.js";

const getIzbanStations = async () => {
  const response = await baseApi.get("/izban/istasyonlar");
  return response.data;
};

const getIzbanDepartures = async (
  departureStationId: string,
  arrivalStationId: string
) => {
  const response = await baseApi.get(
    `izban/sefersaatleri/${departureStationId}/${arrivalStationId}`
  );
  return response.data;
};

export { getIzbanStations, getIzbanDepartures };

