<script setup lang="ts">
import { getCurrencySymbolFromCode } from "~/lib/utils";
import { toast } from "vue-sonner";

definePageMeta({
    middleware: "auth",
});

const expensesStore = useExpensesStore();
const loadingExpenses = ref(true);

onMounted(async () => {
    await expensesStore.fetchExpenses();
    loadingExpenses.value = false;
});

const editingCategory = ref<Category | null>(null);
const isEditCategoryOpen = ref(false);

const openEditCategory = (category: Category) => {
    if (!category) return;
    editingCategory.value = category;
    isEditCategoryOpen.value = true;
};

const handleSaveCategory = async (data: { name: string; icon: string }) => {
    if (!editingCategory.value) return;
    await expensesStore.updateCategory(editingCategory.value._id, data);
    toast.success("Category updated");
};
</script>
<template>
    <div v-if="loadingExpenses" class="flex justify-center items-center flex-col gap-4 h-screen opacity-50">
        <Spinner class="size-8"/>
        Loading expenses...
    </div>
    <div v-else class="space-y-4 pb-25">
        <div
            v-for="[
                date,
                { expenses, defaultCurrencyTotal },
            ] of expensesStore.getExpensesByDate"
            :key="date"
        >
            <div class="text-sm flex justify-between border-b py-2">
                <div>{{ new Date(parseInt(date)).toLocaleDateString() }}</div>
                <div v-if="expenses.length > 0">
                    {{
                        getCurrencySymbolFromCode(
                            expenses[0]?.defaultCurrency?.currency
                        )
                    }}{{ defaultCurrencyTotal.toFixed(2) }}
                </div>
            </div>
            <Expense
                v-for="expense in expenses"
                :key="expense._id"
                :expense="expense"
                @edit-category="openEditCategory"
            />
        </div>
    </div>
    <AddExpenseForm />
    <CategoryEditDialog
        :open="isEditCategoryOpen"
        @update:open="isEditCategoryOpen = $event"
        :category="editingCategory"
        @save="handleSaveCategory"
        v-if="editingCategory"
    />
</template>
