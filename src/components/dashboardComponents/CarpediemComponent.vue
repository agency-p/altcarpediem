<template>
    <div class="graph">
        <ul class="squares">
            <!-- added via javascript -->
        </ul>
    </div>
</template>

<script lang="ts">
import moment from "moment"
export default {
    name: "CarpediemComponent",
    mounted() {
        const squares = document.querySelector('.squares');
        var a = moment([2002, 9, 18]);
        var b = moment();
        let weekAge = b.diff(a, "weeks")
        for (var i = 1; i < 4000; i++) {
            let level: number
            if (weekAge >= i) {
                level = 3
            }
            else {
                level = 1
            }
            squares!.insertAdjacentHTML('beforeend', `<li data-level="${level}"></li>`);
        }
    }
}
</script>

<style >
:root {
    --square-size: 15px;
    --square-gap: 5px;
    --week-width: calc(var(--square-size) + var(--square-gap));
}

.graph {
    display: inline-grid;
    grid-template-areas: "empty months"
        "days squares";
    grid-template-columns: auto 1fr;
    grid-gap: 10px;
}

.graph {
    padding: 20px;
    border: 1px #e1e4e8 solid;
    margin: 20px;
}

.squares {
    grid-area: squares;
}

.days,
.squares {
    display: grid;
    grid-gap: var(--square-gap);
    grid-template-columns: repeat(80, var(--square-size));
    grid-auto-flow: row;
    grid-auto-columns: var(--square-size);
}

.squares li {
    background-color: #4375c0;
}

.squares li[data-level="1"] {
    background-color: #c6e48b;
}

.squares li[data-level="2"] {
    background-color: #7bc96f;
}

.squares li[data-level="3"] {
    background-color: #196127;
}
</style>