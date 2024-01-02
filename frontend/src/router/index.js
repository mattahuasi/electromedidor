import { createRouter, createWebHistory } from "vue-router";
import Guest from "@/layouts/Guest.vue";
import Login from "@/views/auth/Login.vue";

import Auth from "@/layouts/Auth.vue";
import Dashboard from "@/views/admin/Dashboard.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      redirect: "/dashboard",
      component: Auth,
      meta: { requiresAuth: true },
      children: [
        {
          path: "/dashboard",
          component: Dashboard,
        },
      ],
    },
    {
      path: "/auth",
      redirect: "/auth/login",
      component: Guest,
      meta: { notAuthenticated: true },
      children: [
        {
          path: "/auth/login",
          component: Login,
        },
      ],
    },
    { path: "/:pathMatch(.*)*", redirect: "/" },
  ],
});

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    // acceso a admin
    const isAuthenticated = true;
    if (!isAuthenticated) {
      next("/auth/login");
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
