import { createRouter, createWebHistory } from "vue-router";

import Guest from "@/layouts/Guest.vue";
import Auth from "@/layouts/Auth.vue";

import Login from "@/views/auth/Login.vue";
import Register from "@/views/auth/Register.vue";

import Dashboard from "@/views/admin/Dashboard.vue";
import User from "@/views/admin/User.vue";
import Customer from "@/views/admin/Customer.vue";
import Category from "@/views/admin/Category.vue";
import Bill from "@/views/admin/Bill.vue";
import Report from "@/views/admin/Report.vue";

import CustomerForm from "@/views/forms/CustomerForm.vue";

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
        {
          path: "/users",
          component: User,
        },
        {
          path: "/customers",
          component: Customer,
        },
        {
          path: "/newCustomer",
          component: CustomerForm,
        },
        {
          path: "/bills",
          component: Bill,
        },
        {
          path: "/categories",
          component: Category,
        },
        {
          path: "/reports",
          component: Report,
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
        {
          path: "/auth/register",
          component: Register,
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
