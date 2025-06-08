<script setup lang="ts">
useHead({
	title: 'Profile',
});
definePageMeta({
	layout: 'dashboard',
	middleware: 'auth',
});

const { user, fetch: fetchUserSession } = useUserSession();

const infoForm = reactive({
	name: user.value?.name ?? '',
	email: user.value?.email ?? '',
	isValidName: (name: string) => {
		return name.length > 0;
	},
	isValidEmail: (email: string) => {
		return email.length > 0;
	},
	isFormValid: () => {
		return infoForm.isValidName(infoForm.name) && infoForm.isValidEmail(infoForm.email);
	},
});

const handleSave = async () => {
	try {
		await $fetch('/api/profile', {
			method: 'PUT',
			body: infoForm,
		});

		await fetchUserSession();
	} catch (error) {
		console.error(error);
	}
};
</script>

<template>
	<div class="cn-container">
		<div class="cn-profile">
			<div class="cn-title">Profile</div>
			<form class="cn-profile__form" @submit.prevent="handleSave">
				<CustomInput id="name" v-model="infoForm.name" label="Name" :is-valid="infoForm.isValidName" />
				<CustomInput id="email" v-model="infoForm.email" label="Email" :is-valid="infoForm.isValidEmail" />
				<CustomButton label="Save" :disabled="!infoForm.isFormValid" />
			</form>
		</div>
	</div>
</template>

<style scoped>
.cn-profile {
	display: flex;
	flex-direction: column;
	gap: 2rem;
}

.cn-profile__form {
	display: flex;
	flex-direction: column;
	gap: 2rem;
}
</style>