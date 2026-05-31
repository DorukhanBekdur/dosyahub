import bcrypt from "bcryptjs";
import {
  createUser,
  getUserByEmail,
} from "../db/usersStore.js";
import { signUserToken } from "../lib/jwt.js";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function publicUser(row) {
  return {
    id: row.id,
    email: row.email,
    name: row.name,
  };
}

export function register(req, res) {
  const name = String(req.body?.name || "").trim();
  const emailRaw = String(req.body?.email || "").trim().toLowerCase();
  const password = req.body?.password;

  if (!name || name.length > 120) {
    return res.status(400).json({ error: "Geçerli bir ad soyad girin." });
  }
  if (!emailRaw || !EMAIL_RE.test(emailRaw)) {
    return res.status(400).json({ error: "Geçerli bir e-posta girin." });
  }
  if (typeof password !== "string" || password.length < 8) {
    return res.status(400).json({ error: "Şifre en az 8 karakter olmalıdır." });
  }
  if (password.length > 128) {
    return res.status(400).json({ error: "Şifre en fazla 128 karakter olabilir." });
  }

  const passwordHash = bcrypt.hashSync(password, 12);

  try {
    const user = createUser({
      email: emailRaw,
      passwordHash,
      name,
    });
    const token = signUserToken(user.id, user.email);
    return res.status(201).json({ token, user: publicUser(user) });
  } catch (e) {
    if (e?.code === "DUPLICATE_EMAIL") {
      return res
        .status(409)
        .json({ error: "Bu e-posta adresi ile zaten kayıt var." });
    }
    console.error("register error:", e);
    return res.status(500).json({ error: "Kayıt sırasında sunucu hatası." });
  }
}

export function login(req, res) {
  const emailRaw = String(req.body?.email || "").trim().toLowerCase();
  const password = req.body?.password;

  if (!emailRaw || !EMAIL_RE.test(emailRaw)) {
    return res.status(400).json({ error: "Geçerli bir e-posta girin." });
  }
  if (typeof password !== "string" || !password.length) {
    return res.status(400).json({ error: "Şifre zorunludur." });
  }

  const user = getUserByEmail(emailRaw);
  const ok = user && bcrypt.compareSync(password, user.password_hash);
  if (!ok) {
    return res.status(401).json({ error: "E-posta veya şifre hatalı." });
  }

  const token = signUserToken(user.id, user.email);
  return res.json({
    token,
    user: publicUser(user),
  });
}

export function me(req, res) {
  return res.json({ user: publicUser(req.user) });
}
