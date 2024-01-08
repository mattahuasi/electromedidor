<script setup>
import { registerRequest } from "@/api/auth.js";
import { reactive, computed, ref } from "vue";
import { useRouter } from "vue-router";
import { useVuelidate } from "@vuelidate/core";
import { required, email, minLength, helpers } from "@vuelidate/validators";
import { toast } from "vue-sonner";

const router = useRouter();
const errors = ref([]);
const alertOpen = ref();
const formData = reactive({
  firstName: "",
  lastName: "",
  ci: "",
  phone: "",
  email: "",
  password: "",
});
const rules = computed(() => ({
  firstName: {
    required: helpers.withMessage("El nombre/s es requerido", required),
  },
  lastName: {
    required: helpers.withMessage("Los apellidos es requerido", required),
  },
  ci: {
    required: helpers.withMessage(
      "La cédula de identidad es requerida",
      required
    ),
    minLength: helpers.withMessage(
      "La cédula de identidad debe tener al menos 6 caracteres",
      minLength(6)
    ),
  },
  phone: {
    required: helpers.withMessage(
      "El teléfono o celular es requerido",
      required
    ),
    minLength: helpers.withMessage(
      "El teléfono o celular debe tener al menos 6 caracteres",
      minLength(6)
    ),
  },
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
      await registerRequest(formData);
      toast.success("Registro exitoso");
      router.push("/auth/login");
    } catch (error) {
      toast.error("Error al registrase, llene bien el formulario");
    }
  }
}
</script>
<template>
  <div class="container mx-auto px-4 h-full">
    <div class="flex content-center items-center justify-center h-full">
      <div class="w-full lg:w-6/12 px-4">
        <div
          class="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-white dark:bg-gray-800 backdrop-blur-md border-0"
        >
          <div class="rounded-t mb-0 px-6 py-6">
            <div class="text-center mb-3">
              <h6 class="text-4xl dark:text-white">
                <router-link to="/auth/login">SisMedidor</router-link>
              </h6>
            </div>
            <div class="text-center">
              <p class="text-xs text-gray-500">
                Ingresa tus datos para crear tu cuenta.
              </p>
            </div>
            <hr class="mt-4 border-b-1 border-gray-200 dark:border-gray-600" />
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
                  Nombre/s
                </label>
                <div
                  class="p-1 mb-1"
                  v-for="(error, index) of v$.firstName.$errors"
                  :key="index"
                >
                  <p class="text-sm text-red-500">{{ error.$message }}</p>
                </div>
                <input
                  class="border px-3 py-2 rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  v-model="v$.firstName.$model"
                  placeholder="Escribe tu nombre/s aquí"
                  type="text"
                />
              </div>
              <div class="relative w-full mb-3">
                <label
                  class="block mb-2 dark:text-white"
                  htmlFor="grid-password"
                >
                  Apellidos
                </label>
                <div
                  class="p-1 mb-1"
                  v-for="(error, index) of v$.lastName.$errors"
                  :key="index"
                >
                  <p class="text-sm text-red-500">{{ error.$message }}</p>
                </div>
                <input
                  class="border px-3 py-2 rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  v-model="v$.lastName.$model"
                  placeholder="Escribe tus apellidos aquí"
                  type="text"
                />
              </div>
              <div class="relative w-full mb-3">
                <label
                  class="block mb-2 dark:text-white"
                  htmlFor="grid-password"
                >
                  Cédula de identidad
                </label>
                <div
                  class="p-1 mb-1"
                  v-for="(error, index) of v$.ci.$errors"
                  :key="index"
                >
                  <p class="text-sm text-red-500">{{ error.$message }}</p>
                </div>
                <input
                  class="border px-3 py-2 rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  v-model="v$.ci.$model"
                  placeholder="Escribe tu CI aquí"
                  type="text"
                />
              </div>
              <div class="relative w-full mb-3">
                <label
                  class="block mb-2 dark:text-white"
                  htmlFor="grid-password"
                >
                  Teléfono o celular
                </label>
                <div
                  class="p-1 mb-1"
                  v-for="(error, index) of v$.phone.$errors"
                  :key="index"
                >
                  <p class="text-sm text-red-500">{{ error.$message }}</p>
                </div>
                <input
                  class="border px-3 py-2 rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  v-model="v$.phone.$model"
                  placeholder="Escribe tu teléfono o celular aquí"
                  type="text"
                />
              </div>
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
                  class="border px-3 py-2 rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
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
                  class="border px-3 py-2 rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  v-model="v$.password.$model"
                  placeholder="Contraseña"
                  type="password"
                />
              </div>
              <div class="text-center mt-6">
                <button
                  class="bg-blue-700 dark:bg-blue-200 hover:bg-blue-800 dark:hover:bg-white text-white dark:text-blue-700 active:bg-blue-900 dark:active:bg-blue-300 font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                  type="submit"
                >
                  Registrarse
                </button>
              </div>
              <div class="text-center mx-8 mt-6">
                <p class="text-xs text-gray-500">
                  Si tienes problemas con el registro pídele a un administrador
                  que lo haga.
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
