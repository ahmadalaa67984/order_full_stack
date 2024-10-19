// src/store/index.js
import { createStore } from "vuex";
import { themeModule } from "./modules/theme/themeModule";
import { authModule } from "./modules/auth/authModule";
import { orderModule } from "./modules/orders/ordersModule";
import { paymentModule } from "./modules/payment/paymentModule";

const store = createStore({
  modules: {
    theme: themeModule,
    auth: authModule,
    order: orderModule,
    payment: paymentModule,
  },
});

export default store;
