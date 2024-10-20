import { authService } from "../../../services/authService";

export const authModule = {
  namespaced: true,
  state: {
    token: localStorage.getItem("token") || null,
    user: localStorage.getItem("user") || null,
    loginError: null,
    registerError: null,
  },
  mutations: {
    SET_TOKEN(state, token) {
      state.token = token;
      localStorage.setItem("token", token);
    },
    SET_USER(state, user) {
      state.user = user;
      localStorage.setItem("user", user);
    },
    LOGOUT(state) {
      state.token = null;
      state.user = null;
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    },
    SET_LOGIN_ERROR(state, error) {
      state.loginError = error;
    },
    CLEAR_LOGIN_ERROR(state) {
      state.loginError = null;
    },
    SET_REG_ERR(state, error) {
      state.registerError = error;
    },
    CLEAR_REG_ERR(state) {
      state.registerError = null;
    },
  },
  actions: {
    async login({ commit }, credentials) {
      try {
        const response = await authService.login(credentials);
        console.log(response);
        const token = response.data.accessToken;
        const user = response.data;

        commit("SET_TOKEN", token);
        commit("SET_USER", user);
        commit("CLEAR_LOGIN_ERROR");
      } catch (error) {
        console.log(error);

        commit("SET_LOGIN_ERROR", error.response?.data || "Login failed");
      }
    },
    async register({ commit }, credentials) {
      try {
        const response = await authService.register(credentials);
        console.log(response);
        commit("CLEAR_REG_ERR");
        return response;
      } catch (error) {
        console.log(error);

        commit("SET_REG_ERR", error.response?.data || "Login failed");
      }
    },
    logout({ commit }) {
      commit("LOGOUT");
    },
    async loginTest({ commit }) {
      try {
        commit(
          "SET_TOKEN",
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3MTUxNzAyYTllZDExYTczZGUwNDJjNCIsImlzQWRtaW4iOmZhbHNlLCJpYXQiOjE3Mjk0Mzc3NjMsImV4cCI6MTcyOTg2OTc2M30.9QJnvRBwS23TERqpSZyzcHYpWGzzRr7eTLGyH8-6SFM"
        );
      } catch (error) {
        console.log(error);
      }
    },
  },
  getters: {
    isAuthenticated: (state) => !!state.token,
    getUser: (state) => state.user,
    loginError: (state) => state.loginError,
    registerError: (state) => state.registerError,
  },
};
