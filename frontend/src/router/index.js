import { createRouter, createWebHistory } from "vue-router";
import { useProfileStore } from "@/stores/profile.js";

import Auth from "@/layouts/Auth.vue";
import Admin from "@/layouts/Admin.vue";
import Layout from "@/layouts/Layout.vue";

import Login from "@/views/auth/Login.vue";
import Register from "@/views/auth/Register.vue";

import Dashboard from "@/views/admin/Dashboard.vue";
import Employee from "@/views/admin/Employee.vue";
import Customer from "@/views/admin/Customer.vue";
import Hardware from "@/views/admin/Hardware.vue";
import Bill from "@/views/admin/Bill.vue";
import Report from "@/views/admin/Report.vue";

import Profile from "@/views/forms/ProfileForm.vue";
import UpdatePassword from "@/views/forms/UpdatePassword.vue";
import EmployeeForm from "@/views/forms/EmployeeForm.vue";
import CustomerForm from "@/views/forms/CustomerForm.vue";
import HardwareForm from "@/views/forms/HardwareForm.vue";

// import HardwareChart from "@/views/admin/hardware/HardwareChart.vue";

import UserDashboard from "@/views/user/Dashboard.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      redirect: "dashboard",
      component: Admin,
      meta: { requiresAuth: true },
      children: [
        {
          path: "/dashboard",
          name: "dashboard",
          component: Dashboard,
        },
        {
          path: "/profile",
          name: "profile",
          component: Profile,
        },
        {
          path: "/profile/update/password",
          name: "update/password",
          component: UpdatePassword,
        },
        {
          path: "/employees",
          name: "employees",
          component: Employee,
        },
        {
          path: "/new/employees",
          name: "new/employees",
          component: EmployeeForm,
        },
        {
          path: "/update/employees",
          name: "update/employees",
          component: EmployeeForm,
        },
        {
          path: "/customers",
          name: "customers",
          component: Customer,
        },
        {
          path: "/new/customers",
          name: "new/customers",
          component: CustomerForm,
        },
        {
          path: "/customers/:id/hardware",
          name: "customers/hardware",
          component: Hardware,
        },
        {
          path: "/update/customers",
          name: "update/customers",
          component: CustomerForm,
        },
        {
          path: "/hardware",
          name: "hardware",
          component: Hardware,
        },
        {
          path: "/new/hardware",
          name: "new/hardware",
          component: HardwareForm,
        },
        {
          path: "/update/hardware",
          name: "update/hardware",
          component: HardwareForm,
        },
        // {
        //   path: "/admin/customers/:id/hardware",
        //   name: "customers/hardware",
        //   component: Hardware,
        // },
        {
          path: "/customers/:id/new/hardware",
          name: "customers/new/hardware",
          component: HardwareForm,
        },
        // {
        //   path: "admin/customers/:id/show/hardware",
        //   name: "show/hardware",
        //   component: HardwareChart,
        // },
        {
          path: "/customers/:id/update/hardware",
          name: "customers/update/hardware",
          component: HardwareForm,
        },
        {
          path: "/bills",
          name: "bills",
          component: Bill,
        },
        {
          path: "/reports",
          name: "reports",
          component: Report,
        },
      ],
    },
    {
      path: "/",
      redirect: "/dashboard",
      component: Layout,
      meta: { requiresAuth: true },
      children: [
        {
          path: "/users/dashboard",
          name: "users/dashboard",
          component: UserDashboard,
        },
        {
          path: "/users/profile",
          name: "users/profile",
          component: Profile,
        },
        {
          path: "/users/profile/update/password",
          name: "users/update/password",
          component: UpdatePassword,
        },
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

  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (!profileStore.isAuthenticated) {
      path = "/auth/login";
      ok = false;
    } else if (!profileStore.isAdmin && to.path === "/dashboard") {
      path = "/users/dashboard";
      ok = false;
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
