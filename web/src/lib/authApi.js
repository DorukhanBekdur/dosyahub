import { getToken } from "./authSession";

function baseUrl() {
  const raw = import.meta.env.VITE_API_URL;
  if (raw) return raw.replace(/\/$/, "");
  return "";
}

function apiUrl(path) {
  const b = baseUrl();
  return b ? `${b}${path}` : path;
}

/**
 * @param {string} path
 * @param {RequestInit} [init]
 */
export async function authFetch(path, init = {}) {
  const headers = new Headers(init.headers);
  if (!headers.has("Content-Type") && init.body) {
    headers.set("Content-Type", "application/json");
  }
  const token = getToken();
  if (token) headers.set("Authorization", `Bearer ${token}`);

  const res = await fetch(apiUrl(path), { ...init, headers });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    const msg =
      typeof data.error === "string" ? data.error : "İstek tamamlanamadı.";
    throw new Error(msg);
  }
  return data;
}

export function loginRequest(email, password) {
  return authFetch("/api/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
}

export function registerRequest(name, email, password) {
  return authFetch("/api/auth/register", {
    method: "POST",
    body: JSON.stringify({ name, email, password }),
  });
}

export function meRequest() {
  return authFetch("/api/auth/me", { method: "GET" });
}
