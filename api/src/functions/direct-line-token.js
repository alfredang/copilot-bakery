const { app } = require("@azure/functions");

const DIRECT_LINE_TOKEN_URL =
  "https://directline.botframework.com/v3/directline/tokens/generate";
const DEFAULT_ORIGINS = [
  "http://localhost:8000",
  "https://alfredang.github.io",
];

function allowedOrigins() {
  return new Set(
    (process.env.ALLOWED_ORIGINS || DEFAULT_ORIGINS.join(","))
      .split(",")
      .map((origin) => origin.trim().replace(/\/$/, ""))
      .filter(Boolean)
  );
}

function corsHeaders(origin) {
  return {
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Origin": origin,
    "Cache-Control": "no-store",
    Vary: "Origin",
  };
}

async function directLineToken(request, context) {
  const origin = (request.headers.get("origin") || "").replace(/\/$/, "");

  if (!origin || !allowedOrigins().has(origin)) {
    return {
      status: 403,
      jsonBody: { error: "Origin not allowed." },
      headers: { "Cache-Control": "no-store", Vary: "Origin" },
    };
  }

  if (request.method === "OPTIONS") {
    return { status: 204, headers: corsHeaders(origin) };
  }

  // `secret` is accepted temporarily for the user's existing local .env file.
  // Production must use the explicit DIRECT_LINE_SECRET application setting.
  const secret = process.env.DIRECT_LINE_SECRET || process.env.secret;
  if (!secret) {
    context.error("DIRECT_LINE_SECRET is not configured.");
    return {
      status: 503,
      jsonBody: { error: "Chat service is not configured." },
      headers: corsHeaders(origin),
    };
  }

  try {
    const response = await fetch(DIRECT_LINE_TOKEN_URL, {
      method: "POST",
      headers: { Authorization: `Bearer ${secret}` },
    });
    const body = await response.json();

    if (!response.ok || !body.token) {
      context.error(`Direct Line token exchange failed with ${response.status}.`);
      return {
        status: 502,
        jsonBody: { error: "Unable to start a chat conversation." },
        headers: corsHeaders(origin),
      };
    }

    return {
      status: 200,
      jsonBody: {
        conversationId: body.conversationId,
        expires_in: body.expires_in,
        token: body.token,
      },
      headers: corsHeaders(origin),
    };
  } catch (error) {
    context.error("Direct Line token exchange failed.", error);
    return {
      status: 502,
      jsonBody: { error: "Unable to start a chat conversation." },
      headers: corsHeaders(origin),
    };
  }
}

app.http("directLineToken", {
  methods: ["POST", "OPTIONS"],
  authLevel: "anonymous",
  route: "directline/token",
  handler: directLineToken,
});

module.exports = { directLineToken };
