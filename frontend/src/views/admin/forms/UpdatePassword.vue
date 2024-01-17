<script setup>
import { updatePasswordRequest } from "@/api/auth";
import { ref, reactive } from "vue";
import { useVuelidate } from "@vuelidate/core";
import { required, helpers } from "@vuelidate/validators";
import { toast } from "vue-sonner";
import Form from "@/components/cards/Form.vue";
import Input from "@/components/inputs/Input.vue";

const formData = reactive({
  oldPassword: "",
  newPassword: "",
  repeatPassword: "",
});
const rules = {
  oldPassword: {
    required: helpers.withMessage("Campo requerido", required),
  },
  newPassword: {
    required: helpers.withMessage("Campo Requerido", required),
  },
  repeatPassword: {
    required: helpers.withMessage("Campo requerido", required),
  },
};
const v$ = useVuelidate(rules, formData);
const errors = ref([]);

async function handleSubmit() {
  const isFormCorrect = await v$.value.$validate();
  if (isFormCorrect) {
    try {
      await updatePasswordRequest(formData);
      formData.oldPassword = "";
      formData.newPassword = "";
      formData.repeatPassword = "";
      v$.value.$reset();
      toast.success("Contraseña actualizada");
    } catch (error) {
      errors.value = error.response.data.errors;
      errors.value.map((item) => toast.error(item));
    }
  }
}
</script>

<template>
  <Form title="Cambiar contraseña" icon="fa-key" @handleSubmit="handleSubmit">
    <h6 class="text-gray-400 text-sm mt-3 mb-6 font-bold uppercase">
      Contraseña
    </h6>
    <div class="flex flex-wrap">
      <div class="w-full px-4">
        <Input
          id="oldPassword"
          labelText="Contraseña Actual"
          v-model="v$.oldPassword.$model"
          :errors="v$.oldPassword.$errors"
          type="password"
        />
      </div>
      <div class="w-full px-4">
        <Input
          id="newPassword"
          labelText="Nueva contraseña"
          v-model="v$.newPassword.$model"
          :errors="v$.newPassword.$errors"
          type="password"
        />
      </div>
      <div class="w-full px-4">
        <Input
          id="repeatPassword"
          labelText="Repetir nueva contraseña"
          v-model="v$.repeatPassword.$model"
          :errors="v$.repeatPassword.$errors"
          type="password"
        />
      </div>
    </div>
  </Form>
</template>
