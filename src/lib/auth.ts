import api from "./api";

export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
  photoURL: string;
}

export async function loginUser(payload: LoginPayload) {
  const res = await api.post("/auth/login", payload);
  return res.data;
}

export async function registerUser(payload: RegisterPayload) {
  const res = await api.post("/auth/register", payload);
  return res.data;
}

export async function googleLogin(token: string) {
  const res = await api.post("/auth/google", { token });
  return res.data;
}

export function validatePassword(password: string): string | null {
  if (password.length < 6) return "Password must be at least 6 characters.";
  if (!/[A-Z]/.test(password)) return "Password must contain at least one uppercase letter.";
  if (!/[a-z]/.test(password)) return "Password must contain at least one lowercase letter.";
  return null;
}
