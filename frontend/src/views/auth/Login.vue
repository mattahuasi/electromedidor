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
  <div
    class="relative w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700"
  >
    <form class="space-y-6" action="#">
      <h5 class="text-xl font-medium text-gray-900 dark:text-white">
        Sign in to our platform
      </h5>
      <div>
        <label
          for="email"
          class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >Your email</label
        >
        <input
          type="email"
          name="email"
          id="email"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
          placeholder="name@company.com"
          required
        />
      </div>
      <div>
        <label
          for="password"
          class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >Your password</label
        >
        <input
          type="password"
          name="password"
          id="password"
          placeholder="••••••••"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
          required
        />
      </div>
      <div class="flex items-start">
        <div class="flex items-start">
          <div class="flex items-center h-5">
            <input
              id="remember"
              type="checkbox"
              value=""
              class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"
              required
            />
          </div>
          <label
            for="remember"
            class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >Remember me</label
          >
        </div>
        <a
          href="#"
          class="ms-auto text-sm text-blue-700 hover:underline dark:text-blue-500"
          >Lost Password?</a
        >
      </div>
      <button
        type="submit"
        class="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        Login to your account
      </button>
      <div class="text-sm font-medium text-gray-500 dark:text-gray-300">
        Not registered?
        <a href="#" class="text-blue-700 hover:underline dark:text-blue-500"
          >Create account</a
        >
      </div>
    </form>
  </div>
</template>

<!-- <template>
  <div class="container mx-auto px-4 h-full">
    <div class="flex content-center items-center justify-center h-full">
      <div class="w-full lg:w-4/12 px-4">
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
                Ingresa tus credenciales para iniciar sesión.
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
                  class="bg-gray-800 dark:bg-gray-200 hover:bg-gray-700 dark:hover:bg-white text-white dark:text-gray-700 active:bg-gray-900 dark:active:bg-gray-300 font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                  type="submit"
                >
                  Ingresar
                </button>
              </div>
              <div class="text-center mx-8 mt-6">
                <p class="text-xs text-gray-500">
                  ¿No tienes una cuenta?
                  <router-link to="/auth/register" class="text-blue-700 text-sm"
                    >Registrarse</router-link
                  >
                  o pídele a un administrador que lo haga.
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template> -->
