import { createRouter, createWebHistory } from "vue-router";
import { useProfileStore } from "@/stores/profile";

import Auth from "@/layouts/Auth.vue";
import Admin from "@/layouts/Admin.vue";
import Client from "@/layouts/Client.vue";

import Login from "@/views/auth/Login.vue";
import Register from "@/views/auth/Register.vue";

import AdminDashboard from "@/views/admin/panel/Dashboard.vue";
import AdminEmployee from "@/views/admin/panel/Employee.vue";
import AdminCustomer from "@/views/admin/panel/Customer.vue";
import AdminHardware from "@/views/admin/panel/Hardware.vue";
import AdminBill from "@/views/admin/panel/Bill.vue";
import AdminReport from "@/views/admin/panel/Report.vue";
import AdminDisconnection from "@/views/admin/panel/Disconnection.vue";

import AdminProfile from "@/views/admin/forms/ProfileForm.vue";
import AdminUpdatePassword from "@/views/admin/forms/UpdatePassword.vue";
import AdminEmployeeForm from "@/views/admin/forms/EmployeeForm.vue";
import AdminCustomerForm from "@/views/admin/forms/CustomerForm.vue";
import AdminHardwareForm from "@/views/admin/forms/HardwareForm.vue";
import AdminBillForm from "@/views/admin/forms/BillForm.vue";

import Chart from "@/views/admin/panel/Chart.vue";

import ClientDashboard from "@/views/client/panel/Dashboard.vue";

import ClientUpdatePassword from "@/views/client/forms/UpdatePassword.vue";

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
          component: AdminDashboard,
        },
        {
          path: "/profile",
          name: "profile",
          component: AdminProfile,
        },
        {
          path: "/profile/update/password",
          name: "update/password",
          component: AdminUpdatePassword,
        },
        {
          path: "/employees",
          name: "employees",
          component: AdminEmployee,
        },
        {
          path: "/new/employees",
          name: "new/employees",
          component: AdminEmployeeForm,
        },
        {
          path: "/update/employees",
          name: "update/employees",
          component: AdminEmployeeForm,
        },
        {
          path: "/customers",
          name: "customers",
          component: AdminCustomer,
        },
        {
          path: "/new/customers",
          name: "new/customers",
          component: AdminCustomerForm,
        },
        {
          path: "/customers/:id/hardware",
          name: "customers/hardware",
          component: AdminHardware,
        },
        {
          path: "/update/customers",
          name: "update/customers",
          component: AdminCustomerForm,
        },
        {
          path: "/hardware",
          name: "hardware",
          component: AdminHardware,
        },
        {
          path: "/new/hardware",
          name: "new/hardware",
          component: AdminHardwareForm,
        },
        {
          path: "/show/hardware",
          name: "show/hardware",
          component: Chart,
        },
        {
          path: "/update/hardware",
          name: "update/hardware",
          component: AdminHardwareForm,
        },
        // {
        //   path: "/admin/customers/:id/hardware",
        //   name: "customers/hardware",
        //   component: Hardware,
        // },
        {
          path: "/customers/:id/new/hardware",
          name: "customers/new/hardware",
          component: AdminHardwareForm,
        },
        // {
        //   path: "admin/customers/:id/show/hardware",
        //   name: "show/hardware",
        //   component: HardwareChart,
        // },
        {
          path: "/customers/:id/update/hardware",
          name: "customers/update/hardware",
          component: AdminHardwareForm,
        },
        {
          path: "/bills",
          name: "bills",
          component: AdminBill,
        },
        {
          path: "/new/bills",
          name: "new/bills",
          component: AdminBillForm,
        },
        {
          path: "/update/bills",
          name: "update/bills",
          component: AdminBillForm,
        },
        {
          path: "/disconnection",
          name: "disconnection",
          component: AdminDisconnection,
        },
        {
          path: "/reports",
          name: "reports",
          component: AdminReport,
        },
      ],
    },
    {
      path: "/",
      redirect: "/dashboard",
      component: Client,
      meta: { requiresAuth: true },
      children: [
        {
          path: "/dashboard",
          name: "client/dashboard",
          component: ClientDashboard,
        },
        // {
        //   path: "/users/profile",
        //   name: "users/profile",
        //   component: Profile,
        // },
        {
          path: "/profile/update/password",
          name: "client/update/password",
          component: ClientUpdatePassword,
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
