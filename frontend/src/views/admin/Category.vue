<script setup>
import { getCategoriesRequest } from "@/api/category.js";

import { ref, onMounted, watch } from "vue";
import { useRouter } from "vue-router";
import { toast } from "vue-sonner";

import CardData from "@/components/cards/CardData.vue";
import Search from "@/components/inputs/Search.vue";
import ButtonAdd from "@/components/buttons/ButtonAdd.vue";
import DataTable from "@/components/tables/DataTable.vue";

const router = useRouter();
const items = ref([]);
const itemsDisplay = ref([]);
const searchQuery = ref("");
const load = ref(true);
const columns = ref([
  { key: "id", label: "ID" },
  { key: "name", label: "Nombre" },
  { key: "initialism", label: "Siglas" },
  { key: "minA", label: "MinA" },
  { key: "maxA", label: "MaxA" },
  { key: "priceA", label: "PrecioA" },
  { key: "minB", label: "MinB" },
  { key: "maxB", label: "MaxB" },
  { key: "priceB", label: "PrecioB" },
  { key: "minC", label: "MinC" },
  { key: "maxC", label: "MaxC" },
  { key: "priceC", label: "PrecioC" },
]);

async function loadData() {
  load.value = true;
  try {
    const res = await getCategoriesRequest();
    items.value = res.data;
    itemsDisplay.value = items.value;
    console.log(itemsDisplay);
    load.value = false;
  } catch (error) {
    toast.error("Error al cargar datos");
  }
}

watch(searchQuery, () => {
  searchItems();
});

function searchItems() {
  const filteredItems = items.value.filter(
    (item) =>
      item.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      item.initialism.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
  itemsDisplay.value = filteredItems;
}

onMounted(async () => {
  loadData();
});
</script>

<template>
  <card-data title="Categorías" icon="fa-layer-group">
    <template v-slot:filters>
      <div class="pb-4">
        <Search v-model="searchQuery" />
      </div>
      <button-add to="/new/category">Agregar categoría</button-add>
    </template>
    <DataTable :columns="columns" :items="itemsDisplay" />
  </card-data>
</template>
