<script setup>
import { ref } from "vue";
import Navbar from "@/components/menus/Navbar.vue";
import Sidebar from "@/components/menus/Sidebar.vue";

const menu = ref([
  {
    key: "dashboard",
    to: { name: "users/dashboard" },
    name: "Panel de control",
    icon: "fa-flipboard",
  },
  // {
  //   key: "accordion",
  //   name: "Usuarios",
  //   icon: "fa-users",
  //   accordion: true,
  // },
  // {
  //   key: "customers",
  //   to: { name: "customers" },
  //   name: "Clientes",
  //   icon: "fa-user-tie",
  //   accordionItem: true,
  // },
  // {
  //   key: "users",
  //   to: { name: "employees" },
  //   name: "Usuarios",
  //   icon: "fa-user-cog",
  //   accordionItem: true,
  // },
  // {
  //   key: "deu",
  //   to: { name: "hardware" },
  //   name: "Cortes por deuda",
  //   icon: "fa-charging-station",
  // },
  // {
  //   key: "bills",
  //   to: { name: "bills" },
  //   name: "Facturas Gral.",
  //   icon: "fa-book",
  // },
  // {
  //   key: "hardware",
  //   to: { name: "hardware" },
  //   name: "Medidores Gral.",
  //   icon: "fa-bolt",
  // },
  // {
  //   key: "reports",
  //   to: { name: "reports" },
  //   name: "Noticias",
  //   icon: "fa-newspaper",
  // },
]);
</script>

<template>
  <main>
    <Navbar />
    <Sidebar :menu="menu" />
    <div class="p-4 sm:ml-64">
      <div class="p-4 rounded-lg mt-14">
        <RouterView />
      </div>
    </div>
  </main>
</template>
