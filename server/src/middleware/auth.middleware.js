import { verifyUserToken } from "../lib/jwt.js";
import { getUserById } from "../db/usersStore.js";

export function requireAuth(req, res, next) {
  const header = req.headers.authorization || "";
  const m = header.match(/^Bearer\s+(.+)$/i);
  if (!m) {
    return res.status(401).json({ error: "Oturum gerekli." });
  }
  try {
    const payload = verifyUserToken(m[1].trim());
    const user = getUserById(Number(payload.sub));
    if (!user) {
      return res.status(401).json({ error: "Oturum geçersiz." });
    }
    req.user = {
      id: user.id,
      email: user.email,
      name: user.name,
      createdAt: user.created_at,
    };
    next();
  } catch {
    return res.status(401).json({ error: "Oturum süresi doldu veya geçersiz." });
  }
}
