/* Public configuration only. Never place the Direct Line secret in this file. */
window.CookBakeCopilotConfig = {
  tokenServiceUrl:
    window.location.hostname === "localhost" ||
    window.location.hostname === "127.0.0.1"
      ? "http://localhost:7071/api/directline/token"
      : "https://copilot-bakery-token-a7f2c9-esa4gsf9hqcscygd.southeastasia-01.azurewebsites.net/api/directline/token",
};
