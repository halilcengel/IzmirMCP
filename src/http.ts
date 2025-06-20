import axios from "axios";
import config from "./config.js";

const baseApi = axios.create({
  baseURL: config.baseUrl,
});

const ckanApi = axios.create({
  baseURL: config.CKANBaseUrl,
});

export { baseApi, ckanApi };

