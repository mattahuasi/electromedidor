<script setup>
import { registerRequest } from "@/api/auth";
import { useProfileStore } from "@/stores/profile";
import { reactive, computed, ref } from "vue";
import { useVuelidate } from "@vuelidate/core";
import { required, email, minLength, helpers } from "@vuelidate/validators";
import { toast } from "vue-sonner";

const profileStore = useProfileStore();
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
    required: helpers.withMessage("El nombre es requerido", required),
  },
  lastName: {
    required: helpers.withMessage("El apellido es requerido", required),
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
      await registerRequest(formData);
      toast.success("Registro exitoso");
      await profileStore.login({
        email: formData.email,
        password: formData.password,
      });
      location.reload();
    } catch (error) {
      toast.error("Error al registrase, llena bien el formulario");
    }
  }
}
</script>

<template>
  <div
    class="relative w-full max-w-xl p-4 my-10 bg-gray-800 border border-gray-700 rounded-lg shadow-lg sm:p-6 md:p-8"
  >
    <form class="space-y-6" :onSubmit="handleSubmit">
      <h5 class="text-4xl underline text-center font-medium text-white">
        <router-link to="/auth/login">SisElectro</router-link>
      </h5>
      <p class="text-sm text-center font-medium text-gray-300">
        Llena el formulario de registro para crear una cuenta.
      </p>
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
        <label for="firstName" class="block mb-2 text-sm font-medium text-white"
          >Nombre</label
        >
        <div
          class="p-1 mb-1"
          v-for="(error, index) of v$.firstName.$errors"
          :key="index"
        >
          <p class="text-sm text-red-500">{{ error.$message }}</p>
        </div>
        <input
          name="firstName"
          id="firstName"
          class="bg-gray-600 border border-gray-500 text-white placeholder-gray-400 text-sm rounded-lg ring-1 focus:ring-blue-500 focus:border-blue-500 focus:outline-none block w-full p-2.5"
          v-model="v$.firstName.$model"
          type="text"
          required
        />
      </div>
      <div>
        <label for="lastName" class="block mb-2 text-sm font-medium text-white"
          >Apellido</label
        >
        <div
          class="p-1 mb-1"
          v-for="(error, index) of v$.lastName.$errors"
          :key="index"
        >
          <p class="text-sm text-red-500">{{ error.$message }}</p>
        </div>
        <input
          name="lastName"
          id="lastName"
          class="bg-gray-600 border border-gray-500 text-white placeholder-gray-400 text-sm rounded-lg ring-1 focus:ring-blue-500 focus:border-blue-500 focus:outline-none block w-full p-2.5"
          v-model="v$.lastName.$model"
          type="text"
          required
        />
      </div>
      <div>
        <label for="ci" class="block mb-2 text-sm font-medium text-white"
          >Cédula de identidad</label
        >
        <div
          class="p-1 mb-1"
          v-for="(error, index) of v$.ci.$errors"
          :key="index"
        >
          <p class="text-sm text-red-500">{{ error.$message }}</p>
        </div>
        <input
          name="ci"
          id="ci"
          class="bg-gray-600 border border-gray-500 text-white placeholder-gray-400 text-sm rounded-lg ring-1 focus:ring-blue-500 focus:border-blue-500 focus:outline-none block w-full p-2.5"
          v-model="v$.ci.$model"
          type="text"
          required
        />
      </div>
      <div>
        <label for="phone" class="block mb-2 text-sm font-medium text-white"
          >Teléfono o celular</label
        >
        <div
          class="p-1 mb-1"
          v-for="(error, index) of v$.phone.$errors"
          :key="index"
        >
          <p class="text-sm text-red-500">{{ error.$message }}</p>
        </div>
        <input
          name="phone"
          id="phone"
          class="bg-gray-600 border border-gray-500 text-white placeholder-gray-400 text-sm rounded-lg ring-1 focus:ring-blue-500 focus:border-blue-500 focus:outline-none block w-full p-2.5"
          v-model="v$.phone.$model"
          type="text"
          required
        />
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
          type="password"
          name="password"
          id="password"
          class="bg-gray-600 border border-gray-500 text-white placeholder-gray-400 text-sm rounded-lg ring-1 focus:ring-blue-500 focus:border-blue-500 focus:outline-none block w-full p-2.5"
          v-model="v$.password.$model"
          required
        />
      </div>
      <button
        class="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
        type="submit"
      >
        Crear cuenta
      </button>
      <div class="text-sm text-center font-medium text-gray-300">
        Si tienes problemas con el registro pídele a un administrador que lo
        haga.
      </div>
    </form>
  </div>
</template>
