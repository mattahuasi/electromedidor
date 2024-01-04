<script setup>
import {
  getCustomerByIdRequest,
  getCustomerHardwareRequest,
} from "@/api/customer.js";
import { deleteHardwareRequest } from "@/api/hardware.js";
import { ref, onMounted, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { toast } from "vue-sonner";
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
  { key: "mack", label: "MACK" },
  { key: "address", label: "Dirección" },
  { key: "category", label: "Categoría" },
  { key: "key", label: "Llave", lock: true },
  { key: "status", label: "Estado" },
  { key: "urban", label: "Area", area: true },
]);
const options = ref([
  { id: "update", name: "Actualizar", icon: "fa-edit" },
  { id: "delete", name: "Eliminar", icon: "fa-eraser" },
]);

async function loadData() {
  load.value = true;
  try {
    const res = await getCustomerHardwareRequest(route.params.id);
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
      item.mack.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      item.address.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
  itemsDisplay.value = filteredItems;
}

async function action(action) {
  if (action.action === "update") {
    router.push({ path: "/update/category", query: { id: action.id } });
  } else if (action.action === "delete") {
    try {
      await deleteHardwareRequest(action.id);
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
  try {
    const res = await getCustomerByIdRequest(route.params.id);
    customer.value = res.data;
  } catch (error) {
    toast.error("Error al cargar datos del usuario");
  }
});
</script>

<template>
  <!-- <div class="flex flex-wrap mt-4">
    <article class="w-full px-4">
      <h3 class="">Datos del usuario</h3>
      <body>
        <p>
          Nombre/s y apellido/s
          <span>{{ customer.firstName + " " + customer.lastName }}</span>
        </p>
        <p>
          Teléfono/Celular <span>{{ customer.phone }}</span>
        </p>
        <p>
          Correo electrónico <span>{{ customer.email }}</span>
        </p>
      </body>
    </article>
  </div> -->
  <card-data title="Medidores" icon="fa-bolt">
    <template v-slot:filters>
      <div class="pb-4">
        <Search v-model="searchQuery" />
      </div>
      <button-add to="new/hardware">Agregar medidor</button-add>
    </template>
    <DataTable
      :columns="columns"
      :items="itemsDisplay"
      :options="options"
      @action="action"
    />
  </card-data>
</template>
