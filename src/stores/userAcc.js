import { defineStore } from "pinia";

export const useUserAccStore = defineStore({
  id: "userAcc",
  state: () => ({
    uid: null,
    birthdate: null
  }),
  actions: {
    updateUserData(uid, birthdate) {
      this.uid = uid;
      this.birthdate = birthdate
    },
  },
});
