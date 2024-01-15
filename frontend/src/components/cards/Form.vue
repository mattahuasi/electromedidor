<script setup>
import ButtonReturn from "@/components/buttons/ButtonReturn.vue";
import ButtonSave from "@/components/buttons/ButtonSave.vue";

const emit = defineEmits(["handleSubmit"]);
const props = defineProps({
  title: {
    type: String,
    default: "",
  },
  description: {
    type: String,
    default: "",
  },
  icon: {
    type: String,
    default: "",
  },
});

function handleSubmit(e) {
  if (e) e.preventDefault();
  emit("handleSubmit");
}
</script>

<template>
  <div class="flex flex-wrap mt-4">
    <div class="w-full mb-4 px-4">
      <div
        class="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-gray-100 dark:bg-gray-800 border-0"
      >
        <div
          class="rounded-t bg-gray-100 dark:bg-gray-800 text-dark dark:text-white mb-0 px-6 py-6"
        >
          <div class="text-center flex justify-between">
            <h6 class="text-gray-700 dark:text-white text-xl font-bold">
              {{ title }} <v-icon :name="icon" scale="1.5" />
            </h6>
          </div>
        </div>
        <div class="flex-auto px-4 lg:px-10 py-2 pt-0">
          <form :onSubmit="handleSubmit">
            <slot></slot>
            <div class="w-full mx-auto p-4 md:py-4">
              <div class="flex items-center justify-between">
                <div class="text-center flex items-center mb-4">
                  <button-return />
                </div>
                <div class="text-center flex items-center mb-4">
                  <button-save />
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
