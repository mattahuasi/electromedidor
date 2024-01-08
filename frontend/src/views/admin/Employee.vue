<script setup>
import {
  getEmployeesRequest,
  deleteEmployeeByIdRequest,
} from "@/api/employee.js";
import { useProfileStore } from "@/stores/profile.js";
import { ref, onMounted, watch } from "vue";
import { useRouter } from "vue-router";
import { toast } from "vue-sonner";
import CardData from "@/components/cards/CardData.vue";
import Search from "@/components/inputs/Search.vue";
import ButtonAdd from "@/components/buttons/ButtonAdd.vue";
import DataTable from "@/components/tables/DataTable.vue";

const profileStore = useProfileStore();
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
  // { key: "admin", label: "Administrador", status: true },
  // { key: "createdAt", label: "Creado", date: true },
  // { key: "updatedAt", label: "Actualizado", date: true },
]);
const options = ref([
  { id: "update", name: "Actualizar", icon: "fa-edit" },
  { id: "delete", name: "Eliminar", icon: "fa-eraser" },
]);

async function loadData() {
  load.value = true;
  try {
    const res = await getEmployeesRequest();
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
    router.push({ path: "/users/update", query: { id: action.id } });
  } else if (action.action === "delete") {
    try {
      await deleteEmployeeByIdRequest(action.id);
      items.value = [];
      loadData();
      toast.success("Usuario eliminado");
    } catch (error) {
      toast.error("Error al eliminar usuario");
    }
  }
}

onMounted(async () => {
  loadData();
  try {
    if (!profileStore.isAdmin) options.value.length = 0;
    else if (profileStore.isAdmin)
      columns.value.push(
        { key: "admin", label: "Administrador", status: true },
        { key: "createdAt", label: "Creado", date: true },
        { key: "updatedAt", label: "Actualizado", date: true }
      );
  } catch (error) {
    toast.error("Error al cargar datos");
  }
});
</script>

<template>
  <card-data title="Usuarios" icon="fa-user-cog">
    <template v-slot:filters>
      <div class="pb-4">
        <Search v-model="searchQuery" />
      </div>
      <button-add to="/users/new">Agregar Usuario</button-add>
    </template>
    <DataTable
      :columns="columns"
      :items="itemsDisplay"
      :options="options"
      @action="action"
    />
  </card-data>
</template>
