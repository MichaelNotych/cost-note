<template>
	<header class="cn_header">
		<NuxtLink class="cn_header__logo" to="/">Cost <span>Note</span></NuxtLink>
		<div class="cn_header__auth">
			<CustomButton label="Sign In" variant="outline" type="button" size="small" @click="() => { navigateTo('/auth/signin') }"/>
			<CustomButton label="Sign Up" variant="primary" type="button" size="small" @click="() => { navigateTo('/auth/signup') }"/>
		</div>
	</header>
</template>
<style scoped>
.cn_header {
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 1rem;
	border: 1px solid var(--stroke-color);
	border-radius: 0.5rem;
	font-size: 1rem;
	max-width: 50rem;
	margin: 1rem auto;
}

.cn_header__logo {
	font-size: 1rem;
	font-weight: 600;
}

.cn_header__logo span {
	font-weight: 300;
}

.cn_header__auth {
	display: flex;
	gap: 0.5rem;
}
</style>