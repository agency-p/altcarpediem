<template>
  <div>Dashboard - Nothing in here for now</div>
  <div>uid - {{ uid }}</div>
  <div>birthday - {{ birthdate }}</div>
  <CarpediemComponent></CarpediemComponent>
</template>

<script>
import { mapState } from "pinia"
import { useUserAccStore } from "../stores/userAcc.js";
import CarpediemComponent from "../components/dashboardComponents/CarpediemComponent.vue";
export default {
  name: "DashboardView",
  components: {
    CarpediemComponent
  },
  computed: {
    ...mapState(useUserAccStore, ["uid", "birthdate"]),
  },
};
</script>

<style>
</style>
