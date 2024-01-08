import { createRouter, createWebHistory } from "vue-router";
import { useProfileStore } from "@/stores/profile.js";

import Auth from "@/layouts/Auth.vue";
import Admin from "@/layouts/Admin.vue";

import Login from "@/views/auth/Login.vue";
import Register from "@/views/auth/Register.vue";

import Dashboard from "@/views/admin/Dashboard.vue";
import Employee from "@/views/admin/Employee.vue";
import Customer from "@/views/admin/Customer.vue";
import Category from "@/views/admin/Category.vue";
import Hardware from "@/views/admin/hardware/Hardware.vue";
import Bill from "@/views/admin/Bill.vue";
import Report from "@/views/admin/Report.vue";

import Profile from "@/views/forms/ProfileForm.vue";
import UpdatePassword from "@/views/forms/UpdatePassword.vue";
import EmployeeForm from "@/views/forms/EmployeeForm.vue";
import CustomerForm from "@/views/forms/CustomerForm.vue";
import CategoryForm from "@/views/forms/CategoryForm.vue";
import HardwareForm from "@/views/forms/HardwareForm.vue";

import HardwareChart from "@/views/admin/hardware/HardwareChart.vue";

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
        { path: "/profile/update/password", component: UpdatePassword },
        { path: "/employees", component: Employee },
        { path: "/employees/new", component: EmployeeForm },
        { path: "/employees/update", component: EmployeeForm },
        { path: "/customers", component: Customer },
        { path: "/customers/new", component: CustomerForm },
        { path: "/customers/update", component: CustomerForm },
        {
          path: "/customers/:id/hardware",
          name: "hardware",
          component: Hardware,
        },
        {
          path: "customers/:id/new/hardware",
          name: "new/hardware",
          component: HardwareForm,
        },
        {
          path: "customers/:id/show/hardware",
          name: "show/hardware",
          component: HardwareChart,
        },
        {
          path: "customers/:id/update/hardware",
          name: "update/hardware",
          component: HardwareForm,
        },
        { path: "/categories", component: Category },
        { path: "/new/category", component: CategoryForm },
        { path: "/update/category", component: CategoryForm },
        { path: "/hardware", component: Hardware },

        { path: "/update/hardware", component: HardwareForm },
        { path: "/bills", component: Bill },
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

export default router;
