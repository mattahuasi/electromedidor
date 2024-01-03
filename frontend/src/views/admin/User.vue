<script setup>
import { getUsersRequest } from "@/api/user.js";

import { ref, onMounted, watch } from "vue";
import { useRouter } from "vue-router";
import { toast } from "vue-sonner";

import CardData from "@/components/cards/CardData.vue";
import Search from "@/components/inputs/Search.vue";
import DataTable from "@/components/tables/DataTable.vue";

const router = useRouter();
const items = ref([]);
const itemsDisplay = ref([]);
const searchQuery = ref("");
const load = ref(true);
const columns = ref([
  { key: "id", label: "ID" },
  { key: "firstName", label: "Nombre/s" },
  { key: "lastName", label: "Apellidos" },
  { key: "ci", label: "CI" },
  { key: "email", label: "Correo electrónico" },
  { key: "admin", label: "Administrador", status: true },
  { key: "createdAt", label: "Creado", date: true },
]);

async function loadData() {
  load.value = true;
  try {
    const res = await getUsersRequest();
    items.value = res.data;
    itemsDisplay.value = items.value;
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
      item.firstName.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      item.lastName.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      item.ci.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      item.email.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
  itemsDisplay.value = filteredItems;
}

onMounted(async () => {
  loadData();
});
</script>

<template>
  <card-data title="Usuarios" icon="fa-user-cog">
    <template v-slot:filters>
      <div class="pb-4">
        <Search v-model="searchQuery" />
      </div>
    </template>
    <DataTable :columns="columns" :items="itemsDisplay" />
  </card-data>
</template>
