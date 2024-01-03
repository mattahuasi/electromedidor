<script setup>
import { reactive, computed, ref } from "vue";
import { useVuelidate } from "@vuelidate/core";
import { required, email, minLength, helpers } from "@vuelidate/validators";
import { useProfileStore } from "@/stores/profile";

const profileStore = useProfileStore();
const errors = ref([]);
const alertOpen = ref();
const formData = reactive({
  email: "",
  password: "",
});
const rules = computed(() => ({
  email: {
    email: helpers.withMessage("El email no es válido", email),
    required: helpers.withMessage("El email es requerido", required),
  },
  password: {
    required: helpers.withMessage("La contraseña es requerida", required),
    minLength: helpers.withMessage(
      "La contraseña debe tener al menos 6 caracteres",
      minLength(6)
    ),
  },
}));
const v$ = useVuelidate(rules, formData);

async function handleSubmit(event) {
  event.preventDefault();
  const isFormCorrect = await v$.value.$validate();
  if (isFormCorrect) {
    try {
      await profileStore.login(formData);
      location.reload();
    } catch (error) {
      errors.value = error.response.data.errors;
      notification();
    }
  }
}

function notification() {
  alertOpen.value = true;
  const timer = setTimeout(() => {
    alertOpen.value = false;
  }, 3000);
  return () => clearTimeout(timer);
}
</script>

<template>
  <div class="container mx-auto px-4 h-full">
    <div class="flex content-center items-center justify-center h-full">
      <div class="w-full lg:w-4/12 px-4">
        <div
          class="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-white dark:bg-gray-800 backdrop-blur-md border-0"
        >
          <div class="rounded-t mb-0 px-6 py-6">
            <div class="text-center mb-3">
              <h6 class="text-4xl dark:text-white">Iniciar sesión</h6>
            </div>
            <hr class="mt-6 border-b-1 border-gray-200 dark:border-gray-600" />
          </div>
          <div class="flex-auto px-4 lg:px-10 py-10 pt-0">
            <div v-if="alertOpen">
              <div
                v-for="(item, index) in errors"
                :key="index"
                class="bg-red-500 p-2 text-white rounded-lg mb-2 text-center"
              >
                {{ item }}
              </div>
            </div>
            <form :onSubmit="handleSubmit">
              <div class="relative w-full mb-3">
                <label
                  class="block mb-2 dark:text-white"
                  htmlFor="grid-password"
                >
                  Correo electrónico
                </label>
                <div
                  class="p-1 mb-1"
                  v-for="(error, index) of v$.email.$errors"
                  :key="index"
                >
                  <p class="text-sm text-red-500">{{ error.$message }}</p>
                </div>
                <input
                  class="border px-3 py-3 rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  v-model="v$.email.$model"
                  placeholder="Correo electrónico"
                  type="email"
                />
              </div>

              <div class="relative w-full mb-3">
                <label
                  class="block mb-2 dark:text-white"
                  htmlFor="grid-password"
                >
                  Contraseña
                </label>
                <div
                  class="p-1 mb-1"
                  v-for="(error, index) of v$.password.$errors"
                  :key="index"
                >
                  <p class="text-sm text-red-500">{{ error.$message }}</p>
                </div>
                <input
                  class="border px-3 py-3 rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  v-model="v$.password.$model"
                  placeholder="Contraseña"
                  type="password"
                />
              </div>

              <div class="text-center mt-6">
                <button
                  class="bg-gray-800 dark:bg-gray-200 hover:bg-gray-700 dark:hover:bg-white text-white dark:text-gray-700 active:bg-gray-900 dark:active:bg-gray-300 font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                  type="submit"
                >
                  Ingresar
                </button>
              </div>

              <div class="flex justify-between items-center mx-8 mt-6">
                <p class="text-sm">¿No tienes una cuenta?</p>
                <router-link to="/auth/register" class="text-blue-700 text-lg"
                  >Regístrate</router-link
                >
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
