<script setup>
import { getCategoriesRequest } from "@/api/category.js";
import {
  createHardwareRequest,
  getHardwareByIdRequest,
  updateHardwareRequest,
  // createHardwareToCustomerRequest,
} from "@/api/hardware.js";
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
const categories = ref([]);
const formData = reactive({
  mack: "",
  address: "",
  status: "",
  key: false,
  urban: false,
  rural: false,
  categoryId: null,
});
const rules = {
  mack: { required: helpers.withMessage("Se requiere Mack", required) },
  address: {
    required: helpers.withMessage("Se requiere una dirección", required),
  },
  status: { required: helpers.withMessage("Escriba un estado", required) },
  key: {},
  urban: { required: helpers.withMessage("Elija un area", required) },
  rural: { required: helpers.withMessage("Elija un area", required) },
  categoryId: { required: helpers.withMessage("Elija un categoría", required) },
};
const v$ = useVuelidate(rules, formData);
const errors = ref([]);

async function handleSubmit() {
  const isFormCorrect = await v$.value.$validate();
  if (isFormCorrect) {
    try {
      formData.categoryId = parseInt(formData.categoryId);
      if (!route.query.id)
        await createHardwareRequest(route.params.id, formData);
      else await updateHardwareRequest(route.query.id, formData);
      toast.success("Hardware guardado correctamente");
      router.push({ name: "hardware", params: { id: route.params.id } });
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
    const res = await getCategoriesRequest();
    categories.value = res.data;
  } catch (error) {
    toast.error("Error al cargar las categorías");
  }
  if (route.query.id) {
    try {
      const res = await getHardwareByIdRequest(route.query.id);
      Object.assign(formData, res.data);
    } catch (error) {
      toast.error("Error al cargar los datos");
      route.push("/customers");
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
          id="mack"
          labelText="Mack"
          placeholder="xca4v"
          v-model="v$.mack.$model"
          :errors="v$.mack.$errors"
          type="text"
        />
      </div>
      <div class="w-full lg:w-6/12 px-4">
        <Input
          id="status"
          labelText="Estado"
          placeholder="Escriba un estado"
          v-model="v$.status.$model"
          :errors="v$.status.$errors"
          type="text"
        />
      </div>
      <div class="w-full px-4">
        <Input
          id="address"
          labelText="Dirección"
          placeholder="Calle 123"
          v-model="v$.address.$model"
          :errors="v$.address.$errors"
          type="text"
        />
      </div>
      <div class="w-full lg:w-6/12 px-4">
        <Select
          id="category"
          labelText="Categoría"
          v-model="v$.categoryId.$model"
          :errors="v$.categoryId.$errors"
          :options="categories"
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
