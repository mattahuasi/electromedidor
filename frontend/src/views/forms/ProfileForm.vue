<script setup>
import { updateProfileRequest } from "@/api/auth";
import { useProfileStore } from "@/stores/profile";
import { onMounted, reactive } from "vue";
import { useVuelidate } from "@vuelidate/core";
import { required, helpers } from "@vuelidate/validators";
import { toast } from "vue-sonner";
import Form from "@/components/cards/Form.vue";
import Input from "@/components/inputs/Input.vue";

const profileStore = useProfileStore();
const formData = reactive({
  firstName: "",
  lastName: "",
  ci: "",
  phone: "",
  email: "",
});
const rules = {
  firstName: {
    required: helpers.withMessage("El nombre es requerido", required),
  },
  lastName: {
    required: helpers.withMessage("El apellido es requerido", required),
  },
  ci: { required: helpers.withMessage("El CI es requerido", required) },
  phone: {
    required: helpers.withMessage("El teléfono/celular es requerido", required),
  },
  email: { required: helpers.withMessage("El email es requerido", required) },
};
const v$ = useVuelidate(rules, formData);

async function handleSubmit() {
  const isFormCorrect = await v$.value.$validate();
  if (isFormCorrect) {
    try {
      const res = await updateProfileRequest(formData);
      profileStore.user = res.data;
      toast.success("Información actualizada correctamente");
    } catch (error) {
      error.response.data.errors.map((item) => toast.error(item));
    }
  }
}

onMounted(() => {
  Object.assign(formData, profileStore.dataUser);
});
</script>

<template>
  <Form
    title="Información de usuario"
    icon="fa-user"
    @handleSubmit="handleSubmit"
  >
    <h6
      class="text-gray-400 dark:text-gray-100 text-sm mt-3 mb-6 font-bold uppercase"
    >
      Perfil de usuario
    </h6>
    <div class="flex flex-wrap">
      <div class="w-full lg:w-full px-4">
        <Input
          id="email"
          labelText="Correo electrónico"
          v-model="v$.email.$model"
          :errors="v$.email.$errors"
          type="email"
          disabled
        />
      </div>
      <div class="w-full lg:w-6/12 px-4">
        <Input
          id="firstName"
          labelText="Nombre/s"
          v-model="v$.firstName.$model"
          :errors="v$.firstName.$errors"
          type="text"
        />
      </div>
      <div class="w-full lg:w-6/12 px-4">
        <Input
          id="lastName"
          labelText="Apellidos"
          v-model="v$.lastName.$model"
          :errors="v$.lastName.$errors"
          type="text"
        />
      </div>
      <div class="w-full lg:w-6/12 px-4">
        <Input
          id="ci"
          labelText="CI"
          v-model="v$.ci.$model"
          :errors="v$.ci.$errors"
          type="text"
        />
      </div>
      <div class="w-full lg:w-6/12 px-4">
        <Input
          id="phone"
          labelText="Teléfono/Celular"
          v-model="v$.phone.$model"
          :errors="v$.phone.$errors"
          type="text"
        />
      </div>
    </div>
  </Form>
</template>
