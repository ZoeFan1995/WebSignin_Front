import { createRouter, createWebHashHistory } from "vue-router";
import Login from "@/components/Login.vue";

const routes = [
  {
    path: "/",
    name: "Login",
    component: Login,
  },
  {
    path: "/checkin",
    name: "Checkin",
    component: () => import("@/components/Checkin.vue"),
  },
  {
    path: "/:pathMatch(.*)*",
    name: "NotFoundPage",
    component: () => import("@/components/NotFoundPage.vue"),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
