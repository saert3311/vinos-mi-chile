const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        path: "",
        name: "home",
        component: () => import("pages/IndexPage.vue"),
      },
      {
        path: "/vinos",
        name: "vinos",
        component: () => import("pages/VinesPage.vue"),
      },
      {
        path: "/promociones",
        name: "promociones",
        component: () => import("pages/PromoVinesPage.vue"),
      },
      {
        path: "/accesorios",
        name: "accesorios",
        component: () => import("pages/AccesoriesPage.vue"),
      },
      {
        path: "/checkout",
        name: "checkout",
        component: () => import("pages/CheckoutPage.vue"),
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
