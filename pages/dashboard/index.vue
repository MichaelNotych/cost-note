<script setup lang="ts">
definePageMeta({
	middleware: 'auth',
	layout: 'dashboard',
});

const { user } = useUserSession();
</script>

<template>
	<div class="cn-container">
		<h1>Welcome to Dashboard, <span v-if="user">{{ user.name }}</span></h1>
	</div>
</template>
<style scoped>

</style>