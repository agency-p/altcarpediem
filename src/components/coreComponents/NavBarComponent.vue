<template>
	<v-navigation-drawer permanent>
		<v-list density="compact">
			<v-list-subheader>Pages</v-list-subheader>
			<v-list-item
				v-for="(item, i) in items"
				:key="i"
				:value="item"
				active-color="primary"
				:to="item.route"
			>
				<v-list-item-avatar start>
					<v-icon :icon="item.icon"></v-icon>
				</v-list-item-avatar>
				<v-list-item-title v-text="item.text"></v-list-item-title>
			</v-list-item>
		</v-list>

		<template v-slot:append>
			<div class="pa-2">
				<v-btn
					class="mb-2"
					block
					variant="contained-text"
					rounded="xl"
					@click="signOut"
				>
					Send Feedback
				</v-btn>
				<v-btn
					block
					variant="contained-text"
					color="primary"
					rounded="xl"
					@click="signOut"
				>
					Logout
				</v-btn>
			</div>
		</template>
	</v-navigation-drawer>
</template>

<script>
import { signOut } from 'firebase/auth';
export default {
	data: () => ({
		items: [
			{ text: 'Dashboard', icon: 'mdi-view-dashboard', route: '/' },
			{ text: 'Diary', icon: 'mdi-notebook', route: '/diary' },
			/* { text: 'Finace', icon: 'mdi-finance', route: "/finance" },
            { text: 'Habits', icon: 'mdi-repeat', route: "/habits" },
            { text: 'Notes', icon: 'mdi-note', route: "/notes" },
            { text: 'Sport', icon: 'mdi-arm-flex', route: "/sport" },
            { text: 'Essentials', icon: 'mdi-cannabis', route: "/essentials" },
            { text: 'Books', icon: 'mdi-book-open-page-variant-outline', route: "/books" },
            { text: 'Globetrotting', icon: 'mdi-earth', route: "/globetrotting" }, */
			{ text: 'Settings', icon: 'mdi-cog', route: '/settings' },
		],
	}),
	methods: {
		signOut() {
			signOut(this.$auth).catch((error) => {
				const errorCode = error.code;
				const errorMessage = error.message;
				alert(errorCode, errorMessage);
			});
		},
	},
};
</script>

<style></style>
