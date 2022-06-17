import moment from 'moment';
import { defineStore } from 'pinia';
import { emitter } from '@/assets/js/emitter.js';

export const useTimeMachineStore = defineStore({
	id: 'timeMachine',
	state: () => ({
		displayTime: moment().format('DD/MM/YYYY'),
	}),
	actions: {
		setDate(date) {
			this.displayTime = date;
			emitter.emit('date-changed', { date: this.displayTime });
		},
		goToday() {
			this.displayTime = moment().format('DD/MM/YYYY');
			emitter.emit('date-changed', { date: this.displayTime });
		},
		subtractDay() {
			this.displayTime = moment(this.displayTime, 'DD/MM/YYYY')
				.subtract(1, 'd')
				.format('DD/MM/YYYY');
			emitter.emit('date-changed', { date: this.displayTime });
		},
		addDay() {
			this.displayTime = moment(this.displayTime, 'DD/MM/YYYY')
				.add(1, 'd')
				.format('DD/MM/YYYY');
			emitter.emit('date-changed', { date: this.displayTime });
		},
		subtractMonth() {
			this.displayTime = moment(this.displayTime, 'DD/MM/YYYY')
				.subtract(1, 'M')
				.format('DD/MM/YYYY');
			emitter.emit('date-changed', { date: this.displayTime });
		},
		addMonth() {
			this.displayTime = moment(this.displayTime, 'DD/MM/YYYY')
				.add(1, 'M')
				.format('DD/MM/YYYY');
			emitter.emit('date-changed', { date: this.displayTime });
		},
	},
	getters: {
		getWeekday() {
			return moment(this.displayTime, 'DD/MM/YYYY').format('dddd');
		},
		getMonth() {
			return moment(this.displayTime, 'DD/MM/YYYY').format('MMMM');
		},
		getYear() {
			return moment(this.displayTime, 'DD/MM/YYYY').format('YYYY');
		},
	},
});
