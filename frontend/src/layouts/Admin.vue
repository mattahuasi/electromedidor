<script setup>
import Navbar from "@/components/menus/Navbar.vue";
import Sidebar from "@/components/menus/Sidebar.vue";
</script>

<template>
  <main>
    <Navbar />
    <Sidebar />
    <div class="p-4 sm:ml-64">
      <div class="p-4 rounded-lg mt-14">
        <RouterView />
      </div>
    </div>
  </main>
</template>
