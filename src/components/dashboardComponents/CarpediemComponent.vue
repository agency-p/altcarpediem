<template>
	<v-container>
		<v-card
			class="mx-auto mt-8"
			rounded="xl"
			elevation="4"
		>
			<v-toolbar
				flat
				class="rounded-t-xl"
			>
				<v-toolbar-title>Carpediem</v-toolbar-title>
				<v-toolbar-items>
					<v-text-field
						transition="scroll-y-transition"
						variant="outlined"
						density="compact"
						label="Birthdate"
						type="text"
						class="mt-9 mr-2"
						v-model="user.birthdate"
					></v-text-field>
					<v-select
						transition="scroll-y-transition"
						:items="countrys"
						variant="outlined"
						density="compact"
						label="Country"
						type="text"
						class="mt-9 mr-2"
						v-model="user.country"
					>
					</v-select>
					<v-select
						transition="scroll-y-transition"
						:items="['Months', 'Weeks', 'Days']"
						variant="outlined"
						density="compact"
						label="Mode"
						type="text"
						class="mt-9"
						v-model="mode"
					></v-select>
				</v-toolbar-items>
			</v-toolbar>

			<v-card-text class="pa-8">
				<v-row
					id="squares"
					class="squares"
				></v-row>
				<!-- added via javascript -->
			</v-card-text>
		</v-card>
	</v-container>
</template>

<script>
import moment from 'moment';
import { mapState } from 'pinia';
import { useUserAccStore } from '@/stores/userAcc';
import { useTimeMachineStore } from '@/stores/timeMachine';
import lifeExpectancy from '@/assets/json/lifeExpectancy.json';
export default {
	name: 'CarpediemComponent',
	data: () => ({
		lifeExpectancy: lifeExpectancy,
		countrys: Object.keys(lifeExpectancy),
		mode: 'Weeks',
	}),
	mounted() {
		this.renderCarpediem;
	},
	computed: {
		...mapState(useUserAccStore, ['user']),
		...mapState(useTimeMachineStore, ['displayTime']),
	},
	watch: {
		mode() {
			this.renderCarpediem;
		},
		'user.country'() {
			this.renderCarpediem;
		},
		'user.birthdate'() {
			this.renderCarpediem;
		},
		displayTime() {
			this.renderCarpediem;
		},
	},
	methods: {
		renderCarpediem() {
			const squares = document.querySelector('.squares');
			let children = [].slice.call(
				document.getElementById('squares').getElementsByTagName('div'),
				0
			);
			for (let i = 0; i < children.length; i++) {
				children[i].parentNode.removeChild(children[i]);
			}

			let itemCounter;
			let start = moment(this.user.birthdate, 'DD/MM/YYYY');
			let current = moment(this.displayTime, 'DD/MM/YYYY');
			let timeCounter = current.diff(start, this.mode.toLowerCase());

			if (this.mode === 'Months') {
				itemCounter = this.lifeExpectancy[this.user.country] * 12;
			} else if (this.mode === 'Weeks') {
				itemCounter = this.lifeExpectancy[this.user.country] * 52;
			} else if (this.mode === 'Days') {
				itemCounter = this.lifeExpectancy[this.user.country] * 365;
			}

			for (let i = 1; i < itemCounter; i++) {
				let level;
				if (timeCounter >= i) {
					level = 3;
				} else {
					level = 1;
				}
				squares.insertAdjacentHTML(
					'beforeend',
					`<div id="square" class="square" data-level="${level}"></div>`
				);
			}
		},
	},
};
</script>

<style>
.square {
	margin: 2px;
	height: 15px;
	width: 15px;
	border-radius: 10%;
}

.square {
	background-color: #4375c0;
}

.square[data-level='1'] {
	background-color: #ece1fd;
}

.square[data-level='2'] {
	background-color: #7bc96f;
}

.square[data-level='3'] {
	background-color: #6709ee;
}
</style>
