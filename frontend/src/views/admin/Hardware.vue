<script setup>
import { ref, onMounted } from "vue";
import { getHardwareRequest } from "@/api/hardware.js";

const items = ref([]);

async function loadData() {
  try {
    const res = await getHardwareRequest();
    items.value = res.data;
    console.log(items.value);
  } catch (error) {
    console.log(error);
  }
}

onMounted(async () => {
  loadData();
});
</script>

<template>
  <h2 class="font-bold">Equipos</h2>
  <ul>
    <li v-for="item in items" :key="item.id">
      {{ item.id }} - {{ item.mack }}
    </li>
  </ul>
</template>
