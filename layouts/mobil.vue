<template lang="pug">
v-toolbar.rounded-t-xl(flat)
    v-toolbar-items
        slot(name="toolbar-slot")
        v-btn hallo
v-card-text
    slot
</template>

<script lang='ts'>

</script>

<style lang='sass'>

</style> 