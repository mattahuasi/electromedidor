<script setup>
import {
  createCustomerRequest,
  getCustomerRequest,
  updateCustomerRequest,
} from "@/api/customer";
import { useRoute, useRouter } from "vue-router";
import { ref, onMounted, reactive } from "vue";
import { useVuelidate } from "@vuelidate/core";
import { required, helpers, email } from "@vuelidate/validators";
import { toast } from "vue-sonner";
import Form from "@/components/cards/Form.vue";
import Input from "@/components/inputs/Input.vue";

const route = useRoute();
const router = useRouter();
const formData = reactive({
  firstName: "",
  lastName: "",
  ci: "",
  phone: "",
  email: "",
});
const rules = {
  firstName: {
    required: helpers.withMessage("Por favor, ingresa el nombre", required),
  },
  lastName: {
    required: helpers.withMessage("Por favor, ingresa el apellido", required),
  },
  ci: {
    required: helpers.withMessage(
      "Por favor, ingresa el número de cédula de identidad",
      required
    ),
  },
  phone: {
    required: helpers.withMessage(
      "Por favor, ingresa el número de teléfono o celular",
      required
    ),
  },
  email: {
    required: helpers.withMessage(
      "Por favor, ingresa el correo electrónico",
      required
    ),
    email: helpers.withMessage(
      "Por favor, ingresa un correo electrónico válido",
      email
    ),
  },
  password: {},
};
const v$ = useVuelidate(rules, formData);
const errors = ref([]);

async function handleSubmit() {
  const isFormCorrect = await v$.value.$validate();
  if (isFormCorrect) {
    try {
      if (!route.query.id) {
        formData.password = `Sis${formData.ci}`;
        await createCustomerRequest(formData);
      } else await updateCustomerRequest(route.query.id, formData);
      toast.success("¡Cliente creado con éxito!");
      router.push({ name: "customers" });
    } catch (error) {
      errors.value = error.response.data.errors;
      errors.value.map((item) => toast.error(item));
    }
  }
}

onMounted(async () => {
  if (route.query.id) {
    try {
      const res = await getCustomerRequest(route.query.id);
      Object.assign(formData, res.data);
    } catch (error) {
      toast.error(
        "Se produjo un error al cargar los datos. Por favor, inténtalo de nuevo."
      );
      router.push({ name: "customers" });
    }
  }
});
</script>

<template>
  <Form title="Cliente" icon="fa-user-tie" @handleSubmit="handleSubmit"
    ><h6
      class="text-gray-500 dark:text-gray-200 text-sm mt-3 mb-6 font-bold uppercase"
    >
      Datos del cliente
    </h6>
    <div class="flex flex-wrap">
      <div class="w-full lg:w-6/12 px-4">
        <Input
          id="firstName"
          labelText="Nombre"
          v-model="v$.firstName.$model"
          :errors="v$.firstName.$errors"
          type="text"
        />
      </div>
      <div class="w-full lg:w-6/12 px-4">
        <Input
          id="lastName"
          labelText="Apellido"
          v-model="v$.lastName.$model"
          :errors="v$.lastName.$errors"
          type="text"
        />
      </div>
      <div class="w-full lg:w-6/12 px-4">
        <Input
          id="ci"
          labelText="Cédula de identidad"
          v-model="v$.ci.$model"
          :errors="v$.ci.$errors"
          type="text"
        />
      </div>
      <div class="w-full lg:w-6/12 px-4">
        <Input
          id="phone"
          labelText="Teléfono o celular"
          v-model="v$.phone.$model"
          :errors="v$.phone.$errors"
          type="text"
        />
      </div>
      <div class="w-full px-4">
        <Input
          id="email"
          labelText="Correo electrónico"
          v-model="v$.email.$model"
          :errors="v$.email.$errors"
          type="email"
        />
      </div>
    </div>
  </Form>
</template>
