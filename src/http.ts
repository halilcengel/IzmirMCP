import axios, { AxiosError, AxiosInstance } from "axios";
import config from "./config.js";
import { ApiError } from "./types.js";

// Create axios instance with timeout and retry configuration
const createApiClient = (baseURL: string): AxiosInstance => {
  const client = axios.create({
    baseURL,
    timeout: config.httpTimeout,
    headers: {
      "Content-Type": "application/json",
    },
  });

  // Request interceptor for logging
  client.interceptors.request.use(
    (config) => {
      console.error(`[HTTP] ${config.method?.toUpperCase()} ${config.url}`);
      return config;
    },
    (error) => {
      console.error("[HTTP] Request error:", error.message);
      return Promise.reject(error);
    }
  );

  // Response interceptor for error handling
  client.interceptors.response.use(
    (response) => {
      return response;
    },
    async (error: AxiosError) => {
      const originalRequest = error.config;

      // Handle timeout errors
      if (error.code === "ECONNABORTED") {
        throw new ApiError(
          `Request timeout after ${config.httpTimeout}ms`,
          408,
          error
        );
      }

      // Handle network errors
      if (!error.response) {
        throw new ApiError(
          "Network error - unable to reach the server",
          0,
          error
        );
      }

      // Handle HTTP errors
      const status = error.response.status;
      let message = "An error occurred while fetching data";

      if (status === 404) {
        message = "Resource not found";
      } else if (status === 429) {
        message = "Rate limit exceeded - too many requests";
      } else if (status >= 500) {
        message = "Server error - please try again later";
      } else if (status === 401 || status === 403) {
        message = "Authentication or authorization failed";
      }

      throw new ApiError(message, status, error);
    }
  );

  return client;
};

const baseApi = createApiClient(config.baseUrl);
const ckanApi = createApiClient(config.CKANBaseUrl);

export { baseApi, ckanApi };

