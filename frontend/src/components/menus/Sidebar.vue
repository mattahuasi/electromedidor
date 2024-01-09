<script setup>
import Anchor from "@/components/anchors/Anchor.vue";
import AnchorAccordion from "@/components/anchors/AnchorAccordion.vue";
import { useUtilsStore } from "@/stores/utils";

const utilsStore = useUtilsStore();
const prop = defineProps({
  menu: {
    type: Array,
    required: true,
  },
});
</script>

<template>
  <aside
    class="fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform bg-gray-700 border-r border-gray-600 sm:translate-x-0"
    :class="[
      utilsStore.sideBarShow
        ? 'translate-x-0 ease-out'
        : '-translate-x-full ease-in',
    ]"
    aria-label="Sidebar"
  >
    <div class="h-full px-3 pb-4 overflow-y-auto bg-gray-700">
      <ul class="space-y-2 font-medium">
        <li v-for="item in menu">
          <AnchorAccordion
            v-if="item.accordion"
            name="Usuarios"
            icon="fa-users"
          >
            <li v-for="item in menu">
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
