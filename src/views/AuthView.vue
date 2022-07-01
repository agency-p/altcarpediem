<template>
  <SignInComponent v-if="authMode"></SignInComponent>
  <SignUpComponent v-else></SignUpComponent>
</template>

<script>
import { mapState } from "pinia";
import { useAuthModeStore } from "@/stores/authMode";
import SignInComponent from "@/components/authComponents/SignInComponent.vue";
import SignUpComponent from "@/components/authComponents/SignUpComponent.vue";
export default {
  name: "AuthView",
  components: {
    SignInComponent,
    SignUpComponent,
  },
  computed: {
    ...mapState(useAuthModeStore, ["authMode"]),
  },
};
</script>

<style></style>
