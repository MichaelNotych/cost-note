<script setup lang="ts">
import IconArrowRight from './icons/IconArrowRight.vue';
import { DEFAULT_CURRENCY } from '~/constants';
import type { IExpense } from '~/types';

const expenses = ref<IExpense[]>([]);
const expensesToAwait = ref<string[]>([]);
const dailyExpenses = ref<number>(0);

onMounted(async () => {
	await fetchExpenses();
});

watch(expensesToAwait, async () => {
	setTimeout(async () => {
		await fetchExpenses();
	}, 5000);
});

watch(expenses, async () => {
	dailyExpenses.value = expenses.value.reduce((acc, expense) => acc + (expense.defaultCurrency ? expense.defaultCurrency.amount : 0), 0);
});

const form = reactive({
	expense: '',
	isValidExpense: (expense: string) => {
		return {
			isValid: expense.length > 0,
		}
	},
})

const fetchExpenses = async () => {
	const response: IExpense[] = await $fetch('/api/expenses');
	expenses.value = response;
}

const addExpense = async () => {
	const response: IExpense = await $fetch('/api/expense', {
		method: 'POST',
		body: {
			userDescription: form.expense,
		},
	});
	expenses.value.push(response);

	form.expense = '';
	expensesToAwait.value = [...expensesToAwait.value, response._id];
}
</script>
<template>
	<div class="cn-panel">
		<div class="cn-title cn-title_sm">Total today spent</div>
		<div class="cn-panel__money">
			<div class="cn-panel__currency">
				{{ getCurrencySymbolFromCode(DEFAULT_CURRENCY) }}
			</div>
			<div class="cn-panel__amount">
				{{ dailyExpenses }}
			</div>
		</div>
		<ul class="cn-panel__expenses">
			<ExpenseItem v-for="expense in expenses" :key="expense._id" :expense="expense" />
		</ul>
		<form class="cn-panel__form" @submit.prevent="addExpense">
			<input v-model="form.expense" class="cn_panel__input" type="text" placeholder="Enter expense" />
			<CustomButton variant="primary" size="medium" class="cn-panel__button" :icon="IconArrowRight" :disabled="!form.isValidExpense(form.expense)"/>
		</form>
	</div>
</template>
<style scoped>
.cn-panel {
	display: flex;
	flex-direction: column;
	background-color: var(--primary-background);
	border-radius: 0.5rem;
	padding: 2.5rem 0;
	width: 100%;
	height: 100%;
}

.cn-panel__money {
	display: flex;
	align-items: baseline;
	gap: 0.25rem;
	font-weight: 700;
	margin-bottom: 2rem;
}

.cn-panel__currency {
	font-size: 3rem;
}

.cn-panel__amount {
	font-size: 4rem;
}

.cn-panel__expenses {
	display: flex;
	flex-direction: column;
	gap: 0.25rem;
	margin-bottom: auto;
}

.cn-panel__form {
	position: relative;
	width: 100%;
}

.cn_panel__input {
	font: inherit;
    padding: 1rem;
	border: 1px solid var(--stroke-color);
	background-color: var(--secondary-background);
	border-radius: 0.25rem;
	width: 100%;
	outline: none;
	transition: background-color 0.2s ease-in-out, border-color 0.2s ease-in-out;
}

.cn_panel__input:hover,
.cn_panel__input:focus {
	border-color: var(--accent-color);
}

.cn-panel__button {
	position: absolute;
	bottom: 0;
	right: 0;
	height: 100%;
}
</style>