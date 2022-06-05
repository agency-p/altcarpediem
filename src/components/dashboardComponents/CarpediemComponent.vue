<template>
    <v-container>
        <v-card class="graph mx-auto mt-8" rounded="xl" elevation="4">
            <v-toolbar flat class="rounded-t-xl">
                <v-toolbar-title>Carpediem</v-toolbar-title>
                <v-toolbar-items>
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
export default {
    name: "CarpediemComponent",
    mounted() {
        const squares = document.querySelector('.squares');
        var a = moment([2015, 9, 8]);
        var b = moment();
        let weekAge = b.diff(a, "week")
        for (var i = 1; i < 4160; i++) {
            let level
            if (weekAge >= i) {
                level = 3
            }
            else {
                level = 1
            }
            squares.insertAdjacentHTML('beforeend', `<div class="square" data-level="${level}"></div>`);
        }
    },
    computed: {
        ...mapState(useUserAccStore, ["user"])
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