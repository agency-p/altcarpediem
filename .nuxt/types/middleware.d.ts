import type { NavigationGuard } from "vue-router";
export type MiddlewareKey = string;
declare module "/home/philipp/Desktop/carpediem/node_modules/nuxt/dist/pages/runtime/composables" {
  interface PageMeta {
    middleware?:
      | MiddlewareKey
      | NavigationGuard
      | Array<MiddlewareKey | NavigationGuard>;
  }
}
