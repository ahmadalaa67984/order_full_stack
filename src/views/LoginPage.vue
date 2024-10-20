<template>
  <div class="h-screen flex items-center justify-center">
    <form @submit.prevent="submit" class="flex-1 flex flex-col gap-2 max-w-96">
      <p class="py-2 font-bold text-2xl">Login</p>
      <v-text-field
        v-model="email.value.value"
        :error-messages="email.errorMessage.value"
        label="E-mail"
        variant="outlined"
      ></v-text-field>
      <v-text-field
        v-model="password.value.value"
        :counter="10"
        :error-messages="password.errorMessage.value"
        label="Password"
        type="password"
        variant="outlined"
      ></v-text-field>
      <p v-if="error" class="text-red-400 text-xs">{{ error }}</p>
      <div class="flex flex-col gap-1">
        <v-btn
          class="me-4"
          type="submit"
          @click="handleSubmit"
          :loading="loading"
        >
          submit
        </v-btn>
        <div to="/register" class="cursor-pointer">
          Don't have accout ?
          <span class="underline cursor-pointer" @click="handleToggleRegister"
            >Register</span
          >
        </div>
        <p @click="handleForceTest" class="cursor-pointer underline">
          Skip and start test
        </p>
      </div>
    </form>
  </div>
</template>

<script setup>
import { computed, ref } from "vue";
import { useStore } from "vuex";
import { useField, useForm } from "vee-validate";
import { useRouter } from "vue-router";
import DOMPurify from "dompurify";
import { authService } from "../services/authService";
import api from "../services/api";

const store = useStore(); // Get the Vuex store instance
const router = useRouter();

const loading = computed(() => store.getters["auth/loading"]);
const error = computed(() => store.getters["auth/loginError"]);

const { handleSubmit, handleReset } = useForm({
  validationSchema: {
    email(value) {
      // Updated RegExp to allow numbers in the local part (before the @)
      if (/^[a-z0-9.-]+@[a-z.-]+\.[a-z]+$/i.test(value)) return true;

      return "Must be a valid e-mail.";
    },

    password(value) {
      if (value) return true;

      return "Enter a password.";
    },
  },
});

const email = useField("email");
const password = useField("password");

const submit = handleSubmit(() => {
  handleLogin();
});

// Computed properties to access Vuex state
// Computed properties to access Vuex state
const handleForceTest = () => {
  store.dispatch("auth/loginTest").then(() => {
    router.push("/dashboard");
  });
};
// Handle the login action
const handleLogin = async () => {
  store
    .dispatch("auth/login", {
      email: DOMPurify.sanitize(email.value.value),
      password: DOMPurify.sanitize(password.value.value),
    })
    .then(() => {
      router.push("/dashboard");
    });
};
</script>

<style lang="scss" scoped></style>
