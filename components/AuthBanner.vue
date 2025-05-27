<template>
	<div class="cn_banner">
		<div class="cn_banner__logo">Cost<span>Note</span></div>
		<p>
			A minimalistic expense tracker with built-in AI features for analysing your&nbsp;payments
		</p>
		<img class="cn_banner__image" src="~/assets/images/banner.png" alt="CostNote">
	</div>
</template>
<style scoped>
.cn_banner {
	height: 100%;
	border-radius: 1rem;
	border: 1px solid var(--stroke-color);
	padding: 2.5rem 2.5rem 0;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
}

.cn_banner__logo {
	font-size: 4.5rem;
	font-weight: 700;
	margin-bottom: 1.25rem;
}

.cn_banner__logo span {
	font-weight: 400;
}

.cn_banner__image {
	max-width: 475px;
	width: 100%;
	height: auto;
	object-fit: contain;
	margin-top: auto;
}
</style>