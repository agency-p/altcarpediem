import { ComputedRef, Ref } from "vue";
export type LayoutKey = "desktop" | "mobil";
declare module "/home/philipp/Desktop/carpediem/node_modules/nuxt/dist/pages/runtime/composables" {
  interface PageMeta {
    layout?: false | LayoutKey | Ref<LayoutKey> | ComputedRef<LayoutKey>;
  }
}
