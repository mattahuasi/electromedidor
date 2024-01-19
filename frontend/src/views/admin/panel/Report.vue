<script setup>
import { getReportsRequest } from "@/api/report";
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
  { key: "title", label: "Titulo" },
  { key: "detail", label: "Detalle" },
  { key: "content", label: "Contenido", status: true },
  { key: "type", label: "Tipo" },
  { key: "begin", label: "Fecha de inicio", date: true },
  { key: "end", label: "Fecha final", date: true },
]);
const options = ref([
  { id: "update", name: "Actualizar", icon: "fa-edit" },
  { id: "delete", name: "Eliminar", icon: "fa-eraser" },
]);

async function loadData() {
  load.value = true;
  try {
    const res = await getReportsRequest();
    items.value = res.data;
    itemsDisplay.value = items.value;
    load.value = false;
  } catch (error) {
    toast.error(
      "Se produjo un error al cargar los datos. Por favor, inténtalo de nuevo."
    );
  }
}

watch(searchQuery, () => {
  searchItems();
});

function searchItems() {
  const filteredItems = items.value.filter(
    (item) =>
      item.consumption
        .toLowerCase()
        .includes(searchQuery.value.toLowerCase()) ||
      item.cost.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      item.customerId.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      item.hardwareId.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
  itemsDisplay.value = filteredItems;
}

async function action(action) {
  if (action.action === "update") {
    router.push({ name: "update-bills", query: { id: action.id } });
  } else if (action.action === "delete") {
    try {
      await deleteBillRequest(action.id);
      items.value = [];
      loadData();
      toast.success("¡Noticia eliminada exitosamente!");
    } catch (error) {
      toast.error(
        "Se produjo un error al intentar eliminar la noticia. Por favor, inténtalo nuevamente."
      );
    }
  }
}

onMounted(() => {
  loadData();
});
</script>

<template>
  <card-data title="Noticias" icon="fa-newspaper">
    <template v-slot:filters>
      <div class="pb-4">
        <Search v-model="searchQuery" />
      </div>
    </template>
    <DataTable
      :columns="columns"
      :items="itemsDisplay"
      :options="options"
      @action="action"
    />
  </card-data>
</template>
