<template>
  <q-card>
    <q-img
      :src="vine.imagen"
      :alt="vine.nombre"
      :fit="cover"
      class="course-img"
    />
    <q-card-section>
      <div class="text-h6">{{ vine.nombre }}</div>
      <div class="text-subtitle2">
        {{ vine.descripcion }}
      </div>
    </q-card-section>
    <q-list v-if="hasChar">
      <q-item clickable>
        <q-item-section avatar>
          <q-icon color="purple-10" name="scale" />
        </q-item-section>

        <q-item-section>
          <q-item-label>Cuerpo</q-item-label>
          <q-item-label caption> {{ vineChars.Cuerpo }}</q-item-label>
        </q-item-section>
      </q-item>
      <q-item clickable>
        <q-item-section avatar>
          <q-icon color="primary" name="water_drop" />
        </q-item-section>

        <q-item-section>
          <q-item-label>Contenido</q-item-label>
          <q-item-label caption> {{ vineChars.Contenido }}</q-item-label>
        </q-item-section>
      </q-item>
      <q-item clickable>
        <q-item-section avatar>
          <q-icon color="teal-9" name="location_on" />
        </q-item-section>

        <q-item-section>
          <q-item-label>Valle</q-item-label>
          <q-item-label caption>{{ vineChars.Valle }}</q-item-label>
        </q-item-section>
      </q-item>
    </q-list>
    <q-card-section horizontal>
      <q-card-section class="col-6">
        <div class="text-subtitle1 text-center">Antes</div>
        <div class="text-caption text-center">
          {{ priceLocale(vine.precio_normal) }}
        </div>
      </q-card-section>

      <q-card-section class="col-6">
        <div class="text-subtitle1 text-center">Ahora</div>
        <div class="text-caption text-center">
          {{ priceLocale(vine.precio_promo) }}
        </div>
      </q-card-section>
    </q-card-section>
    <q-separator />
    <q-card-actions vertical>
      <q-btn flat @click="pushProduct">Agregar</q-btn>
    </q-card-actions>
  </q-card>
</template>

<script>
import { mapActions } from "pinia";
import { useProducts } from "src/stores/ProductStore";
export default {
  name: "VineCard",
  props: ["vine"],
  computed: {
    vineChars() {
      if (this.vine.caracteristicas == undefined) return false; //asi mato la ejecicion anmtes de ejecutar lo de abajo
      // funcion para meter las caracteristicas del vino en un objeto iterable mas facil de usar
      let obj = {};
      this.vine.caracteristicas.forEach((item) => {
        //dividimos usando split y sacamos espacios
        let name = item.split(":")[0].replace(/\s/g, "");
        let value = item.split(":")[1].replace(/\s/g, "");
        //solo asignamos el valor y devolvemos
        obj[name] = value;
      });
      return obj;
    },
    hasChar() {
      // si no tenemos las caracteristicas no cargamos esa parte con un v-if
      if ("caracteristicas" in this.vine) {
        return true;
      } else {
        return false;
      }
    },
  },
  methods: {
    ...mapActions(useProducts, ["addProduct"]),
    priceLocale(price) {
      return new Intl.NumberFormat("es-CL", {
        style: "currency",
        currency: "CLP",
      }).format(price);
    },
    pushProduct() {
      this.addProduct({
        id: this.vine.id,
        name: this.vine.nombre,
        price: parseInt(this.vine.precio_promo),
        img: this.vine.imagen,
      });
      this.$q.notify({
        type: "positive",
        message: `Has agregado ${this.vine.nombre}.`,
      });
    },
  },
};
</script>

<style>
.course-img {
  min-height: 200px;
  max-height: 200px;
}
</style>