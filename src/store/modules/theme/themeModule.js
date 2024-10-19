import { createStore } from "vuex";

export const themeModule = {
  namespaced: true,
  state: {
    isDark: localStorage.getItem("theme") === "dark",
  },
  mutations: {
    TOGGLE_THEME(state) {
      state.isDark = !state.isDark;
      localStorage.setItem("theme", state.isDark ? "dark" : "light");
    },
  },
  actions: {
    toggleTheme({ commit }) {
      commit("TOGGLE_THEME");
    },
  },
  getters: {
    isDark: (state) => state.isDark,
  },
};

export const store = createStore({
  modules: {
    theme: themeModule,
  },
});

// Watch for changes in the theme state
store.subscribe((mutation) => {
  if (mutation.type === "theme/TOGGLE_THEME") {
    vuetify.theme.global.name = store.state.theme.isDark ? "dark" : "light";
  }
});
