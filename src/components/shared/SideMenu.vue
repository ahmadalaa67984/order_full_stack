<template>
  <v-card class="z-30">
    <v-layout>
      <v-navigation-drawer
        v-model="drawer"
        :rail="rail"
        permanent
        class="h-screen"
      >
        <v-list-item
          prepend-avatar="https://randomuser.me/api/portraits/men/85.jpg"
          title="John Leider"
          nav
        >
          <template v-slot:append>
            <v-btn
              icon="mdi-chevron-left"
              variant="text"
              @click.stop="rail = !rail"
            ></v-btn>
          </template>
        </v-list-item>

        <v-divider></v-divider>

        <v-list density="compact" nav>
          <v-list-item
            prepend-icon="mdi-home-city"
            title="Home"
            value="home"
            to="/dashboard"
          ></v-list-item>
          <v-list-item
            prepend-icon="mdi-cart"
            title="orders"
            value="orders"
            to="/orders"
          ></v-list-item>

          <v-list-item
            prepend-icon="mdi-theme-light-dark"
            title="dark mode"
            value="dark mode"
            @click="toggleTheme"
          ></v-list-item>
          <v-list-item
            prepend-icon="mdi-logout"
            title="Logout"
            value="logout"
            @click="handleLogOut"
          ></v-list-item>
        </v-list>
      </v-navigation-drawer>
      <v-main style="height: 250px"></v-main>
    </v-layout>
  </v-card>
</template>
<script setup>
import { ref } from "vue";
import { useStore } from "vuex";
import { useTheme } from "vuetify";
import { useRouter } from "vue-router";

const theme = useTheme();

const drawer = ref(true);
const rail = ref(true);

const router = useRouter();
const store = useStore();

function toggleTheme() {
  store.dispatch("theme/toggleTheme");
  theme.global.name.value = theme.global.current.value.dark ? "light" : "dark";
}

const handleLogOut = async () => {
  store.dispatch("auth/logout").then(() => {
    router.push("/login");
  });
};
</script>
