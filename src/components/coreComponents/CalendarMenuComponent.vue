<template>
	<div class="text-center">
		<v-menu
			v-model="menu"
			:close-on-content-click="false"
			anchor="end"
		>
			<template v-slot:activator="{ props }">
				<v-btn
					variant="contained-text"
					icon
					class="mr-2"
					v-bind="props"
					color="primary"
				>
					<v-icon>mdi-calendar</v-icon>
				</v-btn>
			</template>

			<v-card
				max-width="500"
				rounded="xl"
			>
				<v-toolbar>
					<v-spacer></v-spacer>
					<v-btn
						variant="plain"
						icon
						@click="subtractMonth"
					>
						<v-icon> mdi-chevron-left </v-icon>
					</v-btn>
					<span class="mx-2">{{ getMonth }} {{ getYear }}</span>
					<v-btn
						variant="plain"
						icon
						@click="addMonth"
					>
						<v-icon> mdi-chevron-right </v-icon>
					</v-btn>
					<v-spacer></v-spacer>
				</v-toolbar>
				<v-card-text>
					<v-btn
						disabled
						rounded="0"
						variant="text"
						v-for="(weekday, i) in weekdays"
						:key="i"
					>
						{{ weekday }}
					</v-btn>
					<v-btn
						rounded="0"
						:variant="colorToday(day)"
						v-for="(day, i) in calendarArr"
						:key="i"
						:disabled="day === ''"
						@click="dayClicked(day)"
					>
						{{ day.split('-')[1] }}
					</v-btn>
				</v-card-text>
			</v-card>
		</v-menu>
	</div>
</template>

<script>
import { mapState, mapActions } from 'pinia';
import { useTimeMachineStore } from '@/stores/timeMachine';
import moment from 'moment';
export default {
	data: () => ({
		menu: false,
		weekdays: ['M', 'T', 'W', 'T', 'F', 'S', 'S'],
	}),
	methods: {
		...mapActions(useTimeMachineStore, [
			'subtractMonth',
			'addMonth',
			'setDate',
		]),
		dayClicked(day) {
			this.setDate(
				moment(
					day.split('-')[1] + '/' + this.getMonth + '/' + this.getYear,
					'DD/MMMM/YYYY'
				).format('DD/MM/YYYY')
			);
			this.menu = false;
		},
		colorToday(day) {
			let date = moment(
				day.split('-')[1] + '/' + this.getMonth + '/' + this.getYear,
				'DD/MMMM/YYYY'
			).format('DD/MM/YYYY');
			if (date === this.displayTime) {
				return 'contained-text';
			} else {
				return 'text';
			}
		},
	},
	computed: {
		...mapState(useTimeMachineStore, [
			'displayTime',
			'getWeekday',
			'getMonth',
			'getYear',
		]),
		calendarArr() {
			let daysInMonth = moment(this.displayTime, 'DD/MM/YYYY').daysInMonth();
			let arrDays = [];
			let nonZeroArr = [];

			while (daysInMonth) {
				var current = moment().date(daysInMonth).format('d-D');
				arrDays.push(current);
				daysInMonth--;
			}

			arrDays.forEach((e) => {
				const s = e.split('-');
				if (s[0] === '0') {
					nonZeroArr.push('7-' + s[1]);
				} else {
					nonZeroArr.push(e);
				}
			});

			let firstValue = nonZeroArr.slice(-1)[0].split('-')[0];
			if (firstValue > 1) {
				for (let index = 0; index < firstValue - 1; index++) {
					nonZeroArr.push('');
				}
			}

			return nonZeroArr.reverse();
		},
	},
};
</script>
