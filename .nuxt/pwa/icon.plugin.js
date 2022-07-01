export default async function (ctx, inject) {
  const icons = {
    "64x64": "/_nuxt/icons/icon_64x64.e3e9fb.png",
    "120x120": "/_nuxt/icons/icon_120x120.e3e9fb.png",
    "144x144": "/_nuxt/icons/icon_144x144.e3e9fb.png",
    "152x152": "/_nuxt/icons/icon_152x152.e3e9fb.png",
    "192x192": "/_nuxt/icons/icon_192x192.e3e9fb.png",
    "384x384": "/_nuxt/icons/icon_384x384.e3e9fb.png",
    "512x512": "/_nuxt/icons/icon_512x512.e3e9fb.png",
    ipad_1536x2048: "/_nuxt/icons/splash_ipad_1536x2048.e3e9fb.png",
    ipadpro9_1536x2048: "/_nuxt/icons/splash_ipadpro9_1536x2048.e3e9fb.png",
    ipadpro10_1668x2224: "/_nuxt/icons/splash_ipadpro10_1668x2224.e3e9fb.png",
    ipadpro12_2048x2732: "/_nuxt/icons/splash_ipadpro12_2048x2732.e3e9fb.png",
    iphonese_640x1136: "/_nuxt/icons/splash_iphonese_640x1136.e3e9fb.png",
    iphone6_50x1334: "/_nuxt/icons/splash_iphone6_50x1334.e3e9fb.png",
    iphoneplus_1080x1920: "/_nuxt/icons/splash_iphoneplus_1080x1920.e3e9fb.png",
    iphonex_1125x2436: "/_nuxt/icons/splash_iphonex_1125x2436.e3e9fb.png",
    iphonexr_828x1792: "/_nuxt/icons/splash_iphonexr_828x1792.e3e9fb.png",
    iphonexsmax_1242x2688:
      "/_nuxt/icons/splash_iphonexsmax_1242x2688.e3e9fb.png",
  };
  const getIcon = (size) => icons[size + "x" + size] || "";
  inject("icon", getIcon);
}
