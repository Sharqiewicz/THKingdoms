import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Home from "../views/Home.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/rules",
    name: "Rules",
    component: () =>
      import(/* webpackChunkName: "rules" */ "../views/Rules.vue"),
  },{
    path: "/game",
    name: "Game",
    component: () =>
      import(/* webpackChunkName: "game" */ "../views/Game.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
