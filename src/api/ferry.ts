import { baseApi } from "../http.js";

const getFerryTimetables = async (kalkis: string, varis: string, gunTipi: string, detay: string) => {
  const response = await baseApi.get(`/izdeniz/vapursaatleri/${kalkis}/${varis}/${gunTipi}/${detay}`);
  return response.data;
};

const getFerryTimetablesByPier = async (iskeleId: string, gunId: string) => {
  const response = await baseApi.get(`/izdeniz/iskelesefersaatleri/${iskeleId}/${gunId}`);
  return response.data;
};

const getFerryWorkingDays = async () => {
  const response = await baseApi.get("/izdeniz/gunler");
  return response.data;
};

const getFerryPiers = async () => {
  const response = await baseApi.get("/izdeniz/iskeleler");
  return response.data;
};

export {
  getFerryTimetables,
  getFerryTimetablesByPier,
  getFerryWorkingDays,
  getFerryPiers,
}; 