<script setup>
import { useRouter } from "vue-router";

const router = useRouter();

function returnButton() {
  router.go(-1);
}
</script>

<template>
  <button
    type="button"
    class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
    @click="returnButton"
  >
    <v-icon name="fa-arrow-left" class="mr-2" />
    Regresar
  </button>
</template>
