<script setup>
import {
  getCustomersRequest,
  deleteCustomerByIdRequest,
} from "@/api/customer.js";
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
  { key: "firstName", label: "Nombres" },
  { key: "lastName", label: "Apellidos" },
  { key: "ci", label: "Cédula de identidad" },
  { key: "email", label: "Correo electrónico" },
  { key: "phone", label: "Nro. de contacto" },
  { key: "createdAt", label: "Fecha de creación", date: true },
  { key: "updatedAt", label: "Ultima modificación", date: true },
]);
const options = ref([
  { id: "update", name: "Actualizar", icon: "fa-edit" },
  { id: "show", name: "Ver medidores", icon: "fa-bolt" },
  { id: "delete", name: "Eliminar", icon: "fa-eraser" },
]);

async function loadData() {
  load.value = true;
  try {
    const res = await getCustomersRequest();
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

async function action(action) {
  if (action.action === "update") {
    router.push({ name: "update/customers", query: { id: action.id } });
  } else if (action.action === "show") {
    router.push({ name: "hardware", params: { id: action.id } });
  } else if (action.action === "delete") {
    try {
      await deleteCustomerByIdRequest(action.id);
      items.value = [];
      loadData();
      toast.success("Cliente eliminado");
    } catch (error) {
      toast.error("Error al eliminar cliente");
    }
  }
}

onMounted(async () => {
  loadData();
});
</script>

<template>
  <card-data title="Clientes" icon="fa-user-tie">
    <template v-slot:filters>
      <div class="pb-4">
        <Search v-model="searchQuery" />
      </div>
      <button-add :to="{ name: 'new/customers' }">Agregar Cliente</button-add>
    </template>
    <DataTable
      :columns="columns"
      :items="itemsDisplay"
      :options="options"
      @action="action"
    />
  </card-data>
</template>
