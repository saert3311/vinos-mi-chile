import { defineStore } from "pinia";

export const useProducts = defineStore("useProducts", {
  state: () => {
    return {
      home: [],
      products: [],
      promo_products: [],
      accessories: [],
      cart: [],
    };
  },
  getters: {
    cartSubtotal(state) {
      return state.cart.reduce((acc, item) => acc + item.price, 0);
    },
  },
  actions: {
    async getHomeData() {
      try {
        const data = await fetch("/fakeapi/home.json");
        if (!data.ok) {
          throw new Error("HTTP error " + data.status);
        }
        this.home = await data.json();
        return "ok";
      } catch (e) {
        console.log(e);
        return { error: e };
      }
    },
    async getProducts() {
      try {
        const data = await fetch("/fakeapi/productos.json");
        if (!data.ok) {
          throw new Error("HTTP error " + data.status);
        }
        this.products = await data.json();
        return "ok";
      } catch (e) {
        console.log(e);
        return { error: e };
      }
    },
    async getPromoProducts() {
      try {
        const data = await fetch("/fakeapi/promocion.json");
        if (!data.ok) {
          throw new Error("HTTP error " + data.status);
        }
        this.promo_products = await data.json();
        return "ok";
      } catch (e) {
        console.log(e);
        return { error: e };
      }
    },
    async getAccessories() {
      try {
        const data = await fetch("/fakeapi/accesorios.json");
        if (!data.ok) {
          throw new Error("HTTP error " + data.status);
        }
        this.accessories = await data.json();
        return "ok";
      } catch (e) {
        console.log(e);
        return { error: e };
      }
    },
    addProduct(product) {
      this.cart.push(product);
    },
    destroyProduct(id) {
      this.cart = this.cart.filter((item) => item.id !== id);
    },
    resetCart() {
      this.cart = [];
    },
  },
});
