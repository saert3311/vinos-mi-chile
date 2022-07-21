<template>
  <div class="q-pa-md">
    <q-list>
      <q-item v-for="(product, index) in cart" :key="index" clickable v-ripple>
        <q-item-section avatar>
          <q-avatar rounded>
            <img :src="product.img" />
          </q-avatar>
        </q-item-section>
        <q-item-section>
          <q-item-label class="text-weight-bold">{{
            product.name
          }}</q-item-label>
          <q-item-label>{{ priceLocale(product.price) }}</q-item-label>
        </q-item-section>

        <q-item-section side top>
          <q-icon name="delete" color="red" @click="removeProduct(product)" />
        </q-item-section>
      </q-item>
    </q-list>
  </div>
  <div class="q-pa-md">
    <q-card class="my-card" flat bordered>
      <q-item>
        <q-item-section>
          <q-item-label class="text-weight-bold text-center"
            >Resumen de Productos</q-item-label
          >
        </q-item-section>
      </q-item>

      <q-separator />

      <q-card-section horizontal>
        <q-card-section class="text-weight-bold col-6">Subtotal</q-card-section>

        <q-separator vertical />

        <q-card-section class="col-6">
          {{ priceLocale(cartSubtotal) }}
        </q-card-section>
      </q-card-section>
      <q-separator />
      <q-card-section horizontal>
        <q-card-section class="text-weight-bold col-6"
          >Descuentos</q-card-section
        >

        <q-separator vertical />

        <q-card-section class="col-6">
          {{ priceLocale(discount) }}
        </q-card-section>
      </q-card-section>
    </q-card>
    <q-btn
      @click="goCheckout"
      unelevated
      color="primary"
      label="Pagar"
      class="full-width q-mt-md"
      v-if="cartSubtotal > 0"
    />
  </div>
</template>

<script>
import { mapState, mapActions } from "pinia";
import { useProducts } from "src/stores/ProductStore";

export default {
  name: "CartDrawer",
  computed: {
    ...mapState(useProducts, ["cart", "cartSubtotal"]),
    discount() {
      let percentage = 0;
      if (this.cartSubtotal < 100000) {
        percentage = 0.05;
      } else {
        percentage = 0.11;
      }
      return this.cartSubtotal * percentage;
    },
  },
  methods: {
    ...mapActions(useProducts, ["destroyProduct"]),
    priceLocale(price) {
      return new Intl.NumberFormat("es-CL", {
        style: "currency",
        currency: "CLP",
      }).format(price);
    },
    removeProduct(product) {
      this.destroyProduct(product.id);
      this.$q.notify({
        type: "positive",
        message: "Producto Eliminado",
      });
    },
    goCheckout() {
      this.$router.push("/checkout");
    },
  },
};
</script>

<style>
</style>