<script setup>
import { useUtilsStore } from "@/stores/utils";

const utilsStore = useUtilsStore();
const props = defineProps({
  to: {
    type: String,
    default: "/",
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
      class="flex items-center p-2 rounded-lg hover:bg-sky-600 group"
      :class="[isActive ? 'text-gray-200 bg-sky-600 ' : 'text-gray-200 ']"
    >
      <v-icon
        :name="icon"
        class="flex-shrink-0 w-5 h-5 transition duration-75"
      />
      <span class="flex-1 ml-3 whitespace-nowrap">{{ name }}</span>
    </a>
  </router-link>
</template>
