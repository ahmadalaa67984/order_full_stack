import api from "./api"; // Import the Axios instance

export const orderService = {
  async creatOrder(credentials) {
    console.log(credentials);

    return await api.post("api/orders/", credentials);
  },
  async fetchOrders() {
    return await api.get("api/orders/");
  },
  async fetchSingleOrder(id) {
    return await api.get(`api/orders/find/${id}`);
  },
  async updateOrderStatus(id) {
    return await api.put(`api/orders/markPaid/${id}`);
  },
};
