export const SESSION_KEY = "dosyahub_session";

/**
 * @typedef {{ id: number, email: string, name: string }} AuthUser
 * @typedef {{ token: string, user: AuthUser, at?: number }} AuthSession
 */

export function getSession() {
  try {
    const fromTab = sessionStorage.getItem(SESSION_KEY);
    if (fromTab) return JSON.parse(fromTab);
    const persisted = localStorage.getItem(SESSION_KEY);
    return persisted ? JSON.parse(persisted) : null;
  } catch {
    return null;
  }
}

export function getToken() {
  const s = getSession();
  return typeof s?.token === "string" ? s.token : null;
}

/** Sunucu oturumu: JWT + kullanıcı özeti */
export function hasValidAuthSession(s) {
  return !!(
    s &&
    typeof s.token === "string" &&
    s.user &&
    typeof s.user.id === "number" &&
    typeof s.user.email === "string"
  );
}

/**
 * @param {AuthSession} payload
 * @param {{ persistent?: boolean }} [options] persistent=true → localStorage + sessionStorage
 */
function notifyAuthChanged() {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event("dosyahub-auth-changed"));
  }
}

export function setSession(payload, { persistent = true } = {}) {
  const raw = JSON.stringify({ ...payload, at: payload.at ?? Date.now() });
  if (persistent) {
    localStorage.setItem(SESSION_KEY, raw);
    sessionStorage.setItem(SESSION_KEY, raw);
  } else {
    localStorage.removeItem(SESSION_KEY);
    sessionStorage.setItem(SESSION_KEY, raw);
  }
  notifyAuthChanged();
}

export function clearSession() {
  sessionStorage.removeItem(SESSION_KEY);
  localStorage.removeItem(SESSION_KEY);
  notifyAuthChanged();
}
