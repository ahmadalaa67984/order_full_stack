<template>
  <div class="flex flex-col p-4">
    <div class="flex gap-2 items-center">
      <v-icon icon="mdi-home" size="30"></v-icon>
      <h1 class="font-bold text-3xl">Dashboard</h1>
    </div>
    <DashBoardForm></DashBoardForm>
  </div>
</template>

<script setup>
import DashBoardForm from "./DashBoardForm.vue";
</script>

<style lang="scss" scoped></style>
