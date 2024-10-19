<template>
  <form @submit.prevent="handleSubmit" class="p-4 gap-2">
    <label>
      Card details
      <div class="py-4">
        <div ref="cardElement"></div>
      </div>
      <!-- Ensure this is present in the template -->
    </label>
    <div v-if="error" class="text-red-500">somthing wrong !</div>
    <div v-if="localError" class="text-red-500">{{ localError }}</div>
    <!-- <p v-if="success" class="text-green-600">payment success</p> -->
    <div class="flex flex-col gap-2">
      <v-btn type="submit" color="primary" :disabled="loading">Pay</v-btn>
      <v-btn text @click="closeDialog">Cancel</v-btn>
    </div>
  </form>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, computed } from "vue";
import { loadStripe } from "@stripe/stripe-js";
import store from "../../store";

const props = defineProps({
  closeDialog: Function,
  handleUpdatePaymentSuccess: Function,
  order: Object,
});

const stripePublicKey = import.meta.env.VITE_STRIPE_PUBLIC_KEY;
const stripePromise = loadStripe(stripePublicKey);
const cardElement = ref(null);
const loading = computed(() => store.getters["payment/isLoading"]);
const error = computed(() => store.getters["payment/hasError"]);
const localError = ref(null);
const success = computed(() => store.getters["payment/hasSuccess"]);

let card = null; // Declare card variable outside to use in cleanup

const createCardElement = async () => {
  const stripe = await stripePromise;
  const elements = stripe.elements();

  // Create an instance of the card Element
  card = elements.create("card");

  // Add an instance of the card Element into the `cardElement` div
  card.mount(cardElement.value);
};

const handleSubmit = async () => {
  const stripe = await stripePromise;
  localError.value = null;
  // Create a token using the card Element
  const { token, error: tokenError } = await stripe.createToken(card);

  if (tokenError) {
    localError.value = tokenError.message;
  }

  // Create payment intent with the token
  const paymentIntentData = {
    amount: props.order.price * 100,
    currency: "usd",
    payment_method: token.id,
  };

  try {
    // Dispatch action to create payment intent and receive the client secret
    const { clientSecret } = await store.dispatch(
      "payment/createPayment",
      paymentIntentData
    );

    // Now confirm the payment using the client secret
    const { error: confirmError } = await stripe.confirmCardPayment(
      clientSecret,
      {
        payment_method: {
          type: "card",
          card: {
            token: token.id, // Use the token ID here
          },
        },
      }
    );

    if (confirmError) {
      localError.value = confirmError.message;
      console.log("Payment failed");
    } else {
      console.log("Payment successful");
      store.dispatch("order/updateOrderStatus", props.order._id).then(() => {
        store.dispatch("order/fetchSingleOrder", props.order._id);
      }); // Set success in store
      props.closeDialog();
      props.handleUpdatePaymentSuccess();
      localError.value = null;
    }
  } catch (error) {
    console.log("Payment failed outer");
    // store.dispatch("payment/setError", error.message); // Set error in store
  }
};

onMounted(async () => {
  await createCardElement();
});

onBeforeUnmount(() => {
  if (card) {
    card.unmount(); // Unmount the card element on component destroy
  }
});
</script>

<style>
/* Add some basic styling */
form {
  display: flex;
  flex-direction: column;
}
</style>
