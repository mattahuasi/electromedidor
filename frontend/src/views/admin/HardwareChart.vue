<script setup>
import { getReadingsRequest } from "@/api/reading.js";
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import LineChart from "@/components/charts/LineChart.vue";

const route = useRoute();
const items = ref([]);
const load = ref(true);

async function loadData() {
  load.value = true;
  try {
    const res = await getReadingsRequest(route.query.id);
    items.value = res.data;
    console.log(items.value);
    load.value = false;
  } catch (error) {
    toast.error("Error al cargar datos");
  }
}

onMounted(() => {
  loadData();
});
</script>

<template>
  <LineChart :title="'Potencia'" :items="items" />
  <ul>
    <li v-for="(item, index) in items" :key="index">
      {{ item }}
    </li>
  </ul>
</template>
