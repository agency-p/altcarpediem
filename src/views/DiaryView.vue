<template>
  <v-container>
    <v-card max-width="1400" class="mx-auto mt-8" rounded="xl" elevation="4">
      <v-toolbar flat class="rounded-t-xl">
        <v-toolbar-items>
          <v-icon v-if="saved">
            mdi-cloud-check
          </v-icon>
          <v-progress-circular indeterminate size="24" v-else></v-progress-circular>
          <v-spacer></v-spacer>
          <v-btn icon color="primary" @click="likeEntry">
            <v-icon>{{ diaryEntry.liked ? "mdi-heart" : "mdi-heart-outline" }}</v-icon>
          </v-btn>
        </v-toolbar-items>
      </v-toolbar>


      <v-card-text>
        <v-row>
          <!--  <v-col>
            <v-sheet v-ripple class="container" rounded="xl" color="#EEEEEE" height="300" width="100%"
              @click="$refs.file.click()">
              <input type="file" ref="file" style="display: none">
              <v-avatar>
                <v-img src="/img/add.svg" aspect-ratio="1" cover></v-img>

              </v-avatar>
            </v-sheet>
          </v-col> -->
          <v-col>
            <v-text-field v-model="diaryEntry.title" color="primary" variant="outlined" @update:model-value="debounceUpdate"></v-text-field>
            <v-textarea v-model="diaryEntry.text" color="primary" auto-grow @update:model-value="debounceUpdate"
              variant="outlined" label="Dear Diary">
            </v-textarea>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import { mapState } from "pinia";
import { useUserAccStore } from "@/stores/userAcc";
import { useTimeMachineStore } from "@/stores/timeMachine";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { debounce } from 'debounce';
export default {
  name: "DirayView",
  data: () => ({
    saved: true,
    diaryEntry: {
      imgs: [],
      liked: false,
      text: "",
      title: ""
    }
  }),
  methods: {
    debounceUpdate: debounce(function () {
      this.syncDiaryEntry()
    }, 1000),
    async syncDiaryEntry() {
      this.saved = false
      let d = this.displayTime.split("/")
      await updateDoc(doc(this.$db, "diary", `${this.uid}-${d[0]}${d[1]}${d[2]}`), this.diaryEntry);
      setTimeout(() => {
        this.saved = true
      }, 350)
    },
    async getDiaryEntry(date) {
      let d = date.split("/")
      const diaryDoc = await getDoc(doc(this.$db, "diary", `${this.uid}-${d[0]}${d[1]}${d[2]}`));

      if (diaryDoc.exists()) {
        this.diaryEntry = diaryDoc.data()
      } else {
        this.diaryEntry = {
          imgs: [],
          liked: false,
          text: "",
          title: ""
        }
        await setDoc(doc(this.$db, "diary", `${this.uid}-${d[0]}${d[1]}${d[2]}`), {
          imgs: [],
          liked: false,
          text: "",
          title: ""
        });
      }
    },
    likeEntry() {
      this.diaryEntry.liked = !this.diaryEntry.liked
      this.debounceUpdate()
    }
  },
  computed: {
    ...mapState(useUserAccStore, ["uid"]),
    ...mapState(useTimeMachineStore, ["displayTime"])
  },
  created() {
    this.getDiaryEntry(this.displayTime)
    this.$emitter.on('date-changed', (evt) => {
      this.getDiaryEntry(evt.date)
    })
  },
}
</script>

<style>
.container {
  display: flex;
  justify-content: center;
  align-content: center;
}
</style> 