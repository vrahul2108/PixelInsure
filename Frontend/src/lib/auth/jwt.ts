export interface JWTPayload {
  id: string;
  role: "SUPER_ADMIN" | "ADMIN" | "CUSTOMER";
  iat: number;
  exp: number;
}

export function decodeToken(token: string): JWTPayload | null {
  try {
    const payload = token.split(".")[1];
    if (!payload) return null;
    const decoded = JSON.parse(atob(payload));
    return decoded as JWTPayload;
  } catch {
    return null;
  }
}

export function isTokenExpired(token: string): boolean {
  const payload = decodeToken(token);
  if (!payload) return true;
  return Date.now() >= payload.exp * 1000;
}

export function getUserRole(): "SUPER_ADMIN" | "ADMIN" | "CUSTOMER" | null {
  if (typeof window === "undefined") return null;
  const token = localStorage.getItem("accessToken");
  if (!token) return null;
  const payload = decodeToken(token);
  return payload?.role || null;
}

export function getUserId(): string | null {
  if (typeof window === "undefined") return null;
  const token = localStorage.getItem("accessToken");
  if (!token) return null;
  const payload = decodeToken(token);
  return payload?.id || null;
}
