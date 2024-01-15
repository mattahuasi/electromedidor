<script setup>
import { ref } from "vue";

const props = defineProps({
  icon: {
    type: String,
  },
  name: {
    type: String,
  },
});
const show = ref(false);
</script>

<template>
  <button
    type="button"
    class="flex items-center w-full p-2 text-base text-gray-900 transition duration-75 rounded-lg group hover:bg-blue-600 dark:text-white dark:hover:bg-blue-600"
    @click="show = !show"
  >
    <v-icon
      :name="icon"
      class="flex-shrink-0 w-5 h-5 transition duration-75 group-hover:text-gray-200 dark:group-hover:text-gray-200"
    />
    <span class="flex-1 ml-3 text-left whitespace-nowrap">{{ name }}</span>
    <v-icon
      name="fa-arrow-circle-down"
      class="w-5 h-5 transition ease-in-out delay-75"
      :class="[show ? 'rotate-180' : '']"
    />
  </button>
  <transition name="ul">
    <ul v-if="show" class="py-2 space-y-2 ml-4">
      <slot></slot>
    </ul>
  </transition>
</template>

<style>
.ul-enter-active {
  transition: all 0.3s ease-out;
}

.ul-leave-active {
  transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}

.ul-enter-from,
.ul-leave-to {
  transform: translateX(20px);
  opacity: 0;
}
</style>
