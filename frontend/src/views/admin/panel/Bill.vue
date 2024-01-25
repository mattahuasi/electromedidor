<script setup>
import {
  getBillsRequest,
  deleteBillRequest,
  generateBillsRequest,
} from "@/api/bill";
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
  { key: "consumption", label: "Consumo" },
  { key: "cost", label: "Total" },
  { key: "status", label: "Estado", status: true },
  { key: "date", label: "Mes factura", date: true },
  { key: "customerId", label: "UID" },
  { key: "hardwareId", label: "HID" },
]);
const options = ref([
  { id: "update", name: "Actualizar", icon: "fa-edit" },
  { id: "delete", name: "Eliminar", icon: "fa-eraser" },
]);

async function loadData() {
  load.value = true;
  try {
    const res = await getBillsRequest();
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
      setTimeout(() => {
        items.value = [];
        loadData();
      }, 5000);
      toast.success("¡Factura eliminada con éxito!");
    } catch (error) {
      toast.error(
        "Se produjo un error al intentar generar las facturas. Por favor, inténtalo nuevamente."
      );
    }
  }
}

async function handleSubmit(event) {
  event.preventDefault();
  try {
    await generateBillsRequest();
    setTimeout(() => {
      items.value = [];
      loadData();
    }, 5000);
    toast.success("¡Facturas generadas con éxito!");
  } catch (error) {
    toast.error(
      "Se produjo un error al intentar eliminar la factura. Por favor, inténtalo nuevamente."
    );
  }
}

onMounted(() => {
  loadData();
});
</script>

<template>
  <card-data title="Facturas" icon="fa-book">
    <template v-slot:filters>
      <div class="pb-4">
        <Search v-model="searchQuery" />
      </div>

      <div class="flex justify-between items-center flex-wrap">
        <form @submit="handleSubmit">
          <button
            @submit="handleSubmit"
            class="flex items-center mr-4 h-12 text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-xs px-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            type="submit"
          >
            <v-icon name="fa-book" class="mr-1" />
            Generar Facturas
          </button>
        </form>
        <button-add :to="{ name: 'new-bills' }">Agregar Factura</button-add>
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
