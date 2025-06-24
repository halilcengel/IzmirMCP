import { baseApi } from "../http.js";

const getTramLines = async () => {
  const response = await baseApi.get("/tramvay/hatlar");
  return response.data;
};

const getTramStationsBySeferId = async (seferId: string) => {
  const response = await baseApi.get(`/tramvay/istasyonlar/${seferId}`);
  return response.data;
};

const getTramSeferFrequencyBySeferId = async (seferId: string) => {
  const response = await baseApi.get(`/tramvay/seferler/${seferId}`);
  return response.data;
};

export { getTramLines, getTramStationsBySeferId, getTramSeferFrequencyBySeferId }; 