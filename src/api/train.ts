import { baseApi } from "../http.js";

const getTrainStations = async () => {
  const response = await baseApi.get("/ibb/cbs/trengarlari");
  return response.data;
};

export { getTrainStations }; 