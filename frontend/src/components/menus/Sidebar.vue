<script setup>
import Anchor from "@/components/anchors/Anchor.vue";
import AnchorAccordion from "@/components/anchors/AnchorAccordion.vue";
import { useUtilsStore } from "@/stores/utils.js";

const utilsStore = useUtilsStore();
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
        <li>
          <Anchor to="/dashboard" icon="fa-flipboard" name="Panel de control" />
        </li>
        <li>
          <Anchor to="/customers" icon="fa-users" name="Usuarios" />
        </li>
        <li>
          <Anchor
            to="/hardware"
            icon="fa-charging-station"
            name="Cortes por deuda"
          />
        </li>
        <li>
          <Anchor to="/bills" icon="fa-book" name="Facturas Gral." />
        </li>
        <li>
          <Anchor to="/categories" icon="fa-layer-group" name="Categorías" />
        </li>
        <li>
          <Anchor to="/reports" icon="fa-newspaper" name="Noticias" />
        </li>
      </ul>
    </div>
  </aside>
</template>
