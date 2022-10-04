import { createRouter, createWebHistory } from "vue-router";
import HelloWorld from "./components/HelloWorld";
import ProductDetails from "./components/ProductDetails";
const routes = [
  {
    path: "/HelloWorld",
    name: "HelloWorld",
    component: HelloWorld,
  },
  {
    path: "/ProductList",
    name: "ProductList",
    component: () => import("./components/ProductList.vue"),
  },
  {
    path: "/detail/:id",
    name: "Details",
    component: ProductDetails,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
