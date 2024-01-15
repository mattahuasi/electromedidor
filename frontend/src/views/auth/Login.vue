<script setup>
import { useProfileStore } from "@/stores/profile";
import { reactive, computed, ref } from "vue";
import { useVuelidate } from "@vuelidate/core";
import { required, email, minLength, helpers } from "@vuelidate/validators";

const profileStore = useProfileStore();
const errors = ref([]);
const alertOpen = ref();
const formData = reactive({
  email: "",
  password: "",
});
const rules = computed(() => ({
  email: {
    email: helpers.withMessage("El correo electrónico no es válido", email),
    required: helpers.withMessage(
      "El correo electrónico es requerido",
      required
    ),
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
    class="relative w-full max-w-sm p-4 bg-gray-800 border border-gray-700 rounded-lg shadow-lg sm:p-6 md:p-8"
  >
    <form class="space-y-6" :onSubmit="handleSubmit">
      <h5 class="text-4xl underline text-center font-medium text-white">
        <router-link to="/auth/login">SisElectro</router-link>
      </h5>
      <!-- <p class="text-sm text-center font-medium text-gray-300">
        Ingresa tus credenciales para iniciar sesión.
      </p> -->
      <div v-if="alertOpen">
        <div
          v-for="(item, index) in errors"
          :key="index"
          class="bg-red-500 p-2 text-white rounded-lg mb-2 text-center"
        >
          {{ item }}
        </div>
      </div>
      <div>
        <label for="email" class="block mb-2 text-sm font-medium text-white"
          >Correo electrónico</label
        >
        <div
          class="p-1 mb-1"
          v-for="(error, index) of v$.email.$errors"
          :key="index"
        >
          <p class="text-sm text-red-500">{{ error.$message }}</p>
        </div>
        <input
          name="email"
          id="email"
          class="bg-gray-600 border border-gray-500 text-white placeholder-gray-400 text-sm rounded-lg ring-1 focus:ring-blue-500 focus:border-blue-500 focus:outline-none block w-full p-2.5"
          v-model="v$.email.$model"
          placeholder="name@company.com"
          type="email"
          required
        />
      </div>
      <div>
        <label for="password" class="block mb-2 text-sm font-medium text-white"
          >Contraseña</label
        >
        <div
          class="p-1 mb-1"
          v-for="(error, index) of v$.password.$errors"
          :key="index"
        >
          <p class="text-sm text-red-500">{{ error.$message }}</p>
        </div>
        <input
          name="password"
          id="password"
          class="bg-gray-600 border border-gray-500 text-white placeholder-gray-400 text-sm rounded-lg ring-1 focus:ring-blue-500 focus:border-blue-500 focus:outline-none block w-full p-2.5"
          v-model="v$.password.$model"
          placeholder="••••••••"
          type="password"
          required
        />
      </div>
      <button
        class="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
        type="submit"
      >
        Iniciar sesión
      </button>
      <div class="text-sm text-center font-medium text-gray-300">
        ¿No tienes una cuenta?
        <router-link to="/auth/register" class="text-blue-700 hover:underline"
          >Regístrate</router-link
        >
        o pídele a un administrador que lo haga.
      </div>
    </form>
  </div>
</template>
