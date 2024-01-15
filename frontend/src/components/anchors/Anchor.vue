<script setup>
import { useUtilsStore } from "@/stores/utils";

const utilsStore = useUtilsStore();
const props = defineProps({
  to: {
    type: Object,
    default: {
      name: "/",
    },
  },
  icon: {
    type: String,
  },
  name: {
    type: String,
  },
});
</script>

<template>
  <router-link :to="to" v-slot="{ href, navigate, isActive }">
    <a
      :href="href"
      @click="
        () => {
          navigate;
          utilsStore.toggleSideBar();
        }
      "
      class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-blue-600 dark:hover:bg-blue-600 group"
      :class="[isActive ? 'text-white bg-blue-700 ' : 'text-gray-900 ']"
    >
      <v-icon
        :name="icon"
        class="flex-shrink-0 w-5 h-5 transition duration-75"
      />
      <span class="flex-1 ml-3 whitespace-nowrap">{{ name }}</span>
    </a>
  </router-link>
</template>
