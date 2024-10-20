<script setup></script>

<template>
  <div>
    <div class="flex h-screen">
      <SideMenu v-if="isAuthenticated"></SideMenu>
      <div class="flex-1">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>
<script setup>
import { computed, ref } from "vue";
import { useRouter } from "vue-router";
import SideMenu from "./components/shared/SideMenu.vue";

import store from "./store";

const isAuthenticated = computed(() => store.getters["auth/isAuthenticated"]);
</script>
<style scoped></style>
