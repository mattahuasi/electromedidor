<script setup>
import {
  createEmployeeRequest,
  getEmployeeByIdRequest,
  updateEmployeeByIdRequest,
} from "@/api/employee.js";
import { useProfileStore } from "@/stores/profile.js";
import { useRoute, useRouter } from "vue-router";
import { ref, onMounted, reactive } from "vue";
import { useVuelidate } from "@vuelidate/core";
import { required, helpers, email } from "@vuelidate/validators";
import { toast } from "vue-sonner";
import Form from "@/components/cards/Form.vue";
import Input from "@/components/inputs/Input.vue";
import Checkbox from "@/components/inputs/Checkbox.vue";

const profileStore = useProfileStore();
const route = useRoute();
const router = useRouter();
const formData = reactive({
  firstName: "",
  lastName: "",
  ci: "",
  phone: "",
  email: "",
  admin: false,
});
const rules = {
  firstName: {
    required: helpers.withMessage("Se requiere el nombre/s", required),
  },
  lastName: {
    required: helpers.withMessage("Se requiere los apellidos", required),
  },
  ci: { required: helpers.withMessage("Se requiere el CI", required) },
  phone: {
    required: helpers.withMessage("Se requiere el teléfono/celular", required),
  },
  email: {
    required: helpers.withMessage("El correo es requerido", required),
    email: helpers.withMessage("El correo no es valido", email),
  },
  password: {},
  staff: {},
  admin: {},
};
const v$ = useVuelidate(rules, formData);
const errors = ref([]);

async function handleSubmit() {
  const isFormCorrect = await v$.value.$validate();
  if (isFormCorrect) {
    try {
      if (!route.query.id) {
        formData.password = `Sis${formData.ci}`;
        formData.staff = true;
        await createEmployeeRequest(formData);
      } else await updateEmployeeByIdRequest(route.query.id, formData);
      toast.success("Usuario guardado correctamente");
      router.push({ name: "employees" });
    } catch (error) {
      errors.value = error.response.data.errors;
      errors.value.map((item) => toast.error(item));
    }
  }
}

onMounted(async () => {
  if (route.query.id) {
    try {
      const res = await getEmployeeByIdRequest(route.query.id);
      Object.assign(formData, res.data);
    } catch (error) {
      toast.error("Error al cargar los datos");
      router.push({ name: "employees" });
    }
  }
});
</script>

<template>
  <Form title="Usuario" icon="fa-user-cog" @handleSubmit="handleSubmit"
    ><h6
      class="text-gray-400 dark:text-gray-100 text-sm mt-3 mb-6 font-bold uppercase"
    >
      Datos del usuario
    </h6>
    <div class="flex flex-wrap">
      <div class="w-full lg:w-6/12 px-4">
        <Input
          id="firstName"
          labelText="Nombre/s"
          placeholder="Juan"
          v-model="v$.firstName.$model"
          :errors="v$.firstName.$errors"
          type="text"
        />
      </div>
      <div class="w-full lg:w-6/12 px-4">
        <Input
          id="lastName"
          labelText="Apellidos"
          placeholder="Perez"
          v-model="v$.lastName.$model"
          :errors="v$.lastName.$errors"
          type="text"
        />
      </div>
      <div class="w-full lg:w-6/12 px-4">
        <Input
          id="ci"
          labelText="Cédula de identidad"
          placeholder="87654321"
          v-model="v$.ci.$model"
          :errors="v$.ci.$errors"
          type="text"
        />
      </div>
      <div class="w-full lg:w-6/12 px-4">
        <Input
          id="email"
          labelText="Correo electrónico"
          placeholder="usuario@ejemplo.com"
          v-model="v$.email.$model"
          :errors="v$.email.$errors"
          type="email"
        />
      </div>
      <div class="w-full lg:w-6/12 px-4">
        <Input
          id="phone"
          labelText="Teléfono/Celular"
          placeholder="76453210"
          v-model="v$.phone.$model"
          :errors="v$.phone.$errors"
          type="text"
        />
      </div>
      <div class="w-full lg:w-6/12 px-4">
        <Checkbox
          v-if="profileStore.isAdmin"
          id="admin"
          labelText="Permisos de administrador"
          v-model="v$.admin.$model"
        />
      </div>
    </div>
  </Form>
</template>
