<script setup>
import { getCustomerHardwareRequest } from "@/api/customer";
import { getOneHardwareRequest, deleteHardwareRequest } from "@/api/hardware";
import { useProfileStore } from "@/stores/profile";
import { ref, onMounted, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { toast } from "vue-sonner";
import CardData from "@/components/cards/CardData.vue";
import Search from "@/components/inputs/Search.vue";
import ButtonAdd from "@/components/buttons/ButtonAdd.vue";
import DataTable from "@/components/tables/DataTable.vue";

const useProfile = useProfileStore();
const mqttClient = ref(useProfile.mqttClient);
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
]);
const options = ref([
  { id: "update", name: "Actualizar", icon: "fa-edit" },
  { id: "show", name: "Ver gráficos", icon: "fa-chart-pie" },
  { id: "online", name: "Ver lecturas", icon: "fa-chart-line" },
  { id: "on", name: "Activar", icon: "fa-unlock" },
  { id: "off", name: "Desactivar", icon: "fa-lock" },
  { id: "delete", name: "Eliminar", icon: "fa-eraser" },
]);

async function loadData() {
  load.value = true;
  try {
    const res = await getCustomerHardwareRequest();
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
  if (action.action === "update") {
    router.push({ name: "client-update-hardware", query: { id: action.id } });
  } else if (action.action === "show") {
    router.push({ name: "client-show-hardware", query: { id: action.id } });
  } else if (action.action === "online") {
    router.push({ name: "client-online-hardware", query: { id: action.id } });
  } else if (action.action === "on" || action.action === "off") {
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
  } else if (action.action === "delete") {
    try {
      await deleteHardwareRequest(action.id);
      items.value = [];
      loadData();
      toast.success("¡Medidor eliminado exitosamente!");
    } catch (error) {
      toast.error(
        "Se produjo un error al intentar eliminar el medidor. Por favor, inténtalo nuevamente."
      );
    }
  }
}

onMounted(() => {
  loadData();
});
</script>

<template>
  <card-data title="Medidores" icon="fa-charging-station">
    <template v-slot:filters>
      <div class="pb-4">
        <Search v-model="searchQuery" />
      </div>
      <button-add :to="{ name: 'client-new-hardware' }"
        >Agregar medidor</button-add
      >
    </template>
    <DataTable
      :columns="columns"
      :items="itemsDisplay"
      :options="options"
      @action="action"
    />
  </card-data>
</template>
