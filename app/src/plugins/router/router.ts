import { useAuthStore } from "@/modules/auth/store/useAuthStore.ts";
import { createWebHistory, createRouter } from "vue-router";
import { URL_ROUTES } from "./routerType";

const routes = [
  {
    name: URL_ROUTES.HOME,
    path: "/",
    redirect: "/login",
  },
  {
    name: URL_ROUTES.LOGIN,
    path: "/login",
    component: () => import("@/modules/auth/views/LoginView.vue"),
  },
  {
    name: URL_ROUTES.LOGOUT,
    path: "/logout",
    component: () => import("@/modules/auth/views/LogoutView.vue"),
  },
  {
    name: URL_ROUTES.DASHBOARD,
    path: "/dashboard",
    component: () => import("@/modules/dashboard/views/DashboardView.vue"),
    meta: { requiresAuth: true },
  },
  {
    name: URL_ROUTES.TICKETS,
    path: "/tickets",
    component: () => import("@/modules/tickets/views/ListTickesView.vue"),
    meta: { requiresAuth: true },
  },
  {
    name: "NotFound",
    path: "/:pathMatch(.*)*",
    component: () => import("@/modules/error/views/NotFoundView.vue"),
  },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, _from, next) => {
  const authStore = useAuthStore();
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);

  if (to.name === URL_ROUTES.LOGIN && authStore.isAuthenticated) {
    next({ name: URL_ROUTES.DASHBOARD });
  }

  if (requiresAuth && !authStore.isAuthenticated) {
    next({ name: URL_ROUTES.LOGIN });
  }

  next();
});
