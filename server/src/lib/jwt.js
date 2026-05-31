import jwt from "jsonwebtoken";

const secret = process.env.JWT_SECRET;

export function assertJwtConfigured() {
  if (!secret || secret.length < 16) {
    console.error(
      "[auth] JWT_SECRET tanımlı değil veya çok kısa (en az 16 karakter). server/.env dosyasına ekleyin."
    );
    process.exit(1);
  }
}

export function signUserToken(userId, email) {
  return jwt.sign({ sub: userId, email }, secret, {
    expiresIn: process.env.JWT_EXPIRES_IN || "7d",
  });
}

export function verifyUserToken(token) {
  return jwt.verify(token, secret);
}
