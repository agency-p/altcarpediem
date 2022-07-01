import { defineStore } from "pinia";

export const useAuthModeStore = defineStore({
  id: "authMode",
  state: () => ({
    authMode: true,
  }),
  actions: {
    switchAuthMode() {
      this.authMode = !this.authMode;
    },
  },
});
