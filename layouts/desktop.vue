<template lang="pug">
v-container
    v-card.mx-auto.mt-8.pb-5(max-width='1400' rounded='xl' elevation='4' min-height='600')
        v-toolbar.rounded-t-xl(flat)
            v-toolbar-items
                slot(name="toolbar-slot")
        v-card-text
            
</template>
