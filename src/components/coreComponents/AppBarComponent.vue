<template>
	<v-app-bar :collapse="$route.name === 'Auth' ? true : false">
		<v-toolbar-items>
			<v-btn
				v-if="$route.name === 'Auth'"
				@click="switchAuthMode"
				rounded="xl"
			>
				{{ authMode ? 'Sign Up' : 'SignIn' }}
			</v-btn>
			<TimeMachine v-if="$route.name !== 'Auth'"></TimeMachine>
		</v-toolbar-items>
	</v-app-bar>
</template>

<script>
import TimeMachine from './TimeMachineComponent.vue';
import { mapState, mapActions } from 'pinia';
import { useAuthModeStore } from '@/stores/authMode';
export default {
	components: {
		TimeMachine,
	},
	methods: {
		...mapActions(useAuthModeStore, ['switchAuthMode']),
	},
	computed: {
		...mapState(useAuthModeStore, ['authMode']),
	},
};
</script>

<style></style>
