import axios from "axios";

// const BASE_URL= "http://localhost:8000";
const BASE_URL = "https://pixels-yquv.onrender.com";

export const api = axios.create({
  baseURL: BASE_URL,
});
