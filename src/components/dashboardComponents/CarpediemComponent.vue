<template>
    <v-container>
        <v-card class="graph mx-auto mt-8" rounded="xl" elevation="4">
            <v-toolbar flat class="rounded-t-xl">
                <v-toolbar-title>Carpediem</v-toolbar-title>
                <v-toolbar-items>
                    <v-text-field transition="scroll-y-transition" variant="outlined" density="compact"
                        label="Birthdate" type="text" class="mt-9 mr-2" v-model="user.birthdate"></v-text-field>
                    <v-select transition="scroll-y-transition" :items="Object.keys(lifeExpectancy)" variant="outlined"
                        density="compact" label="Country" type="text" class="mt-9 mr-2" v-model="user.country">
                    </v-select>
                    <v-select transition="scroll-y-transition" :items="Object.keys(lifeExpectancy)" variant="outlined"
                        density="compact" label="Country" type="text" class="mt-9" v-model="user.country"></v-select>
                </v-toolbar-items>
            </v-toolbar>

            <v-card-text class="pa-8">
                <v-row class="squares"></v-row>
                <!-- added via javascript -->
            </v-card-text>

        </v-card>
    </v-container>
</template>

<script>
import moment from "moment"
import { mapState } from "pinia";
import { useUserAccStore } from "@/stores/userAcc";
import { useTimeMachineStore } from "@/stores/timeMachine"
import lifeExpectancy from "@/assets/json/lifeExpectancy.json"
export default {
    name: "CarpediemComponent",
    data: () => ({
        lifeExpectancy: lifeExpectancy,
        mode: "weeks"
    }),
    mounted() {
        this.renderCarpediem
    },
    computed: {
        renderCarpediem() {
            const squares = document.querySelector('.squares');

            var start = moment(this.user.birthdate, "DD/MM/YYYY");
            var current = moment(this.displayTime, "DD/MM/YYYY");
            let timeCounter = current.diff(start, this.mode)



            for (let i = 1; i < 4160; i++) {
                let level
                if (timeCounter >= i) {
                    level = 3
                }
                else {
                    level = 1
                }
                squares.insertAdjacentHTML('beforeend', `<div class="square" data-level="${level}"></div>`);
            }
        },
        ...mapState(useUserAccStore, ["user"]),
        ...mapState(useTimeMachineStore, ["displayTime"])
    }
}
</script>

<style >
.square {
    margin: 2px;
    height: 15px;
    width: 15px;
    border-radius: 10%;
}

.square {
    background-color: #4375c0;
}

.square[data-level="1"] {
    background-color: #ECE1FD;
}

.square[data-level="2"] {
    background-color: #7bc96f;
}

.square[data-level="3"] {
    background-color: #6709EE;
}
</style>