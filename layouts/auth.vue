<template>
	<section class="cn_layout">
		<div class="cn_col">
			<AuthBanner />
		</div>
		<div class="cn_col cn_col_form">
			<slot />
		</div>
	</section>
</template>
<style scoped>
.cn_layout {
	display: flex;
	gap: 1.25rem;
	height: 100vh;
	padding: 2.5rem;
	min-height: 40rem;
}

.cn_col {
	width: 50%;
	height: 100%;
}

.cn_col_form {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	padding: 2.5rem;
	gap: 2.5rem;
}
</style>