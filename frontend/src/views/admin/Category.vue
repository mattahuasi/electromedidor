<script setup>
import { getCategoriesRequest, deleteCategoryRequest } from "@/api/category.js";
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
  { key: "priceA", label: "PrecioA" },
  { key: "priceB", label: "PrecioB" },
  { key: "priceC", label: "PrecioC" },
]);
const options = ref([
  { id: "update", name: "Actualizar", icon: "fa-edit" },
  { id: "delete", name: "Eliminar", icon: "fa-eraser" },
]);

async function loadData() {
  load.value = true;
  try {
    const res = await getCategoriesRequest();
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
      item.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      item.initialism.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
  itemsDisplay.value = filteredItems;
}

async function action(action) {
  if (action.action === "update") {
    router.push({ path: "/update/category", query: { id: action.id } });
  } else if (action.action === "delete") {
    try {
      await deleteCategoryRequest(action.id);
      items.value = [];
      loadData();
      toast.success("Categoría eliminada");
    } catch (error) {
      toast.error("Error al eliminar categoría");
    }
  }
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
    <DataTable
      :columns="columns"
      :items="itemsDisplay"
      :options="options"
      @action="action"
    />
  </card-data>
</template>
