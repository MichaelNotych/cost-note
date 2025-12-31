<script setup lang="ts">
import { getCurrencySymbolFromCode } from "~/lib/utils";

defineProps<{
    expense: Expense;
}>();

defineEmits<{
    (e: "edit-category", category: any): void;
}>();
</script>

<template>
    <div class="py-2 border-b border-border/50 last:border-0">
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
                @click.stop="$emit('edit-category', expense.category)"
                class="cursor-pointer hover:text-foreground transition-colors"
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
</template>
