<template>
  <v-container>
    <v-card max-width="800" class="mx-auto mt-8 pb-5" rounded="xl" elevation="4">
      <v-toolbar flat class="rounded-t-xl">
      </v-toolbar>

      <v-card-text>
        <v-row>
          <v-col>
            <div class="mt-12">Version:</div>
          </v-col>
          <v-col>
            <div class="mt-12">v{{pack.version}}</div>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <div class="mt-12">Birthdate:</div>
          </v-col>
          <v-col>
            <v-text-field transition="scroll-y-transition" variant="outlined" density="compact" type="text"
              class="mt-9 mr-2" v-model="user.birthdate"></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <div class="mt-12">Country:</div>
          </v-col>
          <v-col>
            <v-select transition="scroll-y-transition" :items="countrys" variant="outlined" density="compact"
              type="text" class="mt-9 mr-2" v-model="user.country">
            </v-select>
          </v-col>
        </v-row>
      </v-card-text>
      <v-divider class="mx-4"></v-divider>
      <v-card-actions class="pa-4">
        <v-spacer></v-spacer>
        <v-btn color="primary" variant="depressed" @click="syncSettings">Save</v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>
import pack from "../../package.json"
import { mapState } from "pinia";
import { useUserAccStore } from "@/stores/userAcc";
import lifeExpectancy from "@/assets/json/lifeExpectancy.json"
export default {
  name: "Settings",
  data: () => ({
    lifeExpectancy: lifeExpectancy,
    countrys: Object.keys(lifeExpectancy),
    pack: pack
  }),
  methods: {
    async syncSettings() {
      await updateDoc(doc(this.$db, "accs", this.user.uid), this.user);
    }
  },
  computed: {
    ...mapState(useUserAccStore, ["user"])
  },
}
</script>

<style>
</style>