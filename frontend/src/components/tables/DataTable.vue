<script setup>
import { ref, computed } from "vue";
import { fullDateFormat } from "@/utils/index.js";
import TableDropdown from "@/components/dropdowns/TableDropdown.vue";
import Dropdown from "@/components/dropdowns/Dropdown.vue";

const emit = defineEmits(["action"]);
const props = defineProps({
  columns: {
    type: Array,
    required: true,
  },
  items: {
    type: Array,
    required: true,
  },
  options: {
    type: Array,
    required: true,
  },
});

const currentPage = ref(1);
const itemsPerPage = ref(5);
const totalPages = computed(() => {
  return Math.ceil(props.items.length / itemsPerPage.value);
});

const itemsDisplay = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value;
  const end = start + itemsPerPage.value;
  return props.items.slice(start, end);
});

function dateFormatted(date) {
  return fullDateFormat(date);
}

function action(data) {
  emit("action", data);
}
</script>

<template>
  <div class="relative overflow-x-auto sm:rounded-lg m-4">
    <table class="w-full text-left text-gray-500 dark:text-gray-400">
      <thead class="text-sm text-gray-200 bg-indigo-500">
        <th
          scope="col"
          v-for="column in columns"
          :key="column.key"
          class="px-4 py-3"
        >
          {{ column.label }}
        </th>
        <th v-if="options.length > 0" class="px-4 py-3">
          <span>Acciones</span>
        </th>
      </thead>
      <tbody>
        <tr
          class="text-xs text-gray-700 border-b"
          v-for="(item, index) in itemsDisplay"
          :key="item.id"
          :class="
            index % 2 === 0
              ? 'bg-gray-100 hover:bg-gray-300'
              : 'bg-gray-200 hover:bg-gray-300'
          "
        >
          <td class="px-4 py-4" v-for="column in columns" :key="column.key">
            <span v-if="column.status" class="flex justify-center">
              <span
                class="rounded-full text-white py-1 px-1"
                :class="[item[column.key] ? 'bg-green-600' : 'bg-red-600']"
              >
                <v-icon :name="item[column.key] ? 'fa-check' : 'fa-times'"
              /></span>
            </span>
            <span v-else-if="column.lock" class="flex justify-center"
              ><span
                :class="[item[column.key] ? 'text-green-600' : 'text-red-600']"
              >
                <v-icon
                  :name="item[column.key] ? 'fa-unlock' : 'fa-lock'"
                  scale="1.5" /></span
            ></span>
            <span v-else-if="column.area">
              {{ item[column.key] ? "Urbano" : "Rural" }}
            </span>
            <span v-else-if="column.date">
              {{ dateFormatted(item[column.key]) }}
            </span>
            <span v-else>
              {{ item[column.key] }}
            </span>
          </td>
          <td v-if="options.length > 0" class="px-4 py-2">
            <table-dropdown :options="options" @emit="emit" :id="item.id" />
            <Dropdown>
              <template v-slot:icon>
                <div>
                  <button type="button" class="flex text-sm rounded-full">
                    <v-icon
                      name="fa-ellipsis-v"
                      class="w-6 h-6 rounded-full text-gray-600 dark:text-gray-200 p-1"
                    />
                  </button>
                </div>
              </template>
              <div
                class="z-50 text-base list-none bg-white divide-y divide-gray-100 rounded shadow dark:bg-gray-700 dark:divide-gray-600"
              >
                <ul class="py-1 text-left" role="none">
                  <li v-for="(option, index) in options" :key="index">
                    <span
                      class="block px-4 py-2 cursor-pointer text-xs text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
                      @click="action({ action: option.id, id: item.id })"
                      ><v-icon :name="option.icon" />{{ option.name }}</span
                    >
                  </li>
                </ul>
              </div>
            </Dropdown>
          </td>
        </tr>
      </tbody>
    </table>

    <nav
      class="flex items-center justify-between pt-4 pb-8"
      aria-label="Table navigation"
    >
      <span class="text-sm font-normal text-gray-500 dark:text-gray-400"
        >Pagina
        <span class="font-semibold text-gray-900 dark:text-white">{{
          currentPage
        }}</span>
        de
        <span class="font-semibold text-gray-900 dark:text-white">{{
          totalPages
        }}</span></span
      >
      <ul class="inline-flex -space-x-px text-sm h-8">
        <li class="mr-4 flex">
          <label
            class="flex items-center text-gray-500 dark:text-gray-400 px-3 h-8 ml-0"
            for="itemsPerPage"
            >Filas por pagina</label
          >
          <select
            name="itemsPerPage"
            v-model="itemsPerPage"
            class="flex items-center justify-center px-3 h-8 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
          >
            <option selected value="5">5</option>
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="50">50</option>
            <option value="100">100</option>
          </select>
        </li>
        <li>
          <button
            type="button"
            class="flex items-center justify-center px-3 h-8 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            @click="currentPage--"
            :disabled="currentPage === 1"
          >
            <v-icon name="fa-arrow-left" class="h-4 mt-1" /> Anterior
          </button>
        </li>
        <li>
          <button
            type="button"
            @click="currentPage++"
            :disabled="currentPage === totalPages"
            class="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
          >
            Siguiente <v-icon name="fa-arrow-right" class="h-4 mt-1" />
          </button>
        </li>
      </ul>
    </nav>
  </div>
</template>
