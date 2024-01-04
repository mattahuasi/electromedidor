<script setup>
defineEmits(["update:modelValue"]);
const props = defineProps({
  id: {
    type: String,
    required: true,
  },
  labelText: {
    type: String,
    required: true,
  },
  modelValue: {
    type: Boolean,
    default: false,
  },
  errors: {
    type: Array,
    default: () => [],
  },
});
</script>

<template>
  <div class="relative w-full mb-3">
    <div class="p-1 mb-1" v-for="(error, index) of errors" :key="index">
      <p class="text-sm text-white bg-red-500 p-2 rounded-md">
        {{ error.$message }}
      </p>
    </div>
    <div
      class="flex items-center pl-4 mt-4 border border-gray-200 rounded dark:border-gray-700"
    >
      <input
        :id="id"
        type="checkbox"
        :checked="modelValue"
        @click="$emit('update:modelValue', $event.target.checked)"
        class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
      />
      <label
        :for="id"
        class="w-full py-4 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
        >{{ labelText }}</label
      >
    </div>
  </div>
</template>
