<script setup lang="ts">
const { user } = useUserSession();
</script>

<template>
	<header class="cn-header">
		<NuxtLink to="/" class="cn-logo">
			<img src="~/assets/images/logo.svg" alt="Logo" >
		</NuxtLink>
		<nav v-if="user" class="cn-nav">
			<NuxtLink to="/dashboard" class="cn-link">Dashboard</NuxtLink>
			<NuxtLink to="/logs" class="cn-link">Logs</NuxtLink>
			<NuxtLink to="/settings" class="cn-link">Settings</NuxtLink>
		</nav>
		<div class="cn-auth">
			<NuxtLink v-if="!user" to="/auth/signin" class="cn-link cn-link_secondary">Sign in</NuxtLink>
			<NuxtLink v-if="!user" to="/auth/signup" class="cn-link cn-link_primary">Sign up</NuxtLink>
			<NuxtLink v-else to="/auth/logout" class="cn-link">Logout</NuxtLink>
		</div>
	</header>
</template>
<style scoped>
.cn-header {
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 2.5rem;
}

.cn-nav {
	display: flex;
	align-items: center;
	gap: 2rem;
}

.cn-link {
	font-size: 0.875rem;
	color: var(--text-color);
}

.cn-link.cn-link_active {
	opacity: 0.5;
	pointer-events: none;
}

.cn-link_secondary {
	color: var(--accent-color);
}

.cn-link_primary {
	color: var(--accent-text-color);
	background-color: var(--accent-color);
	padding: 0.5rem 1rem;
	border-radius: 0.25rem;
}

.cn-logo {
	width: 5rem;
}
.cn-auth {
	display: flex;
	align-items: center;
	gap: 2rem;
}
</style>