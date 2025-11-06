import axios from "axios";
import { jwtDecode } from "jwt-decode";
interface JwtPayload {
    exp: number;
    iat: number;
    jti: string;
    user_id: number;
    username?: string;
    email?: string;
  }

const api = axios.create({
  baseURL: "http://127.0.0.1:8000/api",
});

api.interceptors.request.use(async (config) => {
  let access = localStorage.getItem("access");
  const refresh = localStorage.getItem("refresh");

  if (access) {
    const decoded: JwtPayload = jwtDecode(access);
    const now = Date.now() / 1000;

    // If token expires in < 1 minute
    if (decoded.exp - now < 60) {
      try {
        const res = await axios.post("http://127.0.0.1:8000/api/token/refresh/", {
          refresh,
        });
        access = res.data.access;
        localStorage.setItem("access", access || ""); ;
      } catch (err) {
        console.error("Token refresh failed", err);
        localStorage.removeItem("access");
        localStorage.removeItem("refresh");
        // Optionally redirect to login
      }
    }

    config.headers.Authorization = `Bearer ${access}`;
  }

  return config;
});

export default api;