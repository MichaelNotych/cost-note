<script setup lang="ts">
</script>
<template>
	<main class="cn-main">
		<CustomHeader />
		<div class="cn-dashboard">
			<slot />
		</div>
	</main>
</template>
<style scoped>
.cn-dashboard {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
}
</style>