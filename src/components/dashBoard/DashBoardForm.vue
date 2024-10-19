<template>
  <form @submit.prevent="submit" class="pt-20 max-w-screen-md">
    <h2 class="text-md font-medium mb-4">Add Product</h2>
    <v-text-field
      v-model="name.value.value"
      :counter="10"
      :error-messages="name.errorMessage.value"
      label="Product Name"
      variant="outlined"
      class="py-2"
    ></v-text-field>
    <v-text-field
      v-model="price.value.value"
      :counter="10"
      :error-messages="price.errorMessage.value"
      label="Price"
      type="number"
      variant="outlined"
      class="py-2"
    ></v-text-field>
    <v-text-field
      v-model="quantity.value.value"
      :counter="10"
      :error-messages="quantity.errorMessage.value"
      label="Quantity"
      type="number"
      variant="outlined"
      class="py-2"
    ></v-text-field>
    <v-select
      v-model="orderStatus.value.value"
      :items="items"
      :error-messages="orderStatus.errorMessage.value"
      label="Order Status"
      variant="outlined"
    ></v-select>
    <p class="text-xs text-green-600" v-if="success">order add successfully</p>
    <p v-if="error" class="text-red-400 text-xs">somthing wrong happend</p>

    <v-btn
      class="text-none text-subtitle-1 mt-2"
      color="primary"
      size="large"
      variant="flat"
      type="submit"
      :loading="loading"
    >
      Create Product
    </v-btn>
  </form>
</template>
<script setup>
import { computed, ref } from "vue";
import { useField, useForm } from "vee-validate";
import store from "../../store";
import DOMPurify from "dompurify"; // Import DOMPurify

const { handleSubmit, handleReset } = useForm({
  validationSchema: {
    name(value) {
      if (value?.length >= 2) return true;

      return "Name needs to be at least 2 characters.";
    },
    price(value) {
      if (/^\d+(\.\d{1,2})?$/.test(value) && parseFloat(value) > 0) {
        return true;
      }
      return "Price must be a positive number with up to 2 decimal places.";
    },
    quantity(value) {
      if (/^[1-9]\d*$/.test(value)) {
        return true;
      }
      return "Quantity must be a positive integer.";
    },
    orderStatus(value) {
      if (value && value !== "") {
        return true;
      }
      return "Order status must be chosen.";
    },
  },
});
const name = useField("name");
const price = useField("price");
const quantity = useField("quantity");
const orderStatus = useField("orderStatus");

const items = ref(["Pending", "Paid", "Canceled"]);
const loading = computed(() => store.getters["order/isLoading"]);
const error = computed(() => store.getters["order/hasError"]);
const success = computed(() => store.getters["order/hasSuccess"]);

const sanitizeInputs = () => {
  return {
    sanitizedTitle: DOMPurify.sanitize(name.value.value),
    sanitizedPrice: DOMPurify.sanitize(price.value.value),
    sanitizedQuantity: DOMPurify.sanitize(quantity.value.value),
    sanitizedStatus: DOMPurify.sanitize(orderStatus.value.value),
  };
};

const handleCreateOrder = async () => {
  const { sanitizedTitle, sanitizedPrice, sanitizedQuantity, sanitizedStatus } =
    sanitizeInputs(); // Sanitize inputs

  store.dispatch("order/createOrder", {
    title: sanitizedTitle, // Use sanitized values
    price: sanitizedPrice,
    quantity: sanitizedQuantity,
    status: sanitizedStatus,
  });
  handleReset();
};
const submit = handleSubmit((values) => {
  handleCreateOrder();
});
</script>

<style lang="scss" scoped></style>
