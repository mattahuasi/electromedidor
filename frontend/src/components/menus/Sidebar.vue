<script setup>
import { useUtilsStore } from "@/stores/utils";
import Anchor from "@/components/anchors/Anchor.vue";
import AnchorAccordion from "@/components/anchors/AnchorAccordion.vue";

const utilsStore = useUtilsStore();
const prop = defineProps({
  items: {
    type: Array,
    required: true,
  },
});
</script>

<template>
  <aside
    id="logo-sidebar"
    class="fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform -translate-x-full bg-gray-100 border-r border-gray-200 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700"
    :class="[
      utilsStore.sideBarShow
        ? 'translate-x-0 ease-out'
        : '-translate-x-full ease-in',
    ]"
    aria-label="Sidebar"
  >
    <div class="h-full px-3 pb-4 overflow-y-auto bg-gray-100 dark:bg-gray-800">
      <ul class="space-y-2 font-medium">
        <li v-for="item in items">
          <AnchorAccordion
            v-if="item.accordion"
            name="Usuarios"
            icon="fa-users"
          >
            <li v-for="item in items">
              <Anchor
                v-if="item.accordionItem"
                :to="item.to"
                :icon="item.icon"
                :name="item.name"
              >
                {{ row.label }}</Anchor
              >
            </li>
          </AnchorAccordion>
          <Anchor
            v-else-if="!item.accordionItem"
            :to="item.to"
            :icon="item.icon"
            :name="item.name"
          >
            {{ row.label }}</Anchor
          >
        </li>
      </ul>
    </div>
  </aside>
</template>
