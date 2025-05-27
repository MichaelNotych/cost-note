<script setup lang="ts">
definePageMeta({
	middleware: 'auth',
});

const { user, clear } = useUserSession();

const logout = async () => {
	await clear();
	navigateTo('/auth/signin');
};
</script>

<template>
	<div class="cn_dashboard">
		<h1>Welcome to Dashboard, <span v-if="user">{{ user.name }}</span></h1>
		<CustomButton label="Logout" variant="primary" type="button" size="small" @click="logout"/>
	</div>
</template>
<style scoped>
.cn_dashboard {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
}
</style>