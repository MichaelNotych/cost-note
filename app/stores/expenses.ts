import { defineStore } from 'pinia'

export const useExpensesStore = defineStore('expenses', {
    state: () => ({
        expenses: [] as Expense[],
    }),
    getters: {
        getExpensesByDate(state) {
            const expensesByDate: Record<string, Expense[]> = {};
            state.expenses.forEach((expense: Expense) => {
                if (!expense.createdAt) return;
                const createdAt = new Date(expense.createdAt);
                const key = `${createdAt.getDate()}/${createdAt.getMonth() + 1}/${createdAt.getFullYear()}`
                if (!expensesByDate[key]) expensesByDate[key] = [];
                expensesByDate[key] = [...expensesByDate[key], expense]
            });
            return expensesByDate;
        },
    },
    actions: {
        async fetchExpenses() {
            const response = await $fetch<Expense[]>('/api/expenses');
            this.expenses = response;
        },

        async addExpense(text: string) {
            const response = await $fetch<Expense>("/api/expenses", {
                method: "POST",
                body: {
                    text,
                },
            });
            this.expenses.push(response);
        },
    },
})