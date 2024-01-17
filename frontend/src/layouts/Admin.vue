<script setup>
import { ref } from "vue";
import Navbar from "@/components/menus/Navbar.vue";
import Sidebar from "@/components/menus/Sidebar.vue";

const menu = ref([
  {
    key: "dashboard",
    to: { name: "admin-dashboard" },
    name: "Panel de control",
    icon: "fa-chart-pie",
  },
  {
    key: "accordion",
    name: "Usuarios",
    icon: "fa-users",
    accordion: true,
  },
  {
    key: "customers",
    to: { name: "customers" },
    name: "Clientes",
    icon: "fa-user-tie",
    accordionItem: true,
  },
  {
    key: "users",
    to: { name: "employees" },
    name: "Usuarios",
    icon: "fa-user-cog",
    accordionItem: true,
  },
  {
    key: "deu",
    to: { name: "disconnection" },
    name: "Cortes por deuda",
    icon: "fa-charging-station",
  },
  {
    key: "bills",
    to: { name: "bills" },
    name: "Facturas Gral.",
    icon: "fa-book",
  },
  {
    key: "hardware",
    to: { name: "hardware" },
    name: "Medidores Gral.",
    icon: "fa-bolt",
  },
  {
    key: "reports",
    to: { name: "reports" },
    name: "Noticias",
    icon: "fa-newspaper",
  },
]);
</script>

<template>
  <Navbar />
  <Sidebar :menu="menu" />
  <main>
    <div class="p-2 sm:ml-64 bg-gray-50 dark:bg-gray-700 min-h-screen">
      <div class="p-2 rounded-lg mt-16">
        <RouterView />
      </div>
    </div>
  </main>
</template>
