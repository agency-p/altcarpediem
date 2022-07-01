<template>
  <v-app>
    <PwaReloadComponent></PwaReloadComponent>
    <AppBarComponent></AppBarComponent>
    <NavBarComponent v-if="$route.name !== 'Auth'"></NavBarComponent>
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import PwaReloadComponent from "./components/pwaComponents/PwaReloadComponent.vue";
import AppBarComponent from "./components/coreComponents/AppBarComponent.vue";
import NavBarComponent from "./components/coreComponents/NavBarComponent.vue";
export default {
  name: "App",
  components: {
    PwaReloadComponent,
    AppBarComponent,
    NavBarComponent,
  },
};
</script>

<style></style>
