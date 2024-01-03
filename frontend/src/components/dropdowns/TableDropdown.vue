<script setup>
import { createPopper } from "@popperjs/core";

const props = defineProps({
  options: {
    default: [],
  },
  id: {
    default: "",
  },
});

let dropdownPopoverShow = false;

function toggleDropdown(event) {
  event.preventDefault();
  dropdownPopoverShow = !dropdownPopoverShow;
  if (dropdownPopoverShow) {
    createPopper(this.$refs.btnDropdownRef, this.$refs.popoverDropdownRef, {
      placement: "bottom-start",
    });
  }
}

function emit(action) {
  dropdownPopoverShow = false;
  this.$emit("emit", action);
}
</script>

<template>
  <div>
    <a
      class="text-blueGray-500 py-1 px-3"
      href="#pablo"
      ref="btnDropdownRef"
      v-on:click="toggleDropdown($event)"
    >
      <i class="fas fa-ellipsis-v"></i>
    </a>
    <div
      ref="popoverDropdownRef"
      class="bg-white text-base z-50 float-left py-2 list-none text-left rounded shadow-lg min-w-48"
      v-bind:class="{
        hidden: !dropdownPopoverShow,
        block: dropdownPopoverShow,
      }"
    >
      <a
        href="javascript:void(0);"
        class="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"
      >
        Acciones
      </a>
      <a
        v-for="(item, index) in options"
        :key="index"
        href="javascript:void(0);"
        class="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"
        @click="emit({ action: item.id, id: id })"
      >
        <i :class="item.icon"></i>
        {{ item.name }}
      </a>
    </div>
  </div>
</template>
