const config = {
  name: process.env.MCP_NAME || "IzmirMCP",
  version: "1.1.0",
  baseUrl: process.env.BASE_URL || "https://openapi.izmir.bel.tr/api",
  CKANBaseUrl: process.env.CKAN_BASE_URL || "https://acikveri.bizizmir.com/api/3/action",
  eshotHatResourceId: process.env.ESHOT_HAT_RESOURCE_ID || "bd6c84f8-49ba-4cf4-81f8-81a0fbb5caa3",
  eshotDurakResourceId: process.env.ESHOT_DURAK_RESOURCE_ID || "0c791266-a2e4-4f14-82b8-9a9b102fbf94",
  httpTimeout: parseInt(process.env.HTTP_TIMEOUT || "10000", 10),
  maxRetries: parseInt(process.env.MAX_RETRIES || "3", 10),
};
export default config;

