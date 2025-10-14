import axios from "axios";

export const shadowPosApi = axios.create({
  baseURL: "http://localhost:3000/api",
});

// interceptores
shadowPosApi.interceptors.request.use((config) => {
  const auth = localStorage.getItem("auth")
    ? JSON.parse(localStorage.getItem("auth")!)
    : "";

  if (auth) {
    const token = auth.state.token;

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }

  return config;
});
