<template>
  <div class="h-screen flex items-center justify-center">
    <form @submit.prevent="submit" class="flex-1 flex flex-col gap-2 max-w-96">
      <p class="py-2 font-bold text-2xl">Register</p>
      <v-text-field
        v-model="username.value.value"
        :error-messages="username.errorMessage.value"
        label="username"
        variant="outlined"
      ></v-text-field>
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
      <p v-if="error" class="text-red-700 text-xs">Invalid email or username</p>
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
          you have accout ?
          <span class="underline cursor-pointer" @click="handleToggleRegister"
            >Login</span
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
import { authService } from "../services/authService";
import api from "../services/api";
import DOMPurify from "dompurify";

const store = useStore(); // Get the Vuex store instance
const router = useRouter();

const loading = computed(() => store.getters["auth/loading"]);
const error = computed(() => store.getters["auth/registerError"]);

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
    username(value) {
      if (value) return true;

      return "Enter a username.";
    },
  },
});

const email = useField("email");
const password = useField("password");
const username = useField("username");

const handleToggleRegister = () => {
  router.push("/login");
};
const submit = handleSubmit(() => {
  handleRegister();
});

// Computed properties to access Vuex state
const handleForceTest = () => {
  store.dispatch("auth/loginTest").then(() => {
    router.push("/dashboard");
  });
};
// Handle the login action
const handleRegister = async () => {
  try {
    // Attempt to register
    const registerResponse = await store.dispatch("auth/register", {
      username: DOMPurify.sanitize(username.value.value),
      email: DOMPurify.sanitize(email.value.value),
      password: DOMPurify.sanitize(password.value.value),
    });

    // Check if registration was successful
    if (!registerResponse || registerResponse.error) {
      // Handle registration failure here (e.g., show an error message)
      console.error("Registration failed:", registerResponse?.error);
      return; // Stop here if registration fails
    }

    // If registration is successful, attempt login
    await store.dispatch("auth/login", {
      email: DOMPurify.sanitize(email.value.value),
      password: DOMPurify.sanitize(password.value.value),
    });

    // If login is successful, navigate to the dashboard
    router.push("/dashboard");
  } catch (error) {
    // Handle unexpected errors here
    console.error("An error occurred during registration or login:", error);
  }
};
</script>

<style lang="scss" scoped></style>
