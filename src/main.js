import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "./router";
import vuetify from "./plugins/vuetify";
import { loadFonts } from "./plugins/webfontloader";
import { emitter } from "@/assets/js/emitter.js";

/* Firebase */
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "@/assets/js/firebase.js";

loadFonts();
const app = createApp(App).use(router).use(vuetify).use(createPinia());

/* Global Variables */
app.config.globalProperties.$emitter = emitter;
app.config.globalProperties.$auth = auth;
app.config.globalProperties.$db = db;

/* User Acc */
import { useUserAccStore } from "@/stores/userAcc";
import { doc, getDoc } from "firebase/firestore";

router.isReady().then(() => {
  let mounted = false;
  onAuthStateChanged(auth, async (user) => {
    if (user) {
      const userAccStore = useUserAccStore();
      const docRef = doc(db, "accs", user.uid);
      const docData = await getDoc(docRef);
      userAccStore.updateUserData(docData.data());
      if (mounted != true) {
        app.mount("#app");
        mounted = true;
      }
      router.push("/");
    } else {
      if (mounted != true) {
        app.mount("#app");
        mounted = true;
      }
      router.push("/auth");
    }
  });
});
