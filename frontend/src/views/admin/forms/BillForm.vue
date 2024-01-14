<script setup>
import {
  createBillRequest,
  getBillByIdRequest,
  updateBillByIdRequest,
} from "@/api/bill";
import {
  getCustomersRequest,
  getCustomerHardwareByIdRequest,
} from "@/api/customer";
import { useRoute, useRouter } from "vue-router";
import { ref, onMounted, reactive, watch } from "vue";
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
const hardware = ref([]);
const formData = reactive({
  consumption: "",
  cost: "",
  status: false,
  customerId: "",
  hardwareId: "",
});
const rules = {
  consumption: {
    required: helpers.withMessage("Este campo es requerido", required),
  },
  cost: {
    required: helpers.withMessage("Este campo es requerido", required),
  },
  status: {
    required: helpers.withMessage("Elija el estado de la factura", required),
  },
  customerId: {
    required: helpers.withMessage("Se requiere un usuario", required),
  },
  hardwareId: {
    required: helpers.withMessage("Se requiere un medidor", required),
  },
};
const v$ = useVuelidate(rules, formData);
const errors = ref([]);

async function handleSubmit() {
  const isFormCorrect = await v$.value.$validate();
  if (isFormCorrect) {
    try {
      formData.consumption = parseFloat(formData.consumption);
      formData.cost = parseFloat(formData.cost);
      formData.customerId = parseInt(formData.customerId);
      formData.hardwareId = parseInt(formData.hardwareId);
      if (!route.query.id) {
        await createBillRequest(formData);
      } else await updateBillByIdRequest(route.query.id, formData);
      toast.success("Factura creada exitosamente");
      router.push({ name: "bills" });
    } catch (error) {
      errors.value = error.response.data.errors;
      errors.value.map((item) => toast.error(item));
    }
  }
}

async function loadHardware() {
  try {
    const res = await getCustomerHardwareByIdRequest(formData.customerId);
    hardware.value = res.data;
  } catch (error) {
    toast.error("Error al cargar los datos");
    router.push({ name: "bills" });
  }
}

watch(
  () => formData.customerId,
  (id) => {
    if (id) {
      loadHardware();
    }
  }
);

onMounted(async () => {
  try {
    const res = await getCustomersRequest();
    customers.value = res.data;
    if (formData.customerId) {
      const res = await getCustomerHardwareByIdRequest(formData.customerId);
      hardware.value = res.data;
      console.log(hardware.value);
    }
  } catch (error) {
    toast.error("Error al cargar los datos");
    router.push({ name: "bills" });
  }
  if (route.query.id) {
    try {
      const res = await getBillByIdRequest(route.query.id);
      Object.assign(formData, res.data);
    } catch (error) {
      toast.error("Error al cargar los datos");
      router.push({ name: "bills" });
    }
  }
});
</script>

<template>
  <Form title="Cliente" icon="fa-user-tie" @handleSubmit="handleSubmit"
    ><h6
      class="text-gray-400 dark:text-gray-100 text-sm mt-3 mb-6 font-bold uppercase"
    >
      Datos del cliente
    </h6>
    <div class="flex flex-wrap">
      <div class="w-full lg:w-4/12 px-4">
        <Input
          id="consumption"
          labelText="Consumo"
          v-model="v$.consumption.$model"
          :errors="v$.consumption.$errors"
          type="text"
        />
      </div>
      <div class="w-full lg:w-4/12 px-4">
        <Input
          id="cost"
          labelText="Costo"
          v-model="v$.cost.$model"
          :errors="v$.cost.$errors"
          type="text"
        />
      </div>
      <div class="w-full lg:w-4/12 px-4">
        <Checkbox
          id="status"
          labelText="Estado de pago"
          v-model="v$.status.$model"
        />
      </div>
      <div class="w-full lg:w-6/12 px-4">
        <Select
          id="customerId"
          labelText="Usuario"
          v-model="v$.customerId.$model"
          :errors="v$.customerId.$errors"
          name="firstName"
          :options="customers"
        />
      </div>
      <div class="w-full lg:w-6/12 px-4">
        <Select
          id="hardwareId"
          labelText="Medidores"
          v-model="v$.hardwareId.$model"
          :errors="v$.hardwareId.$errors"
          name="mack"
          :options="hardware"
        />
      </div>
    </div>
  </Form>
</template>
