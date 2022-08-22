export const API_URL =
  process.env.NODE_ENV !== "production"
    ? "http://localhost:5000/api"
    : "https://warm-atoll-68707.herokuapp.com/api";
