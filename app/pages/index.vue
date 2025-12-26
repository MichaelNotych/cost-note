<script setup lang="ts">
import { getCurrencySymbolFromCode } from '~/lib/utils';

definePageMeta({
    middleware: "auth",
});
const expenses = ref<Expense[]>([]);
const expensesByDate = reactive<Record<string, Expense[]>>({});
const cost = ref("");

const onSubmit = () => {};
const fetchExpenses = async () => {
    const response = await $fetch<Expense[]>("/api/expenses?scope=today");
    expenses.value = response;
};

onMounted(async () => {
    await fetchExpenses();
});

watch(expenses, (newExpenses) => {
    newExpenses.forEach((expense: Expense) => {
        if (!expense.createdAt) return;
        const createdAt = new Date(expense.createdAt);
        const key = `${createdAt.getDate()}-${createdAt.getMonth() + 1}-${createdAt.getFullYear()}`
        if (!expensesByDate[key]) expensesByDate[key] = [];
        expensesByDate[key] = [...expensesByDate[key], expense]
    });

    console.log(expensesByDate)
})

watch(expensesByDate, (newExpensesByDate) => {
    console.log(newExpensesByDate)
})

const addExpense = async () => {
    const response = await $fetch<Expense>("/api/expenses", {
        method: "POST",
        body: {
            text: cost.value,
        },
    });
    expenses.value.push(response);

    cost.value = "";
};
</script>
<template>
    <div class="space-y-4">
        <div v-for="(expenses, key) of expensesByDate" class="">
            <div class="text-sm">
                <div>{{key}}</div>
                <div>{{expenses.reduce((acc, expense) => acc + (expense.defaultCurrency?.amount || 0), 0).toFixed(2)}}</div>
            </div>
            <div v-for="expense in expenses" :key="expense._id" class="py-2 border-b border-border/50 last:border-0">
                <div class="flex items-center justify-between">
                    <span class="font-medium">{{ expense.title || 'Untitled' }}</span>
                    <span class="font-semibold">
                        {{ getCurrencySymbolFromCode(expense.currency || 'USD') }}{{ expense.amount?.toFixed(2) }}
                    </span>
                </div>
                <div class="flex items-center justify-between text-xs text-muted-foreground mt-0.5">
                    <span>{{ expense.category?.name || 'Uncategorized' }}</span>
                    <span v-if="expense.defaultCurrency">
                        {{ getCurrencySymbolFromCode(expense.defaultCurrency.currency) }}{{ expense.defaultCurrency.amount.toFixed(2) }}
                    </span>
                </div>
            </div>
        </div>
    </div>
    <div class="mt-auto w-full py-4 flex gap-2">
        <Input
            placeholder="Enter cost..."
            :model-value="cost"
            @update:model-value="(value) => (cost = value.toString())"
        />
        <Button @click="addExpense" :disabled="!cost.length">Add</Button>
    </div>
</template>
