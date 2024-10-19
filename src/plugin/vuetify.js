// plugin/vuetify.js
import { createVuetify } from "vuetify";

const vuetify = createVuetify({
  theme: {
    defaultTheme: localStorage.getItem("theme"), // Set the default theme
    themes: {
      light: {
        primary: "#1976D2",
        secondary: "#424242",
        accent: "#82B1FF",
        error: "#FF5252",
        info: "#2196F3",
        success: "#4CAF50",
        warning: "#FFC107",
      },
      dark: {
        primary: "#BB86FC",
        secondary: "#03DAC6",
        accent: "#FF4081",
        error: "#CF6679",
        info: "#2196F3",
        success: "#4CAF50",
        warning: "#FFC107",
      },
    },
    options: { customProperties: true },
  },
});

export default vuetify;
