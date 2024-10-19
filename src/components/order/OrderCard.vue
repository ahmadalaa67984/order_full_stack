<template>
  <div class="p-2">
    <v-card hover @click="handleGoToOrderDetails(order._id)">
      <v-card-item>
        <v-card-title> {{ order.title }}</v-card-title>
        <div class="flex items-center gap-1">
          <p>Quantity:</p>
          <p>{{ order.quantity }}</p>
        </div>
      </v-card-item>
      <v-card-text class="flex items-center gap-1">
        <p>Price:</p>
        <p>{{ order.price }}$</p>
      </v-card-text>
      <v-card-text>
        {{ order.status }}
      </v-card-text>
    </v-card>
  </div>
</template>

<script setup>
const props = defineProps({
  handleGoToOrderDetails: Function,
  order: Object,
});
</script>

<style lang="scss" scoped></style>
