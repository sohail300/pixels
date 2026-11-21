// The backend runs on Render's free tier, which sleeps when idle and can take close
// to a minute to wake up, so the first request after a quiet period is slow.
const DEFAULT_TIMEOUT_MS = 60000;

/**
 * JSON headers, plus the bearer token when signed in. Public list endpoints still
 * need the token: the server uses it to personalize suggestions and set `has_liked`.
 */
export function apiHeaders(accessToken?: string | null): Record<string, string> {
  const headers: Record<string, string> = {
    Accept: "application/json",
    "Content-Type": "application/json",
  };
  if (accessToken) {
    headers.Authorization = `Bearer ${accessToken}`;
  }
  return headers;
}

/**
 * `fetch` with a timeout. React Native's fetch has no timeout of its own, so an
 * unreachable backend can leave a request (and the loading UI) hanging for minutes.
 */
export async function fetchWithTimeout(
  url: string,
  init: RequestInit = {},
  timeoutMs: number = DEFAULT_TIMEOUT_MS
): Promise<Response> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);
  try {
    return await fetch(url, { ...init, signal: controller.signal });
  } finally {
    clearTimeout(timeoutId);
  }
}
