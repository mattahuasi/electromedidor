<script setup>
import { getReadingsRequest } from "@/api/reading.js";
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { toast } from "vue-sonner";
import socket from "@/api/socket.js";

const route = useRoute();
const items = ref([]);

onMounted(async () => {
  try {
    const res = await getReadingsRequest(route.query.id);
    items.value = res.data;
  } catch (error) {
    toast.error("Error al cargar datos");
  }
  /* socket.on("connect", () => {
    console.log(socket.id);
  });

  socket.on("mqtt", (data) => {
    console.log(data);
    array.value.push(data);
  }); */
});
</script>

<template>
  <h2>Datos</h2>
  <ul>
    <li v-for="(item, index) in items" :key="index">{{ item }}</li>
  </ul>
</template>
