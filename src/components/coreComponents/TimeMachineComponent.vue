<template>
  <CalendarMenu></CalendarMenu>
  <span>{{ getWeekday }}</span>
  <v-spacer></v-spacer>
  <v-btn variant="plain" icon @click="subtractDay">
    <v-icon> mdi-chevron-left </v-icon>
  </v-btn>
  <span class="ml-2 mr-1">{{ displayTime }}</span>
  <v-btn variant="plain" icon @click="addDay">
    <v-icon> mdi-chevron-right </v-icon>
  </v-btn>
  <v-spacer></v-spacer>
  <v-btn @click="goToday" color="primary">Today</v-btn>
</template>

<script>
import { mapState, mapActions } from "pinia";
import { useTimeMachineStore } from "@/stores/timeMachine";
import CalendarMenu from "./CalendarMenuComponent.vue";
export default {
  name: "TimeMachine",
  components: {
    CalendarMenu,
  },
  methods: {
    ...mapActions(useTimeMachineStore, ["subtractDay", "addDay", "goToday"]),
  },
  computed: {
    ...mapState(useTimeMachineStore, ["displayTime", "getWeekday"]),
  },
};
</script>

<style></style>
