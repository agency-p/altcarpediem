import { defineStore } from "pinia";

export const useUserAccStore = defineStore({
  id: "userAcc",
  state: () => ({
    user: null,
  }),
  actions: {
    updateUserData(data) {
      this.user = data;
    },
  },
});
