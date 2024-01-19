<script setup>
import { ref } from "vue";
import Navbar from "@/components/menus/Navbar.vue";
import Sidebar from "@/components/menus/Sidebar.vue";

const items = ref([
  {
    key: "dashboard",
    to: { name: "client-dashboard" },
    name: "Panel de control",
    icon: "fa-chart-pie",
  },
  {
    key: "bills",
    to: { name: "client-bills" },
    name: "Facturas",
    icon: "fa-book",
  },
  {
    key: "hardware",
    to: { name: "client-hardware" },
    name: "Medidores",
    icon: "fa-bolt",
  },
]);
</script>

<template>
  <Navbar />
  <Sidebar :items="items" />
  <main>
    <div class="p-2 sm:ml-64 bg-gray-50 dark:bg-gray-700 min-h-screen">
      <div class="p-2 rounded-lg mt-16">
        <RouterView />
      </div>
    </div>
  </main>
</template>
