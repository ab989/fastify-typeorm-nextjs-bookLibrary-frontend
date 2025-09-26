import axios from "axios";

const api = axios.create({
  baseURL: process.env.API_URL || 'http://localhost:3001',
  timeout: 10000,
});

// Add a response interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Extract message
    const message =
      error.response?.data?.message ||
      error.message ||
      "An unexpected error occurred";

    // Dispatch a global event
    window.dispatchEvent(new CustomEvent("axios-error", { detail: message }));

    return Promise.reject(error);
  }
);

export default api;