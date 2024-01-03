<script setup>
const props = defineProps({
  to: {
    type: String,
    default: "/",
  },
});
</script>

<template>
  <router-link
    :to="to"
    type="button"
    class="flex items-center h-12 text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-xs px-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
  >
    <v-icon name="fa-plus" class="mr-1" />
    <slot> </slot>
  </router-link>
</template>
