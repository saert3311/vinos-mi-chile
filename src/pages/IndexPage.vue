<template>
  <q-page padding class="boxed">
    <div class="q-pa-md">
      <q-carousel
        arrows
        animated
        transition-prev="slide-right"
        transition-next="slide-left"
        swipeable
        infinite
        :autoplay="autoplay"
        v-model="slide"
        control-color="primary"
        height="400px"
      >
        <q-carousel-slide
          v-for="(vine, index) in home.mejoresvinos"
          :key="index"
          :name="index"
          :img-src="vine.imagen"
        >
          <div class="absolute-bottom custom-caption">
            <div class="text-h5">{{ vine.titulo }}</div>
          </div>
        </q-carousel-slide>
      </q-carousel>
    </div>
    <div class="text-h4 text-center q-py-md">Nuestros vinos</div>
    <div class="row q-col-gutter-md">
      <div
        class="col-12 col-md-6 col-lg-4"
        v-for="(vine, index) in home.tiposvino"
        :key="index"
      >
        <vine-card :vine="vine" />
      </div>
    </div>
  </q-page>
</template>

<script>
import { defineComponent } from "vue";
import { mapActions, mapState } from "pinia";
import { useProducts } from "src/stores/ProductStore";
import VineTypeCard from "src/components/VineTypeCard.vue";
export default defineComponent({
  name: "IndexPage",
  data() {
    return {
      slide: 0,
    };
  },
  components: {
    "vine-card": VineTypeCard,
  },
  methods: {
    ...mapActions(useProducts, ["getHomeData"]),
    async fetchHomeData() {
      this.$q.loading.show();
      try {
        await this.getHomeData();
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
    ...mapState(useProducts, ["home"]),
  },
  created() {
    this.fetchHomeData();
  },
});
</script>

<style lang="sass" scoped>
.boxed
  margin: 0 auto
  max-width: 1280px

.custom-caption
  text-align: center
  padding: 12px
  color: white
  background-color: rgba(0, 0, 0, .3)
</style>