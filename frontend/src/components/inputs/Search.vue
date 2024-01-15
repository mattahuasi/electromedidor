<script setup>
const props = defineProps({
  modelValue: {
    type: String,
    required: true,
  },
});
</script>

<template>
  <label for="table-search" class="sr-only">Search</label>
  <div class="relative mt-1">
    <div
      class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none"
    >
      <v-icon
        name="fa-search"
        class="w-4 h-4 text-gray-500 dark:text-gray-400"
      />
    </div>
    <input
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      id="table-search"
      type="text"
      class="block p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-60 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-700 dark:focus:border-blue-700 focus:outline-none"
      placeholder="Buscar"
    />
  </div>
</template>
