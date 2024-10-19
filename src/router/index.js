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
    // meta: { requiresAuth: true },
  },
  {
    path: "/orders",
    name: "ordersPage",
    component: OrderPage,
    // meta: { requiresAuth: true },
  },
  {
    path: "/order/:id",
    name: "orderDetail",
    component: OrderDetailsPage,
    // meta: { requiresAuth: true },
  },
  {
    path: "/login",
    name: "login",
    component: LoginPage,
    meta: { requiresNotAuth: true },
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
    meta: { requiresNotAuth: true },
  },
  {
    path: "/:catchAll(.*)",
    redirect: "/pageNotFound",
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
  const isAuthenticated = store.getters["auth/isAuthenticated"]; // Check if user is authenticated
  if (to.meta.requiresNotAuth && isAuthenticated) {
    next({ name: "DashboardPage" }); // Redirect to login if not authenticated
  } else {
    next(); // Allow navigation
  }
});
export default router;
