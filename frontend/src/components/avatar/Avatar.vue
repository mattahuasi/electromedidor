<script setup>
import { ref } from "vue";
import { useDark, useToggle } from "@vueuse/core";
import { useProfileStore } from "@/stores/profile";
import Dropdown from "@/components/dropdowns/Dropdown.vue";

const profileStore = useProfileStore();
const isDark = useDark();
const toggleDark = useToggle(isDark);

async function logout() {
  await profileStore.logout();
  location.reload();
}

const initials = ref("");
const fullNameArray = profileStore.fullName.split(" ");
if (fullNameArray.length >= 3)
  initials.value = fullNameArray[0].charAt(0) + fullNameArray[2].charAt(0);
else if (fullNameArray.length >= 2)
  initials.value = fullNameArray[0].charAt(0) + fullNameArray[1].charAt(0);
</script>

<template>
  <div class="flex items-center">
    <div class="flex items-center ms-3">
      <button
        class=" text-gray-800 dark:text-gray-100 mx-3 rounded-md py-1 px-5 shadow-md border border-gray-800 dark:border-gray-100 hidden md:block"
        @click="toggleDark()"
      >
        <v-icon v-if="isDark" name="fa-regular-moon"></v-icon>
        <v-icon v-else name="fa-regular-sun"></v-icon>
      </button>
      <Dropdown>
        <template v-slot:icon>
          <div>
            <button
              class="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
              type="button"
            >
              <span class="sr-only">Open user menu</span>
              <div
                class="relative inline-flex items-center justify-center w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600"
              >
                <span class="font-medium text-gray-600 dark:text-gray-300">{{
                  initials
                }}</span>
              </div>
            </button>
          </div></template
        >
        <div
          class="z-50 text-base list-none bg-gray-50 divide-y divide-gray-200 rounded shadow dark:bg-gray-700 dark:divide-gray-600"
        >
          <div class="px-4 py-3" role="none">
            <p class="text-sm text-gray-900 dark:text-white" role="none">
              {{ profileStore.fullName }}
            </p>
            <p
              class="text-sm font-medium text-gray-900 truncate dark:text-gray-300"
              role="none"
            >
              {{ profileStore.email }}
            </p>
          </div>
          <ul class="py-1" role="none">
            <li>
              <router-link
                :to="{ name: 'profile' }"
                class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
                role="menuitem"
                >Mi información</router-link
              >
            </li>
            <li>
              <router-link
                :to="{ name: 'update-password' }"
                class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
                role="menuitem"
              >
                Actualizar contraseña
              </router-link>
            </li>
            <li>
              <span
                @click="logout"
                class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
                role="menuitem"
                >Desconectarse</span
              >
            </li>
          </ul>
        </div>
      </Dropdown>
    </div>
  </div>
</template>
