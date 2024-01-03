import { createRouter, createWebHistory } from "vue-router";
import { useProfileStore } from "@/stores/profile.js";

import Auth from "@/layouts/Auth.vue";
import Admin from "@/layouts/Admin.vue";

import Login from "@/views/auth/Login.vue";
import Register from "@/views/auth/Register.vue";

import Dashboard from "@/views/admin/Dashboard.vue";
import User from "@/views/admin/User.vue";
import Customer from "@/views/admin/Customer.vue";
import Category from "@/views/admin/Category.vue";
import Bill from "@/views/admin/Bill.vue";
import Report from "@/views/admin/Report.vue";

import Profile from "@/views/forms/ProfileForm.vue";
import UpdatePassword from "@/views/forms/UpdatePassword.vue";
import CustomerForm from "@/views/forms/CustomerForm.vue";
import CategoryForm from "@/views/forms/CategoryForm.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      redirect: "/dashboard",
      component: Admin,
      meta: { requiresAuth: true },
      children: [
        { path: "/dashboard", component: Dashboard },
        { path: "/profile", component: Profile },
        { path: "/update/password", component: UpdatePassword },
        { path: "/users", component: User },
        { path: "/customers", component: Customer },
        { path: "/new/customer", component: CustomerForm },
        { path: "/update/customer", component: CustomerForm },
        { path: "/bills", component: Bill },
        { path: "/categories", component: Category },
        { path: "/new/category", component: CategoryForm },
        { path: "/update/category", component: CategoryForm },
        { path: "/reports", component: Report },
      ],
    },
    {
      path: "/auth",
      redirect: "/auth/login",
      component: Auth,
      meta: { notAuthenticated: true },
      children: [
        { path: "/auth/login", component: Login },
        { path: "/auth/register", component: Register },
      ],
    },
    { path: "/:pathMatch(.*)*", redirect: "/" },
  ],
});

router.beforeEach(async (to, from, next) => {
  let ok = false;
  let path = "";
  const profileStore = useProfileStore();
  if (!profileStore.isAuthenticated) {
    try {
      await profileStore.verifyToken();
    } catch (error) {
      console.error("Error loading user data:", error);
    }
  }

  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (!profileStore.isAuthenticated) {
      path = "/auth/login";
      ok = false;
    } else {
      ok = true;
    }
  }

  if (to.matched.some((record) => record.meta.notAuthenticated)) {
    if (profileStore.isAuthenticated) {
      ok = false;
      path = "/";
    } else {
      ok = true;
    }
  }

  if (to.matched.some((record) => record.meta.requiresAdmin)) {
    if (!profileStore.isAdmin) {
      ok = false;
      path = "/";
    } else {
      ok = true;
    }
  }
  if (ok) {
    next();
  } else {
    next({ path });
  }
});

/* router.beforeEach((to, from, next) => {
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
}); */

export default router;
