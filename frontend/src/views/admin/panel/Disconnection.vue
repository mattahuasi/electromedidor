<script setup>
import { getCustomerHardwareRequest } from "@/api/customer";
import {
  getHardwareRequest,
  getOneHardwareRequest,
  deleteHardwareRequest,
} from "@/api/hardware";
import { ref, onMounted, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { toast } from "vue-sonner";
import mqttClient from "@/utils/mqtt";
import CardData from "@/components/cards/CardData.vue";
import Search from "@/components/inputs/Search.vue";
import ButtonAdd from "@/components/buttons/ButtonAdd.vue";
import DataTable from "@/components/tables/DataTable.vue";

const route = useRoute();
const router = useRouter();
const customer = ref();
const items = ref([]);
const itemsDisplay = ref([]);
const searchQuery = ref("");
const load = ref(true);
const columns = ref([
  { key: "id", label: "ID" },
  { key: "name", label: "Nombre" },
  { key: "address", label: "Dirección" },
  { key: "key", label: "Llave", lock: true },
  { key: "area", label: "Área", area: true },
  { key: "customerId", label: "UID" },
  { key: "createdAt", label: "Fecha de creación", date: true },
  { key: "updatedAt", label: "Ultima modificación", date: true },
]);
const options = ref([
  { id: "update", name: "Actualizar", icon: "fa-edit" },
  { id: "show", name: "Ver gráficos", icon: "fa-chart-line" },
  { id: "on", name: "Activar", icon: "fa-unlock" },
  { id: "off", name: "Desactivar", icon: "fa-lock" },
  { id: "delete", name: "Eliminar", icon: "fa-eraser" },
]);

async function loadData() {
  load.value = true;
  try {
    if (route.params.id) {
      const res = await getCustomerHardwareRequest(route.params.id);
      items.value = res.data;
      itemsDisplay.value = items.value;
      load.value = false;
    } else {
      const res = await getHardwareRequest();
      items.value = res.data;
      itemsDisplay.value = items.value;
      load.value = false;
    }
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
      item.address.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
  itemsDisplay.value = filteredItems;
}

async function action(action) {
  if (action.action === "update") {
    router.push({ name: "update-hardware", query: { id: action.id } });
  } else if (action.action === "show") {
    router.push({ name: "show-hardware", query: { id: action.id } });
  } else if (action.action === "on" || action.action === "off") {
    try {
      const res = await getOneHardwareRequest(action.id);
      const hardware = res.data;
      mqttClient.publish(
        `client/medidor/${hardware.name}`,
        action.action === "on" ? "1" : "0"
      );
      toast.success(
        `Medidor ${action.action === "on" ? "activado" : "desactivado"}`
      );
      setTimeout(() => {
        items.value = [];
        loadData();
      }, 500);
    } catch (error) {
      toast.error(
        `Error al ${action.action === "on" ? "activar" : "desactivar"} medidor`
      );
    }
  } else if (action.action === "delete") {
    try {
      await deleteHardwareRequest(action.id);
      items.value = [];
      loadData();
      toast.success("Medidor eliminado");
    } catch (error) {
      toast.error("Error al eliminar medidor");
    }
  }
}

onMounted(() => {
  loadData();
});
</script>

<template>
  <card-data title="Medidores" icon="fa-bolt">
    <template v-slot:filters>
      <div class="pb-4">
        <Search v-model="searchQuery" />
      </div>
      <button-add :to="{ name: 'new-hardware' }">Agregar medidor</button-add>
    </template>
    <DataTable
      :columns="columns"
      :items="itemsDisplay"
      :options="options"
      @action="action"
    />
  </card-data>
</template>
