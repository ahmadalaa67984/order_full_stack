import { createRouter, createWebHistory } from "vue-router";
import DashBoardPage from "../views/DashBoardPage.vue";
import OrderPage from "../views/OrderPage.vue";
import OrderDetailsPage from "../views/OrderDetailsPage.vue";
import LoginPage from "../views/LoginPage.vue";
import PageNotFound from "../views/PageNotFound.vue";
import Register from "../views/Register.vue";
import store from "../store";

const routes = [
  {
    path: "/dashboard",
    name: "DashboardPage",
    component: DashBoardPage,
    meta: { requiresAuth: true },
  },
  {
    path: "/orders",
    name: "ordersPage",
    component: OrderPage,
    meta: { requiresAuth: true },
  },
  {
    path: "/order/:id",
    name: "orderDetail",
    component: OrderDetailsPage,
    meta: { requiresAuth: true },
  },
  {
    path: "/login",
    name: "login",
    component: LoginPage,
  },
  {
    path: "/pageNotFound",
    name: "pageNotFound",
    component: PageNotFound,
  },
  {
    path: "/register",
    name: "register",
    component: Register,
  },
  {
    path: "/:catchAll(.*)",
    redirect: (to) => {
      // Check if the user is authenticated
      const isAuthenticated = store.getters["auth/isAuthenticated"]; // Assuming you have an isAuthenticated getter in your Vuex store

      // Redirect based on authentication status
      if (isAuthenticated) {
        return "/pageNotFound";
      } else {
        return "/login";
      }
    },
  },
];

// Create the router instance
const router = createRouter({
  history: createWebHistory(),
  routes,
});

//--------------NOTE I COMMENTED OUT THE NAVIGATION GUARD TO ALLOW ACCESS TO THE ROUTES WITHOUT AUTHENTICATION FOR TESTING PURPOSES-----------------///

// Navigation Guards: Protect routes that require authentication
router.beforeEach((to, from, next) => {
  const isAuthenticated = store.getters["auth/isAuthenticated"];
  if ((to.name === "login" || to.name === "register") && isAuthenticated) {
    return next({ name: "DashboardPage" }); // Redirect to dashboard if authenticated
  } // Check if user is authenticated
  if (to.meta.requiresAuth && !isAuthenticated) {
    next({ name: "login" }); // Redirect to login if not authenticated
  } else {
    next(); // Allow navigation
  }
});

export default router;
