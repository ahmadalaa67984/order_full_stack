import { orderService } from "../../../services/orderService";

export const orderModule = {
  namespaced: true,
  state: {
    loading: false,
    orders: [],
    error: false,
    success: false, // Typo corrected
    order: {},
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
    async createOrder({ commit }, credentials) {
      // Start loading and reset error/success states
      commit("SET_LOADING", true);
      commit("SET_ERROR", false);
      commit("SET_SUCCESS", false);

      try {
        const response = await orderService.creatOrder(credentials);
        console.log(response);

        // On success, stop loading and set success to true
        commit("SET_LOADING", false);
        commit("SET_SUCCESS", true); // Only set success after successful request
      } catch (error) {
        console.log(error);

        // On failure, stop loading and set error to true
        commit("SET_LOADING", false);
        commit("SET_ERROR", true); // Only set error after failed request
      }
    },
    async fetchOrders({ commit }) {
      commit("SET_LOADING", true);
      commit("SET_ERROR", false);
      commit("GET_ORDERS", []);
      try {
        const response = await orderService.fetchOrders();
        commit("GET_ORDERS", response.data);
        commit("SET_LOADING", false);
      } catch (error) {
        console.log(error);
        commit("SET_LOADING", false);
        commit("SET_ERROR", true);
      }
    },
    async fetchSingleOrder({ commit }, id) {
      commit("SET_LOADING", true);
      commit("SET_ERROR", false);
      try {
        const response = await orderService.fetchSingleOrder(id);
        commit("GET_SINGLE_ORDER", response.data);
        commit("SET_LOADING", false);
      } catch (error) {
        console.log(error);
        commit("SET_LOADING", false);
        commit("SET_ERROR", true);
      }
    },
    async updateOrderStatus({ commit }, id) {
      try {
        const response = await orderService.updateOrderStatus(id);
        console.log(response);
      } catch (error) {
        console.log(error);
      }
    },
  },
  getters: {
    isLoading: (state) => state.loading,
    hasError: (state) => state.error,
    hasSuccess: (state) => state.success,
    orders: (state) => state.orders,
    order: (state) => state.order,
  },
};
