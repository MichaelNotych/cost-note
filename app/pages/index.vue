<script setup lang="ts">
import { getCurrencySymbolFromCode } from "~/lib/utils";

definePageMeta({
    middleware: "auth",
});

const expensesStore = useExpensesStore();
const cost = ref("");

onMounted(async () => {
    await expensesStore.fetchExpenses();
});

const addExpense = async () => {
    await expensesStore.addExpense(cost.value);
    cost.value = "";
};
</script>
<template>
    <div class="space-y-4">
        <div
            v-for="(expenses, key) of expensesStore.getExpensesByDate"
            class=""
        >
            <div class="text-sm flex justify-between border-b py-2">
                <div>{{ key }}</div>
                <div v-if="expenses.length > 0">
                    {{
                        getCurrencySymbolFromCode(
                            expenses[0]?.defaultCurrency?.currency
                        )
                    }}{{
                        expenses
                            .reduce(
                                (acc, expense) =>
                                    acc +
                                    (expense.defaultCurrency?.amount || 0),
                                0
                            )
                            .toFixed(2)
                    }}
                </div>
            </div>
            <div
                v-for="expense in expenses"
                :key="expense._id"
                class="py-2 border-b border-border/50 last:border-0"
            >
                <div class="flex items-center justify-between">
                    <span class="font-medium">{{
                        expense.title || "Untitled"
                    }}</span>
                    <span class="font-semibold">
                        {{ getCurrencySymbolFromCode(expense.currency)
                        }}{{ expense.amount?.toFixed(2) }}
                    </span>
                </div>
                <div
                    class="flex items-center justify-between text-xs text-muted-foreground mt-0.5"
                >
                    <span
                        >{{ expense.category?.icon || "-" }}
                        {{ expense.category?.name || "Uncategorized" }}</span
                    >
                    <span v-if="expense.defaultCurrency">
                        {{
                            getCurrencySymbolFromCode(
                                expense.defaultCurrency.currency
                            )
                        }}{{ expense.defaultCurrency.amount.toFixed(2) }}
                    </span>
                </div>
            </div>
        </div>
    </div>
    <form
        @submit.prevent="addExpense"
        class="mt-auto w-full p-4 flex gap-2 fixed bottom-0 left-0 bg-background border-t"
    >
        <Input
            placeholder="Enter cost..."
            :model-value="cost"
            @update:model-value="(value) => (cost = value.toString())"
        />
        <Button type="submit" :disabled="!cost.length">Add</Button>
    </form>
</template>
