<script setup>
import { getCustomersRequest } from "@/api/customer";
import {
  createHardwareRequest,
  getOneHardwareRequest,
  updateHardwareRequest,
} from "@/api/hardware";
import { useRoute, useRouter } from "vue-router";
import { ref, watch, onMounted, reactive } from "vue";
import { useVuelidate } from "@vuelidate/core";
import { required, helpers, email } from "@vuelidate/validators";
import { toast } from "vue-sonner";
import Form from "@/components/cards/Form.vue";
import Input from "@/components/inputs/Input.vue";
import Select from "@/components/inputs/Select.vue";
import Checkbox from "@/components/inputs/Checkbox.vue";

const route = useRoute();
const router = useRouter();
const customers = ref([]);
const formData = reactive({
  name: "",
  address: "",
  key: false,
  area: false,
  customerId: "",
});
const rules = {
  name: {
    required: helpers.withMessage(
      "Se requiere un nombre (El nombre no debe contener espacios)",
      required
    ),
  },
  address: {
    required: helpers.withMessage("Se requiere una dirección", required),
  },
  key: {},
  area: { required: helpers.withMessage("Elija un area", required) },
  urban: {},
  rural: {},
  customerId: { required: helpers.withMessage("Elija un usuario", required) },
};
const v$ = useVuelidate(rules, formData);
const errors = ref([]);

async function handleSubmit() {
  const isFormCorrect = await v$.value.$validate();
  if (isFormCorrect) {
    try {
      if (formData.urban) formData.area = true;
      else formData.area = false;
      formData.customerId = parseInt(formData.customerId);
      if (!route.query.id) await createHardwareRequest(formData);
      else await updateHardwareRequest(route.query.id, formData);
      toast.success("Medidor registrado exitosamente");
      router.push({ name: "hardware" });
      // router.push({ name: "hardware", params: { id: route.params.id } });
    } catch (error) {
      errors.value = error.response.data.errors;
      errors.value.map((item) => toast.error(item));
    }
  }
}

watch(
  () => formData.urban,
  (urban) => {
    if (urban) {
      formData.rural = false;
    }
  }
);

watch(
  () => formData.rural,
  (rural) => {
    if (rural) {
      formData.urban = false;
    }
  }
);

onMounted(async () => {
  try {
    const res = await getCustomersRequest();
    customers.value = res.data;
  } catch (error) {
    toast.error("Error al cargar usuarios");
  }
  if (route.query.id) {
    try {
      const res = await getOneHardwareRequest(route.query.id);
      if (res.data.area) formData.urban = true;
      else formData.rural = true;
      Object.assign(formData, res.data);
    } catch (error) {
      toast.error("Error al cargar los datos");
      router.push({ name: "hardware" });
    }
  }
});
</script>

<template>
  <Form title="Hardware" icon="fa-bolt" @handleSubmit="handleSubmit"
    ><h6
      class="text-gray-400 dark:text-gray-100 text-sm mt-3 mb-6 font-bold uppercase"
    >
      Datos del Hardware
    </h6>
    <div class="flex flex-wrap">
      <div class="w-full lg:w-6/12 px-4">
        <Input
          id="name"
          labelText="Nombre del medidor"
          v-model="v$.name.$model"
          :errors="v$.name.$errors"
          type="text"
        />
      </div>
      <div class="w-full lg:w-6/12 px-4">
        <Input
          id="address"
          labelText="Dirección"
          v-model="v$.address.$model"
          :errors="v$.address.$errors"
          type="text"
        />
      </div>
      <div class="w-full lg:w-6/12 px-4">
        <Select
          id="customer"
          labelText="Usuario"
          v-model="v$.customerId.$model"
          :errors="v$.customerId.$errors"
          name="firstName"
          :options="customers"
        />
      </div>
      <div class="w-full lg:w-6/12 px-4">
        <Checkbox
          id="key"
          labelText="Llave (Selecciona para activar)"
          v-model="v$.key.$model"
        />
      </div>
      <div class="w-full lg:w-6/12 px-4">
        <Checkbox
          id="urban"
          labelText="Área urbana"
          v-model="v$.urban.$model"
        />
      </div>
      <div class="w-full lg:w-6/12 px-4">
        <Checkbox id="rural" labelText="Área rural" v-model="v$.rural.$model" />
      </div>
    </div>
  </Form>
</template>
