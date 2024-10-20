<template>
  <div class="flex flex-col p-4">
    <div class="flex gap-2 items-center">
      <h1 class="font-bold text-3xl">order</h1>
    </div>
    <div class="py-4" v-if="upadatePaymentSuccess">
      <v-alert
        text="payment is success and status is updated"
        title="success"
        type="success"
      ></v-alert>
    </div>
    <v-skeleton-loader
      v-if="loading"
      height="250"
      max-width="500"
      type="image, list-item-two-line"
    >
    </v-skeleton-loader>
    <div v-if="error" class="text-red-400 text-xs">
      somthing wrong happend !
    </div>
    <div class="flex flex-col gap-2" v-if="!loading && !error">
      <div class="flex gap-2 flex-wrap">
        <v-img
          max-width="500"
          height="250"
          src="https://images.unsplash.com/photo-1695889089351-5629cb73251c?q=80&w=2012&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          cover
        ></v-img>
      </div>

      <div class="flex flex-col gap-2" v-if="!error">
        <p class="font-bold text-lg">product</p>

        <div>
          {{ order.title }}
        </div>
        <div class="text-subtitle-1">$ • {{ order.price }}</div>
        <p class="text-lg">quantity: {{ order.quantity }}</p>
        <p class="text-lg">status: {{ order.status }}</p>
      </div>

      <v-container>
        <v-row>
          <v-col>
            <v-dialog v-model="dialog" max-width="600px">
              <template v-slot:activator="{ props }">
                <v-btn
                  class="text-none text-subtitle-1 mt-2"
                  color="primary"
                  size="large"
                  variant="flat"
                  type="submit"
                  max-width="300"
                  @click="dialog = true"
                >
                  buy now !
                </v-btn>
              </template>

              <v-card>
                <v-card-title>
                  <span class="headline">Payment Method</span>
                </v-card-title>
                <OrderPaymentCard
                  :closeDialog="closeDialog"
                  :order="order"
                  :handleUpdatePaymentSuccess="handleUpdatePaymentSuccess"
                ></OrderPaymentCard>
              </v-card>
            </v-dialog>
          </v-col>
        </v-row>
      </v-container>
    </div>
  </div>
</template>

<script setup>
import store from "../../store";
import OrderPaymentCard from "./OrderPaymentCard.vue";
import { computed, onBeforeUnmount, onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { loadStripe } from "@stripe/stripe-js";

const dialog = ref(false);
const route = useRoute();
const order = computed(() => store.getters["order/order"]);
const loading = computed(() => store.getters["order/isLoading"]);
const error = computed(() => store.getters["order/hasError"]);
const upadatePaymentSuccess = ref(false);

const handleUpdatePaymentSuccess = () => {
  upadatePaymentSuccess.value = true;
  setTimeout(() => {
    upadatePaymentSuccess.value = false;
  }, 10000);
};
const fetchOrders = async () => {
  store.dispatch("order/fetchSingleOrder", route.params.id);
};

// Method to close the dialog
const closeDialog = () => {
  dialog.value = false;
};

// Method to confirm the date selection
const confirmDate = () => {
  dialog.value = false;
};

onMounted(async () => {
  fetchOrders();
});
</script>

<style lang="scss" scoped></style>
