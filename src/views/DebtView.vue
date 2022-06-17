<template>
	<v-container>
		<v-card
			max-width="1400"
			class="mx-auto mt-8 pb-5"
			rounded="xl"
			elevation="4"
			min-height="600"
		>
			<v-toolbar
				flat
				class="rounded-t-xl"
			>
				<v-toolbar-items>
					<v-icon v-if="saved"> mdi-cloud-check </v-icon>
					<v-progress-circular
						v-else
						indeterminate
						size="24"
					></v-progress-circular>
					<v-spacer></v-spacer>

					<v-btn
						color="primary"
						@click="addItem"
					>
						<v-icon>mdi-plus</v-icon>
					</v-btn>
				</v-toolbar-items>
			</v-toolbar>

			<v-card-text>
				<v-list density="compact">
					<v-list-item
						v-for="(item, i) in filterItems"
						:key="i"
						active
						:color="item.deleted ? 'red' : 'primary'"
						rounded="xl"
						:value="item"
					>
						<v-text-field
							v-model="item.name"
							label="Name"
							class="mt-9 mr-2"
							density="compact"
							variant="outlined"
						>
						</v-text-field>
						<v-text-field
							v-model="item.value"
							label="Value"
							suffix="€"
							class="mt-9 mr-2"
							density="compact"
							variant="outlined"
						>
						</v-text-field>
						<v-text-field
							v-model="item.date"
							label="Date"
							class="mt-9 mr-2"
							density="compact"
							variant="outlined"
						>
						</v-text-field>
						<v-btn
							class="ml-2 mb-1"
							rounded="pill"
							@click="deleteItem(i)"
						>
							<v-icon>mdi-delete-outline</v-icon>
						</v-btn>
					</v-list-item>
					<v-list-item class="mt-2">
						<v-btn
							icon
							color="primary"
							class="mx-auto"
							@click="addItem"
						>
							<v-icon> mdi-plus </v-icon>
						</v-btn>
					</v-list-item>
				</v-list>
			</v-card-text>
		</v-card>
	</v-container>
</template>

<script>
import { debounce } from 'debounce';
import moment from 'moment';
import { mapState } from 'pinia';
import { useUserAccStore } from '@/stores/userAcc';
import { useTimeMachineStore } from '@/stores/timeMachine';
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
export default {
	name: 'DebtView',
	data: () => ({
		items: [],
		saved: true,
	}),

	computed: {
		...mapState(useUserAccStore, ['user']),
		...mapState(useTimeMachineStore, ['displayTime']),
		filterItems() {
			let arr = this.items.filter((i) => {
				if (
					moment(i.created, 'DD/MM/YYYY').isSameOrBefore(moment(this.displayTime, 'DD/MM/YYYY'))
				) {
					if (i.deleted === false) {
						return i;
					} else if (
						moment(i.deleted, 'DD/MM/YYYY').isAfter(moment(this.displayTime, 'DD/MM/YYYY'))
					) {
						return i;
					} else {
						return;
					}
				}
			});
			return arr;
		},
	},
	watch: {
		//prettier-ignore
		'items': {
			handler() {
					this.debounceUpdate()
			},
			deep: true,
		},
		//prettier-ignore
		'displayTime'(){
			this.filterItems
		},
	},
	mounted() {
		this.getItems();
	},
	methods: {
		debounceUpdate: debounce(function () {
			this.syncItems();
		}, 500),
		async syncItems() {
			this.saved = false;
			await updateDoc(doc(this.$db, 'debt', this.user.uid), {
				items: this.items,
			});
			setTimeout(() => {
				this.saved = true;
			}, 350);
		},
		async getItems() {
			const itemDoc = await getDoc(doc(this.$db, 'debt', this.user.uid));

			if (itemDoc.exists()) {
				this.items = itemDoc.data().items;
			} else {
				let dataStructure = {
					created: moment().format('DD/MM/YYYY'),
					deleted: false,
					name: '',
					value: 0,
					date: '',
				};
				await setDoc(doc(this.$db, 'debt', this.user.uid), {
					items: [dataStructure],
				});
				this.items.push(dataStructure);
			}
		},
		addItem() {
			this.items.push({
				created: this.displayTime,
				deleted: false,
				name: '',
				value: 0,
				date: '',
			});
		},
		deleteItem(i) {
			if (this.items[i].amount === 0) {
				this.items.slice(i, 1);
			} else {
				this.items[i].deleted = moment().format('DD/MM/YYYY');
			}
		},
	},
};
</script>
