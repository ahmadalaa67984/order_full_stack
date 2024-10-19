// src/services/api.js

import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8800/", // replace with your base API URL
  timeout: 5000, // optional timeout
});

// Add a request interceptor (e.g., to add token)
api.interceptors.request.use(
  (config) => {
    // Optionally add authorization token if it exists
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["token"] = `${token}`;
    }
    return config; // Proceed with the request even without a token
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor (e.g., to handle errors globally)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle errors globally, like redirecting on 401
    if (error.response && error.response.status === 401) {
      // Redirect to login or perform logout
      console.log("Unauthorized. Redirecting to login.");
      // Optional: you can trigger a redirect here (if using Vue Router for example)
      //   router.push("/login");
    }
    return Promise.reject(error);
  }
);

export default api;
