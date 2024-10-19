<script setup></script>

<template>
  <div>
    <div class="flex h-screen" v-if="forceTest || isAuthenticated">
      <SideMenu></SideMenu>
      <div class="flex-1">
        <router-view></router-view>
      </div>
    </div>
    <LoginPage
      v-if="!forceTest && !isRegiseter && !isAuthenticated"
      :handleForceTest="handleForceTest"
      :handleToggleRegister="handleToggleRegister"
    ></LoginPage>
    <Register
      v-if="!forceTest && isRegiseter && !isAuthenticated"
      :handleForceTest="handleForceTest"
      :handleToggleRegister="handleToggleRegister"
    ></Register>
  </div>
</template>
<script setup>
import { computed, ref } from "vue";
import { useRouter } from "vue-router";
import SideMenu from "./components/shared/SideMenu.vue";
import LoginPage from "./views/LoginPage.vue";
import Register from "./views/Register.vue";
import store from "./store";

const forceTest = ref(false);
const isRegiseter = ref(false);

const router = useRouter();
const isAuthenticated = computed(() => store.getters["auth/isAuthenticated"]);

const handleForceTest = () => {
  forceTest.value = !forceTest.value;
  router.push("/dashboard");
};
const handleToggleRegister = () => {
  isRegiseter.value = !isRegiseter.value;
};
</script>
<style scoped></style>
