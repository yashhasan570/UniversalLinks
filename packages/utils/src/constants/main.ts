export const SHORT_DOMAIN = "universallinks.sh";

export const API_HOSTNAMES = new Set([
  "api.universallinks.co",
  "api-staging.universallinks.co",
  `api.${SHORT_DOMAIN}`,
  "api.localhost:8888",
  "api.localhost",
]);

export const API_DOMAIN =
  process.env.NEXT_PUBLIC_VERCEL_ENV === "production"
    ? "https://api.universallinks.co"
    : process.env.NEXT_PUBLIC_VERCEL_ENV === "preview"
      ? "https://api-staging.universallinks.co"
      : "http://api.localhost:8888";

export const APP_DOMAIN =
  process.env.NEXT_PUBLIC_VERCEL_ENV === "production"
    ? "https://app.universallinks.co"
    : process.env.NEXT_PUBLIC_VERCEL_ENV === "preview"
      ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL || "preview.universallinks.co"}`
      : "http://localhost:8888";

export const APP_DOMAIN_WITH_NGROK =
  process.env.NEXT_PUBLIC_VERCEL_ENV === "production"
    ? "https://app.universallinks.co"
    : process.env.NEXT_PUBLIC_VERCEL_ENV === "preview"
      ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL || "preview.universallinks.co"}`
      : process.env.NEXT_PUBLIC_NGROK_URL || "http://localhost:8888";

export const isAppHostname = (hostname: string) => {
  if (process.env.NEXT_PUBLIC_VERCEL_ENV === "preview") {
    // pattern of our preview URLs are always "universallinks-<random-string>.universallinks.co"
    return hostname.startsWith("universallinks-") && hostname.endsWith(".universallinks.co");
  }
  return new Set(["app.universallinks.co", "localhost:8888", "localhost"]).has(hostname);
};

export const UNIVERSALLINKS_LOGO = "https://assets.universallinks.co/logo.png";
export const UNIVERSALLINKS_LOGO_SQUARE = "https://assets.universallinks.co/logo-square.png";
export const UNIVERSALLINKS_QR_LOGO = "https://assets.universallinks.co/logo.png";
export const UNIVERSALLINKS_WORDMARK = "https://assets.universallinks.co/wordmark.png";
export const UNIVERSALLINKS_THUMBNAIL = "https://assets.universallinks.co/thumbnail.jpg";

export const UNIVERSALLINKS_WORKSPACE_ID = "cl7pj5kq4006835rbjlt2ofka";
export const ACME_WORKSPACE_ID = "clrei1gld0002vs9mzn93p8ik";
export const LEGAL_WORKSPACE_ID = "clrflia0j0000vs7sqfhz9c7q";
export const LEGAL_USER_ID = "clqei1lgc0000vsnzi01pbf47";

export const R2_URL = process.env.STORAGE_BASE_URL || "https://dubassets.com";
