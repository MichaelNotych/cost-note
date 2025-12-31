<script setup lang="ts">
import { toast } from "vue-sonner";

const expensesStore = useExpensesStore();
const addingExpense = ref(false);
const cost = ref("");

const addExpense = async () => {
    try {
        addingExpense.value = true;
        await expensesStore.addExpense(cost.value);
        cost.value = "";
    } catch (error: any) {
        toast("Error during expense adding", {
            description: error.message,
        });
    } finally {
        addingExpense.value = false;
    }
};
</script>

<template>
    <form
        @submit.prevent="addExpense"
        class="mt-auto w-full p-4 flex gap-2 fixed bottom-0 left-0 bg-background border-t"
    >
        <Input
            placeholder="Enter cost..."
            :model-value="cost"
            @update:model-value="(value) => (cost = value.toString())"
        />
        <Button
            type="submit"
            :disabled="!cost.length || addingExpense"
            :loading="addingExpense"
            >Add</Button
        >
    </form>
</template>
