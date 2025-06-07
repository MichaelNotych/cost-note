<script setup lang="ts">
</script>
<template>
	<main class="cn-main">
		<CustomHeader />
		<slot />
	</main>
</template>
<style scoped>
.cn-main {
	display: flex;
	flex-direction: column;
	height: 100vh;
}
</style>