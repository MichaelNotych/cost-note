import { defineStore } from "pinia";
import { toast } from "vue-sonner";

export const useExpensesStore = defineStore("expenses", {
    state: () => ({
        expenses: [] as Expense[],
    }),
    getters: {
        getExpensesByDate(state) {
            const expensesByDate: Record<string, { defaultCurrencyTotal: number; expenses: Expense[] }> = {};
            state.expenses.forEach((expense: Expense) => {
                if (!expense.createdAt) return;
                const createdAt = new Date(expense.createdAt);
                const key =
                    createdAt.getTime().toString().slice(0, 6) + "0000000";
                if (!expensesByDate[key]) expensesByDate[key] = {
                    defaultCurrencyTotal: 0,
                    expenses: [],
                };
                expensesByDate[key].expenses.push(expense);
                expensesByDate[key].defaultCurrencyTotal += expense.defaultCurrency?.amount || 0;
            });
            return Object.entries(expensesByDate).sort((a, b) => {
                return parseInt(b[0]) - parseInt(a[0]);
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
                    this.expenses.unshift(response.data.expense);
                } else {
                    throw new Error(response.message);
                }
            } catch (error: any) {
                toast("Error during expense adding", {
                    description: error.message,
                });
            }
        },
        async updateCategory(id: string, data: { name: string; icon?: string }) {
            try {
                await $fetch(`/api/categories/${id}`, {
                    method: "PUT",
                    body: data,
                });
                await this.fetchExpenses();
            } catch (error: any) {
                toast("Error updating category", {
                    description: error.message,
                });
            }
        },
        calculateTotalDailyExpenses(expenses: Expense[]) {
            return expenses.reduce((total, expense) => {
                return total + (expense.amount || 0);
            }, 0);
        },
    },
});
