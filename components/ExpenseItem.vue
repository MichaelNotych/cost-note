<script setup lang="ts">
import type { IExpense } from '~/types';

defineProps({
  expense: {
    type: Object as PropType<IExpense>,
    required: true,
  },
});
</script>

<template>
  <div v-if="expense.title" class="cn-expense">
    <div class="cn-expense__info">
      <div class="cn-expense__title">{{ expense.title }}</div>
      <div class="cn-expense__category">*category*</div>
    </div>
    <div class="cn-expense__amounts">
      <div class="cn-expense__amount">{{ expense.amount }} {{ expense.currency }}</div>
      <div class="cn-expense__converted">*convertedAmount*</div>
    </div>
  </div>
  <div v-else class="cn-expense">
    <div class="cn-expense__loader"/>
    <div class="cn-expense__info">
      <div class="cn-expense__title">{{ expense.userDescription }}</div>
    </div>
  </div>
</template>

<style scoped>
.cn-expense {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
  background: var(--secondary-background);
  border: 1px solid var(--stroke-color);
  border-radius: 0.5rem;
  padding: 1.25rem;
}

.cn-expense__info {
  display: flex;
  flex-direction: column;
}

.cn-expense__title,
.cn-expense__amount {
  font-size: 1rem;
  font-weight: 600;
}

.cn-expense__category,
.cn-expense__converted {
  font-size: 0.875rem;
  opacity: 0.5;
}

.cn-expense__amounts {
  display: flex;
  flex-direction: column;
  text-align: right;
}

.cn-expense__loader {
  width: 1rem;
  height: 1rem;
  border: 0.2rem solid var(--accent-color);
  border-top: 0.2rem solid var(--secondary-background);
  border-radius: 100%;
  animation: spin 1s linear infinite;
}

.cn-expense__loader + .cn-expense__info {
  margin-right: auto;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}
</style>