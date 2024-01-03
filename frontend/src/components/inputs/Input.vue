<script setup>
defineEmits(["update:modelValue", "blur"]);
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
    type: [String, Number, Boolean],
    required: true,
  },
  errors: {
    type: Array,
    default: () => [],
  },
  type: {
    type: String,
    default: "text",
  },
  placeholder: {
    type: String,
    default: " ",
  },
  disabled: {
    type: Boolean,
    required: false,
    default: false,
  },
  min: {
    type: Number,
    required: false,
  },
  max: {
    type: Number,
    required: false,
  },
});
</script>

<template>
  <div class="relative w-full mb-3">
    <label
      :for="id"
      class="block uppercase text-gray-600 dark:text-gray-100 text-xs font-bold mb-2"
    >
      {{ labelText }}
    </label>
    <div class="p-1 mb-1" v-for="(error, index) of errors" :key="index">
      <p class="text-sm text-white bg-red-500 p-2 rounded-md">
        {{ error.$message }}
      </p>
    </div>
    <input
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      @blur="$emit('blur')"
      :id="id"
      :type="type"
      :placeholder="placeholder"
      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      :disabled="disabled"
      :min="min"
      :max="max"
    />
  </div>
</template>
