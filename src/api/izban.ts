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

const getIzbanFareTariff = async (BinisIstasyonuId: string, InisIstasyonuId: string, Aktarma: string, httMi: string) => {
  const response = await baseApi.get(`/izban/tutarhesaplama/${BinisIstasyonuId}/${InisIstasyonuId}/${Aktarma}/${httMi}`);
  return response.data;
};

export { getIzbanStations, getIzbanDepartures, getIzbanFareTariff };

