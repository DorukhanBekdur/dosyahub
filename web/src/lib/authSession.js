export const SESSION_KEY = "dosyahub_session";

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

/**
 * @param {Record<string, unknown>} payload
 * @param {{ persistent?: boolean }} [options] persistent=true → tarayıcı kapanınca da hatırla (localStorage)
 */
export function setSession(payload, { persistent = true } = {}) {
  const raw = JSON.stringify(payload);
  if (persistent) {
    localStorage.setItem(SESSION_KEY, raw);
    sessionStorage.setItem(SESSION_KEY, raw);
  } else {
    localStorage.removeItem(SESSION_KEY);
    sessionStorage.setItem(SESSION_KEY, raw);
  }
}

export function clearSession() {
  sessionStorage.removeItem(SESSION_KEY);
  localStorage.removeItem(SESSION_KEY);
}
