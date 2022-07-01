import { defineStore } from "pinia";

export const useUserAccStore = defineStore({
  id: "userAcc",
  state: () => ({
    user: {
      birthdate: "",
    },
  }),
  actions: {
    updateUserData(data) {
      this.user = data;
    },
  },
});
