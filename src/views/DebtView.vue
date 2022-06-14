<template>
    <v-container>
        <v-card max-width="1400" class="mx-auto mt-8 pb-5" rounded="xl" elevation="4" min-height="600">
            <v-toolbar flat class="rounded-t-xl">
                <v-toolbar-items>
                    <v-spacer></v-spacer>
                    <v-btn color="primary">
                        <v-icon>mdi-plus</v-icon>
                    </v-btn>
                </v-toolbar-items>
            </v-toolbar>

            <v-card-text>
                <v-list density="compact">
                    <v-list-item rounded="xl" v-for="(item, i) in items" :key="i" :value="item" active-color="primary">
                        <v-text-field label="Name" class="mt-9 mr-2" density="compact" variant="outlined">
                        </v-text-field>
                        <v-text-field label="Value" suffix="€" class="mt-9  mr-2" density="compact" variant="outlined">
                        </v-text-field>
                        <v-text-field label="Date" class="mt-9 mr-2" density="compact" variant="outlined">
                        </v-text-field>
                        <v-btn class="mr-2 mb-1" rounded="pill">
                            <v-icon>mdi-plus</v-icon>
                        </v-btn>
                        <v-btn class="mr-2 mb-1" rounded="pill">
                            <v-icon>mdi-minus</v-icon>
                        </v-btn>
                        <v-text-field label="Add/Subtract Value" suffix="€" class="mt-9" density="compact"
                            variant="outlined">
                        </v-text-field>
                          <v-btn class="mr-2 mb-1" rounded="pill">
                            <v-icon>mdi-cross</v-icon>
                        </v-btn>
                    </v-list-item>
                    <v-list-item>
                        <v-btn icon color="primary" class="mx-auto">
                            <v-icon>
                                mdi-plus
                            </v-icon>
                        </v-btn>
                    </v-list-item>
                </v-list>
            </v-card-text>
        </v-card>
    </v-container>
</template>

<script>
export default {
    name: "DebtView",
    data: () => ({
        items: [
            { text: 'Real-Time', icon: 'mdi-clock' },
            { text: 'Audience', icon: 'mdi-account' },
            { text: 'Conversions', icon: 'mdi-flag' },
        ],
    }),
}
</script>