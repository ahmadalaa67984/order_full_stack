// src/services/authService.js

import api from "./api"; // Import the Axios instance

export const authService = {
  async register(credentials) {
    return await api.post("api/auth/register", credentials); // Replace with your register API endpoint
  },
  async login(credentials) {
    console.log(credentials);

    return await api.post("api/auth/login", credentials); // Replace with your login API endpoint
  },
  async logout() {
    // Handle logout logic if needed, e.g., an API call
    return Promise.resolve(); // Placeholder, as logout might not need an API call
  },
};
