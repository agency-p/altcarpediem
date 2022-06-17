<template>
	<v-container>
		<v-card
			rounded="xl"
			max-width="1000"
			class="mx-auto mt-8"
		>
			<v-toolbar class="rounded-t-xl"></v-toolbar>
			<SvgMapComponent class="mx-auto"></SvgMapComponent>
		</v-card>
	</v-container>
</template>

<script>
import SvgMapComponent from '@/components/globetrottingComponents/SvgMapComponent.vue';
export default {
	name: 'GlobetrottingView',
	components: {
		SvgMapComponent,
	},
};
</script>

<style></style>
