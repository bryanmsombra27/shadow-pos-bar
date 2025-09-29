import axios from "axios";

export const shadowPosApi = axios.create({
  baseURL: "http://localhost:3000/api",
});
