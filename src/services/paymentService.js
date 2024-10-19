import api from "./api"; // Import the Axios instance

export const paymentService = {
  async creatPayment(credentials) {
    console.log(credentials);

    return await api.post("api/pay/create-payment-intent", credentials);
  },
};
