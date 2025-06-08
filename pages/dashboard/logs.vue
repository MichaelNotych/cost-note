<script setup lang="ts">
import type { IExpense } from '~/types';

useHead({
	title: 'Logs',
});
definePageMeta({
	layout: 'dashboard',
	middleware: 'auth',
});

const dailyExpenses = ref<Record<string, IExpense[]>>({});

onMounted(async () => {
	const response: IExpense[] = await $fetch('/api/expenses');
	dailyExpenses.value = response.reduce((acc, expense) => {
		const dateString = new Date(expense.date).toDateString();
		return {
			...acc,
			[dateString]: [...(acc[dateString] || []), expense]
		};
	}, {} as Record<string, IExpense[]>);
});
</script>

<template>
	<div class="cn-container">
		<div class="cn-logs">
			<div class="cn-title">Logs</div>
			<div v-for="(expenses, date) in dailyExpenses" :key="date" class="cn-logs__item">
				<div class="cn-logs__date">{{ date }}</div>
				<div  class="cn-logs__list">
					<ExpenseItem v-for="expense in expenses" :key="expense._id" :expense="expense" />
				</div>
			</div>
		</div>
	</div>
</template>

<style scoped>
.cn-logs {
	display: flex;
	flex-direction: column;
	gap: 2rem;
}

.cn-logs__item {
	display: flex;
	flex-direction: column;
	gap: 0.5rem;
}

.cn-logs__date {
	font-weight: 600;
}

.cn-logs__list {
	display: flex;
	flex-direction: column;
	gap: 0.25rem;
}

</style>