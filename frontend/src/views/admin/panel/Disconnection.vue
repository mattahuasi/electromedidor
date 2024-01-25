<script setup>
import {
  getHardwareRequest,
  getOneHardwareRequest,
  deleteHardwareRequest,
  getHardwareDebtRequest,
} from "@/api/hardware";
import { useProfileStore } from "@/stores/profile";
import { ref, onMounted, watch } from "vue";
import { useRouter } from "vue-router";
import { toast } from "vue-sonner";
import CardData from "@/components/cards/CardData.vue";
import Search from "@/components/inputs/Search.vue";
import ButtonAdd from "@/components/buttons/ButtonAdd.vue";
import DataTable from "@/components/tables/DataTable.vue";

const useProfile = useProfileStore();
const mqttClient = ref(useProfile.mqttClient);
const router = useRouter();
const items = ref([]);
const itemsDisplay = ref([]);
const searchQuery = ref("");
const load = ref(true);
const columns = ref([
  { key: "id", label: "ID" },
  { key: "name", label: "Nombre" },
  { key: "address", label: "Dirección" },
  { key: "debt", label: "Facturas adeudadas" },
  { key: "key", label: "Llave", lock: true },
  { key: "area", label: "Área", area: true },
  { key: "customerId", label: "UID" },
]);
const options = ref([
  { id: "on", name: "Activar", icon: "fa-unlock" },
  { id: "off", name: "Desactivar", icon: "fa-lock" },
]);

async function loadData() {
  load.value = true;
  try {
    const res = await getHardwareDebtRequest();
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
      item.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      item.address.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
  itemsDisplay.value = filteredItems;
}

async function action(action) {
  if (action.action === "on" || action.action === "off") {
    try {
      const res = await getOneHardwareRequest(action.id);
      const hardware = res.data;
      mqttClient.value.publish(
        `client/medidor/${hardware.name}`,
        action.action === "on" ? "1" : "0"
      );
      toast.success(
        `¡Medidor ${hardware.name} ${
          action.action === "on" ? "activado" : "desactivado"
        } exitosamente!`
      );
      setTimeout(() => {
        items.value = [];
        loadData();
      }, 1000);
    } catch (error) {
      toast.error(
        `Se produjo un error al ${
          action.action === "on" ? "intentar activar" : "intentar desactivar"
        } el medidor.`
      );
    }
  }
}

onMounted(() => {
  loadData();
});
</script>

<template>
  <card-data title="Cortes por deuda" icon="fa-charging-station">
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
