<template>
  <q-page padding class="boxed">
    <div class="text-h4 text-center q-py-md">Checkout</div>
    <div class="q-gutter-md">
      <div class="text-subtitle2 q-py-md">Datos del comprador</div>
      <q-input
        v-model="name"
        label="Nombre"
        :error="v$.name.$invalid"
        bottom-slots
      >
        <template v-slot:error>
          <span v-for="error of v$.name.$errors" :key="error.$uid">
            {{ name.$message }}<br v-if="v$.name.$errors.length > 1"
          /></span> </template
      ></q-input>
      <q-input
        v-model="email"
        label="Email"
        :error="v$.email.$invalid"
        bottom-slots
      >
        <template v-slot:error>
          <span v-for="error of v$.email.$errors" :key="error.$uid">
            {{ error.$message }}<br v-if="v$.email.$errors.length > 1"
          /></span> </template
      ></q-input>
      <q-input
        v-model="repeat_email"
        label="Repetir Email"
        :error="v$.repeat_email.$invalid"
        bottom-slots
      >
        <template v-slot:error>
          <span v-for="error of v$.repeat_email.$errors" :key="error.$uid">
            {{ error.$message }}<br v-if="v$.repeat_email.$errors.length > 1"
          /></span> </template
      ></q-input>
      <q-input
        v-model="phone"
        label="Telefono"
        :error="v$.phone.$invalid"
        bottom-slots
      >
        <template v-slot:error>
          <span v-for="error of v$.phone.$errors" :key="error.$uid">
            {{ error.$message }}<br v-if="v$.phone.$errors.length > 1"
          /></span> </template
      ></q-input>
      <div class="text-subtitle2 q-py-md">Datos del Despacho</div>
      <q-input
        v-model="address"
        label="Dirección"
        :error="v$.address.$invalid"
        bottom-slots
      >
        <template v-slot:error>
          <span v-for="error of v$.address.$errors" :key="error.$uid">
            {{ error.$message }}<br v-if="v$.address.$errors.length > 1"
          /></span> </template
      ></q-input>
      <q-input
        v-model="comuna"
        label="Comuna"
        :error="v$.comuna.$invalid"
        bottom-slots
      >
        <template v-slot:error>
          <span v-for="error of v$.comuna.$errors" :key="error.$uid">
            {{ error.$message }}<br v-if="v$.comuna.$errors.length > 1"
          /></span> </template
      ></q-input>

      <div class="text-subtitle2 q-py-md">Forma de Pago</div>
      <div class="q-gutter-sm">
        <q-radio
          v-model="payment"
          val="transferencia"
          label="Transferencia Bancaria"
        />
        <q-radio v-model="payment" val="servipag" label="Servipag" />
        <q-radio v-model="payment" val="webpay" label="Webpay" />
        <q-radio v-model="payment" val="contra_entrega" label="Contraentrega" />
      </div>
    </div>
    <q-btn color="teal" @click="doCheckout">
      <q-icon left size="3em" name="paid" />
      <div>Pagar</div>
    </q-btn>
  </q-page>
</template>

<script>
import useVuelidate from "@vuelidate/core";
import {
  required,
  email,
  helpers,
  sameAs,
  numeric,
  minLength,
  maxLength,
} from "@vuelidate/validators";
import { mapActions } from "pinia";
import { useProducts } from "src/stores/ProductStore";
export default {
  name: "CheckoutPage",
  setup() {
    return {
      v$: useVuelidate(),
    };
  },
  data() {
    return {
      name: "",
      email: "",
      repeat_email: "",
      phone: "",
      address: "",
      comuna: "",
      payment: "",
    };
  },
  validations() {
    return {
      email: {
        required: helpers.withMessage("El email es requerido", required),
        email: helpers.withMessage("El email debe ser valido", email),
        $lazy: true,
      },
      repeat_email: {
        required: helpers.withMessage("Necesitas repetir el email", required),
        sameAsPassword: helpers.withMessage(
          "Debe ser igual",
          sameAs(this.email)
        ),
        $lazy: true,
      },
      phone: {
        required: helpers.withMessage("El email es requerido", required),
        numeric: helpers.withMessage("Solo se permiten numeros", numeric),
        minLength: helpers.withMessage("Formato incorrecto", minLength(9)),
        maxLength: helpers.withMessage("Formato incorrecto", maxLength(11)),
        $lazy: true,
      },
      address: {
        required: helpers.withMessage("Se requiere la dirección", required),
        $lazy: true,
      },
      comuna: {
        required: helpers.withMessage("Se requiere la comuna", required),
        $lazy: true,
      },
      name: {
        required: helpers.withMessage("Se requiere la comuna", required),
        $lazy: true,
      },
    };
  },
  methods: {
    ...mapActions(useProducts, ["resetCart"]),
    async doCheckout() {
      this.$q.loading.show();
      const { name, email, phone, address, comuna, payment } = this;
      const isFormCorrect = await this.v$.$validate();
      if (!isFormCorrect) return this.$q.loading.hide();
      $q.notify({
        type: "positive",
        message: "Gracias por su compra.",
      });
      this.resetCart();
      this.$route.push("/");
    },
  },
};
</script>

<style>
.boxed {
  margin: 0 auto;
  max-width: 600px;
}
</style>