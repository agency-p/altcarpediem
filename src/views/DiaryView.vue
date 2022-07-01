<template>
  <v-container>
    <v-card
      max-width="1400"
      class="mx-auto mt-8 pb-5"
      rounded="xl"
      elevation="4"
      min-height="600"
    >
      <v-toolbar flat class="rounded-t-xl">
        <v-toolbar-items>
          <v-icon v-if="saved"> mdi-cloud-check </v-icon>
          <v-progress-circular
            indeterminate
            size="24"
            v-else
          ></v-progress-circular>
          <v-spacer></v-spacer>
          <v-text-field
            v-model="diaryEntry.title"
            label="Title"
            color="primary"
            variant="outlined"
            density="compact"
            class="mt-9"
            @update:model-value="debounceUpdate"
          ></v-text-field>
          <v-spacer></v-spacer>
          <v-btn icon color="primary" @click="likeEntry">
            <v-icon>{{
              diaryEntry.liked ? "mdi-heart" : "mdi-heart-outline"
            }}</v-icon>
          </v-btn>
        </v-toolbar-items>
      </v-toolbar>

      <!--   <v-card-text>
        <v-row class="container">
           <v-col>
            <v-sheet v-ripple class="container" rounded="xl" color="#EEEEEE" height="300" width="100%"
              @click="$refs.file.click()">
              <input type="file" ref="file" style="display: none">
              <v-avatar>
                <v-img src="/img/add.svg" aspect-ratio="1" cover></v-img>

              </v-avatar>
            </v-sheet>
          </v-col>
          <v-col>


            

            <v-textarea v-model="diaryEntry.text" color="primary" auto-grow @update:model-value="debounceUpdate"
              variant="outlined" label="Dear Diary">
            </v-textarea>
          </v-col>
        </v-row>
      </v-card-text> -->
      <editor
        style="min-height: 600px"
        class="rounded-b-xl"
        api-key="2zy9sbdmd73vk6zgef3ouui5rlansqmye7564tov3wamaqx5"
        :init="{
          skin: 'bootstrap',
          icons: 'bootstrap',
          plugins: 'image lists link anchor charmap',
          toolbar: 'blocks | bold italic bullist numlist | link image charmap',
          menubar: false,
        }"
        v-model="diaryEntry.text"
        @update:model-value="debounceUpdate"
      />
    </v-card>
  </v-container>
</template>

<script>
import Editor from "@tinymce/tinymce-vue";
import { mapState } from "pinia";
import { useUserAccStore } from "@/stores/userAcc";
import { useTimeMachineStore } from "@/stores/timeMachine";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { debounce } from "debounce";
export default {
  name: "DirayView",
  components: {
    editor: Editor,
  },
  data: () => ({
    saved: true,
    diaryEntry: {
      imgs: [],
      liked: false,
      text: "",
      title: "",
    },
  }),
  methods: {
    debounceUpdate: debounce(function () {
      this.syncDiaryEntry();
    }, 1000),
    async syncDiaryEntry() {
      this.saved = false;
      let d = this.displayTime.split("/");
      await updateDoc(
        doc(this.$db, "diary", `${this.user.uid}-${d[0]}${d[1]}${d[2]}`),
        this.diaryEntry
      );
      setTimeout(() => {
        this.saved = true;
      }, 350);
    },
    async getDiaryEntry(date) {
      let d = date.split("/");
      const diaryDoc = await getDoc(
        doc(this.$db, "diary", `${this.user.uid}-${d[0]}${d[1]}${d[2]}`)
      );

      if (diaryDoc.exists()) {
        this.diaryEntry = diaryDoc.data();
      } else {
        this.diaryEntry = {
          imgs: [],
          liked: false,
          text: "",
          title: "",
        };
        await setDoc(
          doc(this.$db, "diary", `${this.user.uid}-${d[0]}${d[1]}${d[2]}`),
          {
            imgs: [],
            liked: false,
            text: "",
            title: "",
          }
        );
      }
    },
    likeEntry() {
      this.diaryEntry.liked = !this.diaryEntry.liked;
      this.debounceUpdate();
    },
  },
  computed: {
    ...mapState(useUserAccStore, ["user"]),
    ...mapState(useTimeMachineStore, ["displayTime"]),
  },
  created() {
    this.getDiaryEntry(this.displayTime);
    this.$emitter.on("date-changed", (evt) => {
      this.getDiaryEntry(evt.date);
    });
  },
};
</script>

<style>
.container {
  height: inherit;
}
</style>
