import { paymentService } from "../../../services/paymentService";

export const paymentModule = {
  namespaced: true,
  state: {
    loading: false,
    error: false,
    success: false, // Typo corrected
  },
  mutations: {
    SET_LOADING(state, loading) {
      state.loading = loading;
    },
    SET_ERROR(state, error) {
      state.error = error;
    },
    SET_SUCCESS(state, success) {
      state.success = success; // success is now being passed
    },
    GET_ORDERS(state, orders) {
      state.orders = orders;
    },
    GET_SINGLE_ORDER(state, order) {
      state.order = order;
    },
  },
  actions: {
    async createPayment({ commit }, credentials) {
      // Start loading and reset error/success states
      commit("SET_LOADING", true);
      commit("SET_ERROR", false);
      commit("SET_SUCCESS", false);

      try {
        const response = await paymentService.creatPayment(credentials);
        console.log(response);

        // On success, stop loading and set success to true
        commit("SET_LOADING", false);
        commit("SET_SUCCESS", true); // Only set success after successful request
        return response.data;
      } catch (error) {
        console.log(error);

        // On failure, stop loading and set error to true
        commit("SET_LOADING", false);
        commit("SET_ERROR", true); // Only set error after failed request
      }
    },
  },
  getters: {
    isLoading: (state) => state.loading,
    hasError: (state) => state.error,
    hasSuccess: (state) => state.success,
  },
};
