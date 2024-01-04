<script setup>
import {
  createCategoryRequest,
  getCategoryByIdRequest,
  updateCategoryRequest,
} from "@/api/category.js";
import { useRoute, useRouter } from "vue-router";
import { ref, computed, onMounted, reactive } from "vue";
import { useVuelidate } from "@vuelidate/core";
import { required, helpers, email } from "@vuelidate/validators";
import { toast } from "vue-sonner";
import Form from "@/components/cards/Form.vue";
import Input from "@/components/inputs/Input.vue";

const route = useRoute();
const router = useRouter();
const formData = reactive({
  name: "",
  initialism: "",
  minA: 0,
  maxA: 0,
  priceA: 0,
  minB: 0,
  maxB: 0,
  priceB: 0,
  minC: 0,
  maxC: 0,
  priceC: 0,
});
const rules = {
  name: { required: helpers.withMessage("Se requiere un nombre", required) },
  initialism: {
    required: helpers.withMessage("Se requieren las siglas", required),
  },
  minA: { required: helpers.withMessage("Mínimo A es requerido", required) },
  maxA: { required: helpers.withMessage("Máximo A es requerido", required) },
  priceA: { required: helpers.withMessage("Precio A es requerido", required) },
  minB: { required: helpers.withMessage("Mínimo B es requerido", required) },
  maxB: { required: helpers.withMessage("Máximo B es requerido", required) },
  priceB: { required: helpers.withMessage("Precio B es requerido", required) },
  minC: { required: helpers.withMessage("Mínimo C es requerido", required) },
  maxC: { required: helpers.withMessage("Máximo C es requerido", required) },
  priceC: { required: helpers.withMessage("Precio C es requerido", required) },
};
const v$ = useVuelidate(rules, formData);
const errors = ref([]);

async function handleSubmit() {
  const isFormCorrect = await v$.value.$validate();
  if (isFormCorrect) {
    try {
      formData.priceA = parseFloat(formData.priceA);
      formData.priceB = parseFloat(formData.priceB);
      formData.priceC = parseFloat(formData.priceC);
      if (!route.query.id) await createCategoryRequest(formData);
      else await updateCategoryRequest(route.query.id, formData);
      toast.success("Categoría guardado correctamente");
      router.push("/categories");
    } catch (error) {
      errors.value = error.response.data.errors;
      errors.value.map((item) => toast.error(item));
    }
  }
}

onMounted(async () => {
  if (route.query.id) {
    try {
      const res = await getCategoryByIdRequest(route.query.id);
      Object.assign(formData, res.data);
    } catch (error) {
      toast.error("Error al cargar los datos");
      route.push("/categories");
    }
  }
});
</script>

<template>
  <Form title="Categoría" icon="fa-layer-group" @handleSubmit="handleSubmit"
    ><h6
      class="text-gray-400 dark:text-gray-100 text-sm mt-3 mb-6 font-bold uppercase"
    >
      Datos de la categoría
    </h6>
    <div class="flex flex-wrap">
      <div class="w-full lg:w-6/12 px-4">
        <Input
          id="name"
          labelText="Nombre"
          placeholder="Categoría"
          v-model="v$.name.$model"
          :errors="v$.name.$errors"
          type="text"
        />
      </div>
      <div class="w-full lg:w-6/12 px-4">
        <Input
          id="initialism"
          labelText="Siglas"
          placeholder="HuOPL32"
          v-model="v$.initialism.$model"
          :errors="v$.initialism.$errors"
          type="text"
        />
      </div>
      <div class="w-full lg:w-4/12 px-4">
        <Input
          id="minA"
          labelText="Mínimo A"
          placeholder="0"
          v-model="v$.minA.$model"
          :errors="v$.minA.$errors"
          type="number"
        />
      </div>
      <div class="w-full lg:w-4/12 px-4">
        <Input
          id="maxA"
          labelText="Máximo A"
          placeholder="0"
          v-model="v$.maxA.$model"
          :errors="v$.maxA.$errors"
          type="number"
        />
      </div>
      <div class="w-full lg:w-4/12 px-4">
        <Input
          id="priceA"
          labelText="Precio A"
          placeholder="0"
          v-model="v$.priceA.$model"
          :errors="v$.priceA.$errors"
          type="text"
        />
      </div>
      <div class="w-full lg:w-4/12 px-4">
        <Input
          id="minB"
          labelText="Mínimo B"
          placeholder="0"
          v-model="v$.minB.$model"
          :errors="v$.minB.$errors"
          type="number"
        />
      </div>
      <div class="w-full lg:w-4/12 px-4">
        <Input
          id="maxB"
          labelText="Máximo B"
          placeholder="0"
          v-model="v$.maxB.$model"
          :errors="v$.maxB.$errors"
          type="number"
        />
      </div>
      <div class="w-full lg:w-4/12 px-4">
        <Input
          id="priceB"
          labelText="Precio B"
          placeholder="0"
          v-model="v$.priceB.$model"
          :errors="v$.priceB.$errors"
          type="text"
        />
      </div>
      <div class="w-full lg:w-4/12 px-4">
        <Input
          id="minC"
          labelText="Mínimo C"
          placeholder="0"
          v-model="v$.minC.$model"
          :errors="v$.minC.$errors"
          type="number"
        />
      </div>
      <div class="w-full lg:w-4/12 px-4">
        <Input
          id="maxC"
          labelText="Máximo C"
          placeholder="0"
          v-model="v$.maxC.$model"
          :errors="v$.maxC.$errors"
          type="number"
        />
      </div>
      <div class="w-full lg:w-4/12 px-4">
        <Input
          id="priceC"
          labelText="Precio C"
          placeholder="0"
          v-model="v$.priceC.$model"
          :errors="v$.priceC.$errors"
          type="text"
        />
      </div>
    </div>
  </Form>
</template>
