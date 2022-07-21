<template>
  <q-page padding class="boxed">
    <div class="text-h4 text-center q-py-md">Nuestros vinos</div>
    <div class="row q-col-gutter-md">
      <div
        class="col-12 col-md-6 col-lg-3"
        v-for="vine in products.productos"
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
  name: "VinesPage",
  components: {
    "vine-card": VineCard,
  },
  methods: {
    ...mapActions(useProducts, ["getProducts"]),
    async fetchData() {
      this.$q.loading.show();
      try {
        await this.getProducts();
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
    ...mapState(useProducts, ["products"]),
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