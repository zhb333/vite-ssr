import {
  createRouter as _createRouter,
  createMemoryHistory,
  createWebHistory,
} from "vue-router";
import type { RouteRecordRaw } from "vue-router";

const pages = import.meta.glob("../pages/*.vue");

const routes: RouteRecordRaw[] = Object.keys(pages).map((path) => {
  const result = path.match(/\..\/pages(.*)\.vue$/);
  let name = "";
  if (result) {
    name = result[1].toLowerCase();
  }

  return {
    path: name === "/home" ? "/" : name,
    component: pages[path], // () => import('./pages/*.vue')
  };
});

export function createRouter() {
  return _createRouter({
    // use appropriate history implementation for server/client
    // import.meta.env.SSR is injected by Vite.
    history: import.meta.env.SSR ? createMemoryHistory() : createWebHistory(),
    routes,
  });
}
