
<template>
  <q-layout view="hHh lpR fFf">
    <q-header elevated class="bg-primary text-white" height-hint="98">
      <q-toolbar>
        <q-toolbar-title>
          <q-avatar>
            <q-icon name="wine_bar" style="font-size: 1.4em" />
          </q-avatar>
          Vinos mi Chile
        </q-toolbar-title>
        <q-btn
          dense
          flat
          icon="shopping_cart"
          @click="toggleRightDrawer"
          label="Ver carrito"
        />
      </q-toolbar>

      <q-tabs align="center">
        <q-route-tab to="/" label="Inicio" />
        <q-route-tab to="/vinos" label="Vinos" />
        <q-route-tab to="/promociones" label="Vinos en promocion" />
        <q-route-tab to="/accesorios" label="Accesorios" />
      </q-tabs>
    </q-header>
    <q-drawer v-model="rightDrawerOpen" side="right" overlay bordered>
      <cart-drawer />
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>

    <q-footer elevated class="bg-grey-8 text-white">
      <q-toolbar>
        <q-toolbar-title align="center">
          <div>
            Jose Duarte - Front End trainee 0027 - jose.duarte@outlook.cl
          </div>
        </q-toolbar-title>
      </q-toolbar>
    </q-footer>
  </q-layout>
</template>

<script>
import CartDrawer from "src/components/CartDrawer.vue";
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "MainLayout",

  setup() {
    const rightDrawerOpen = ref(false);

    return {
      rightDrawerOpen,
      toggleRightDrawer() {
        rightDrawerOpen.value = !rightDrawerOpen.value;
      },
    };
  },
  components: {
    "cart-drawer": CartDrawer,
  },
});
</script>
