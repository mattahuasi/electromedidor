<script setup>
import { useProfileStore } from "@/stores/profile.js";
import Dropdown from "@/components/dropdowns/Dropdown.vue";

const profileStore = useProfileStore();

async function logout() {
  await profileStore.logout();
  location.reload();
}
</script>

<template>
  <div class="flex items-center">
    <div class="flex items-center ml-3">
      <Dropdown>
        <template v-slot:icon>
          <div>
            <button class="flex text-xs lg:text-sm p-2" type="button">
              <span class="sr-only">Open user menu</span>
              <span class="text-gray-200 font-bold">{{
                profileStore.fullName
              }}</span>
            </button>
          </div>
        </template>
        <div
          class="z-50 text-base list-none bg-white divide-y divide-gray-100 rounded shadow dark:bg-gray-700 dark:divide-gray-600"
        >
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
                :to="{ name: 'update/password' }"
                class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
                role="menuitem"
              >
                Actualizar contraseña
              </router-link>
            </li>
            <li>
              <span
                @click="logout"
                class="block px-4 py-2 cursor-pointer text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
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
