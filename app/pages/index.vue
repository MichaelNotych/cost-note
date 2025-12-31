<script setup lang="ts">
import { getCurrencySymbolFromCode } from "~/lib/utils";
import { Expense } from "~/components/ui/expense";
import { toast } from "vue-sonner";

definePageMeta({
    middleware: "auth",
});

const expensesStore = useExpensesStore();
const addingExpense = ref(false);
const cost = ref("");

onMounted(async () => {
    await expensesStore.fetchExpenses();
});

const addExpense = async () => {
    try {
        addingExpense.value = true;
        await expensesStore.addExpense(cost.value);
        cost.value = "";
    } catch (error: any) {
        toast('Error during expense adding', {
        description: error.message,
      })
    } finally {
        addingExpense.value = false;
    }
};
</script>
<template>
    <div class="space-y-4 pb-25">
        <div
            v-for="[date, expenses] of expensesStore.getExpensesByDate"
            :key="date"
        >
            <div class="text-sm flex justify-between border-b py-2">
                <div>{{ date }}</div>
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
            <Expense
                v-for="expense in expenses"
                :key="expense._id"
                :expense="expense"
            />
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
        <Button type="submit" :disabled="!cost.length || addingExpense" :loading="addingExpense">Add</Button>
    </form>
</template>
