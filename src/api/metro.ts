import { baseApi } from "../http.js";

const getMetroStations = async () => {
  const response = await baseApi.get("/metro/istasyonlar");
  return response.data;
};

const getMetroSeferFrequencies = async () => {
  const response = await baseApi.get("/metro/sefersaatleri");
  return response.data;
};

export { getMetroStations, getMetroSeferFrequencies }; 