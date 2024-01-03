<script setup>
import Popper from "vue3-popper";
</script>

<template>
  <Popper arrow>
    <slot name="icon"></slot>
    <template #content="{ close }">
      <div @click="close">
        <slot></slot>
      </div>
    </template>
  </Popper>
</template>
