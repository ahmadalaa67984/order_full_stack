// main.js
import { createApp, nextTick } from "vue";
import "./styles/style.css";
import App from "./App.vue";
import "vuetify/styles"; // Import Vuetify styles
import router from "./router";
import vuetify from "./plugin/vuetify";
import store from "./store";

createApp(App).use(router).use(store).use(vuetify).mount("#app");
