import { defineStore } from "pinia";
import { toast } from "vue-sonner";

export const useExpensesStore = defineStore("expenses", {
    state: () => ({
        expenses: [] as Expense[],
    }),
    getters: {
        getExpensesByDate(state) {
            const expensesByDate: Record<string, Expense[]> = {};
            state.expenses.forEach((expense: Expense) => {
                if (!expense.createdAt) return;
                const createdAt = new Date(expense.createdAt);
                const key = `${createdAt.getDate()}/${
                    createdAt.getMonth() + 1
                }/${createdAt.getFullYear()}`;
                if (!expensesByDate[key]) expensesByDate[key] = [];
                expensesByDate[key] = [...expensesByDate[key], expense];
            });
            return Object.entries(expensesByDate).sort((a, b) => {
                const [dayA, monthA, yearA] = a[0].split('/').map(Number) as [number, number, number];
                const [dayB, monthB, yearB] = b[0].split('/').map(Number) as [number, number, number];
                const dateA = new Date(yearA, monthA - 1, dayA);
                const dateB = new Date(yearB, monthB - 1, dayB);
                return dateB.getTime() - dateA.getTime();
            });
        },
    },
    actions: {
        async fetchExpenses() {
            const response = await $fetch<Expense[]>("/api/expenses");
            this.expenses = response;
        },

        async addExpense(text: string) {
            try {
                const response = await $fetch<BaseResponse>("/api/expenses", {
                    method: "POST",
                    body: {
                        text,
                    },
                });
                if (response.success) {
                    this.expenses.push(response.data.expense);
                } else {
                    throw new Error(response.message)
                }
            } catch (error: any) {
                toast("Error during expense adding", {
                    description: error.message,
                });
            }
        },
    },
});
