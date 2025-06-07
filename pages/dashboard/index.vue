<script setup lang="ts">
definePageMeta({
	middleware: 'auth',
	layout: 'dashboard',
});
</script>

<template>
	<div class="cn-container">
		<ExpenseEntryPanel />
	</div>
</template>
<style scoped>
</style>