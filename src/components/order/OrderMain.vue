<template>
  <div class="flex flex-col p-4">
    <div class="flex gap-2 items-center">
      <v-icon icon="mdi-cart" size="30"></v-icon>
      <h1 class="font-bold text-3xl">Orders</h1>
    </div>
    <div class="flex flex-wrap gap-2 py-2 items-center">
      <div class="w-60">
        <v-select
          label="filter by status"
          :items="['Pending', 'Paid', 'Canceled']"
          multiple
          variant="outlined"
          v-model="orderStatusfilter"
        ></v-select>
      </div>
      <div class="flex gap-1">
        <div class="flex flex-col text-center">
          <OrderFilterDatePicker
            label="from"
            :selectedDate="selectedDateFrom"
            :handleSelectedDate="handleSelectedDateFrom"
          ></OrderFilterDatePicker>
        </div>
        <div class="flex flex-col text-center">
          <OrderFilterDatePicker
            label="to"
            :selectedDate="selectedDateTo"
            :handleSelectedDate="handleSelectedDateTo"
          ></OrderFilterDatePicker>
        </div>
      </div>
    </div>
    <div class="flex flex-wrap">
      <v-skeleton-loader
        v-if="loading"
        class="w-full md:w-1/3"
        :elevation="4"
        type="card"
      ></v-skeleton-loader>
      <div v-if="error" class="text-red-400 text-xs">
        somthing wrong happend !
      </div>
      <p v-if="!loading && !error && orders.length === 0">no orders found</p>
      <div
        class="w-full md:w-1/3"
        v-for="order in orders"
        :key="order"
        :class="{
          hidden: !(
            (orderStatusfilter.includes(order.status) ||
              orderStatusfilter.length === 0) &&
            inDateRange(order)
          ),
        }"
      >
        <OrderCard
          :handleGoToOrderDetails="handleGoToOrderDetails"
          :order="order"
        ></OrderCard>
      </div>
    </div>
    <!-- <div class="text-center">
      <v-pagination
        v-model="page"
        :length="orders?.length"
        :total-visible="6"
        :size="30"
      ></v-pagination>
    </div> -->
  </div>
</template>

<script setup>
import { computed, onMounted, ref, watch } from "vue";
import { useRouter } from "vue-router";
import store from "../../store";
import OrderCard from "./OrderCard.vue";
import OrderFilterDatePicker from "./OrderFilterDatePicker.vue";

const page = ref(1);
const router = useRouter();
const orders = computed(() => store.getters["order/orders"]);
const loading = computed(() => store.getters["order/isLoading"]);
const error = computed(() => store.getters["order/hasError"]);

const selectedDateFrom = ref(null);
const selectedDateTo = ref(null);
const orderStatusfilter = ref([]);

const handleSelectedDateFrom = (newVal) => {
  selectedDateFrom.value = newVal;
};
const handleSelectedDateTo = (newVal) => {
  selectedDateTo.value = newVal;
};
const inDateRange = (order) => {
  if (!selectedDateFrom.value && !selectedDateTo.value) return true;
  if (selectedDateFrom.value && selectedDateTo.value) {
    return (
      new Date(order.updatedAt) >= new Date(selectedDateFrom.value) &&
      new Date(order.updatedAt) <= new Date(selectedDateTo.value)
    );
  }
  if (selectedDateFrom.value) {
    return new Date(order.updatedAt) >= new Date(selectedDateFrom.value);
  }
  if (selectedDateTo.value) {
    return new Date(order.updatedAt) <= new Date(selectedDateTo.value);
  }
};

const fetchOrders = async () => {
  store.dispatch("order/fetchOrders");
};
const handleGoToOrderDetails = (id) => {
  router.push(`/order/${id}`);
};
onMounted(() => {
  fetchOrders();
});
</script>

<style lang="scss" scoped></style>
