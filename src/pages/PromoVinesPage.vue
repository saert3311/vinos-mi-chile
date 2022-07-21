<template>
  <q-page padding class="boxed">
    <div class="text-h4 text-center q-py-md">Vinos en Promoción</div>
    <div class="row q-col-gutter-md">
      <div
        class="col-12 col-md-6 col-lg-3"
        v-for="vine in promo_products.productos"
        :key="vine.id"
      >
        <vine-card :vine="vine" />
      </div>
    </div>
  </q-page>
</template>

<script>
import { mapActions, mapState } from "pinia";
import { useProducts } from "src/stores/ProductStore";
import VineCard from "src/components/VineCard.vue";
export default {
  name: "PromoVinesPage",
  components: {
    "vine-card": VineCard,
  },
  methods: {
    ...mapActions(useProducts, ["getPromoProducts"]),
    async fetchData() {
      this.$q.loading.show();
      try {
        await this.getPromoProducts();
      } catch (e) {
        console.log(e.error);
        this.$q.notify({
          type: "negative",
          message: e.error,
        });
      }
      this.$q.loading.hide();
    },
  },
  computed: {
    ...mapState(useProducts, ["promo_products"]),
  },
  created() {
    this.fetchData();
  },
};
</script>

<style lang="sass" scoped>
.boxed
  margin: 0 auto
  max-width: 1280px
</style>