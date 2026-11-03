import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "https://social-events-api.onrender.com/api";

const api = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
});

// Attach JWT token from localStorage
api.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    try {
      const userData = localStorage.getItem("community_user");
      if (userData) {
        const user = JSON.parse(userData);
        if (user.token) {
          config.headers.Authorization = `Bearer ${user.token}`;
        }
      }
    } catch {
      // ignore
    }
  }
  return config;
});

export default api;
