import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dataDir = path.join(__dirname, "../../data");
const usersFile = path.join(dataDir, "users.json");

/** @type {{ id: number, email: string, name: string, password_hash: string, created_at: string }[]} */
let cacheUsers = [];
let cacheNextId = 1;
let loaded = false;

function load() {
  if (loaded) return;
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
  if (!fs.existsSync(usersFile)) {
    cacheUsers = [];
    cacheNextId = 1;
    loaded = true;
    persist();
    return;
  }
  try {
    const raw = fs.readFileSync(usersFile, "utf8");
    const data = JSON.parse(raw);
    cacheUsers = Array.isArray(data.users) ? data.users : [];
    cacheNextId =
      typeof data.nextId === "number" && data.nextId > 0
        ? data.nextId
        : Math.max(0, ...cacheUsers.map((u) => u.id)) + 1;
  } catch {
    cacheUsers = [];
    cacheNextId = 1;
  }
  loaded = true;
}

function persist() {
  fs.mkdirSync(dataDir, { recursive: true });
  const tmp = `${usersFile}.${process.pid}.tmp`;
  fs.writeFileSync(
    tmp,
    JSON.stringify({ users: cacheUsers, nextId: cacheNextId }),
    "utf8"
  );
  fs.renameSync(tmp, usersFile);
}

export function getUserByEmail(email) {
  load();
  const e = String(email).toLowerCase();
  return cacheUsers.find((u) => u.email.toLowerCase() === e) ?? null;
}

export function getUserById(id) {
  load();
  return cacheUsers.find((u) => u.id === id) ?? null;
}

/**
 * @returns {{ id: number, email: string, name: string }}
 */
export function createUser({ email, passwordHash, name }) {
  load();
  const emailNorm = String(email).trim().toLowerCase();
  if (getUserByEmail(emailNorm)) {
    const err = new Error("DUPLICATE_EMAIL");
    err.code = "DUPLICATE_EMAIL";
    throw err;
  }
  const row = {
    id: cacheNextId++,
    email: emailNorm,
    name: String(name).trim(),
    password_hash: passwordHash,
    created_at: new Date().toISOString(),
  };
  cacheUsers.push(row);
  persist();
  return { id: row.id, email: row.email, name: row.name };
}
