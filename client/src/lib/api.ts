import axios, { AxiosError } from "axios";

/**
 * Access token lives only in memory (never localStorage — XSS-safe).
 * The refresh token is an httpOnly cookie the browser sends automatically
 * to /api/auth/refresh.
 */
let accessToken: string | null = null;
export const setAccessToken = (t: string | null) => (accessToken = t);
export const getAccessToken = () => accessToken;

export const api = axios.create({
  baseURL: "/api",
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  if (accessToken) config.headers.Authorization = `Bearer ${accessToken}`;
  return config;
});

let refreshPromise: Promise<string | null> | null = null;

async function refreshAccessToken(): Promise<string | null> {
  try {
    const { data } = await axios.post(
      "/api/auth/refresh",
      {},
      { withCredentials: true }
    );
    setAccessToken(data.accessToken);
    return data.accessToken as string;
  } catch {
    setAccessToken(null);
    return null;
  }
}

// On a 401, try one silent refresh, then replay the original request.
api.interceptors.response.use(
  (res) => res,
  async (error: AxiosError) => {
    const original = error.config as typeof error.config & { _retried?: boolean };
    if (error.response?.status === 401 && original && !original._retried) {
      original._retried = true;
      refreshPromise ??= refreshAccessToken().finally(() => (refreshPromise = null));
      const token = await refreshPromise;
      if (token) {
        original.headers = original.headers ?? {};
        original.headers.Authorization = `Bearer ${token}`;
        return api(original);
      }
    }
    return Promise.reject(error);
  }
);

export interface ApiFieldErrors {
  [field: string]: string[];
}

/** Pulls a friendly message (and field errors) out of an Axios error. */
export function parseApiError(err: unknown): {
  message: string;
  code?: string;
  fields?: ApiFieldErrors;
} {
  if (axios.isAxiosError(err) && err.response?.data) {
    const d = err.response.data as {
      error?: string;
      code?: string;
      fields?: ApiFieldErrors;
    };
    return {
      message: d.error ?? "Something went wrong",
      code: d.code,
      fields: d.fields,
    };
  }
  return { message: "Can't reach the server. Check your connection." };
}
