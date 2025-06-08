<script setup lang="ts">
import CustomInput from '~/components/CustomInput.vue';
import IconGoogleLogo from '~/components/icons/IconGoogleLogo.vue';
const { fetch: fetchUserSession } = useUserSession();

useHead({
	title: 'Sign In',
});
definePageMeta({ layout: 'auth' });

const form = reactive({
	email: '',
	isValidEmail: (email: string) => {
		return {
			isValid: email.length > 0,
			error: 'Email is required',
		}
	},
	password: '',
	isValidPassword: (password: string) => {
		return {
			isValid: password.length > 0,
			error: 'Password is required',
		}
	},
	isLoading: false,
	isFormValid: computed((): boolean => {
		return form.isValidEmail(form.email).isValid && form.isValidPassword(form.password).isValid;
	}),
});

const handleSubmit = async () => {
	if (!form.isFormValid) {
		alert('Please fill in all fields');
		return;
	}

	try {
		form.isLoading = true;
		await $fetch('/api/signin', {
			method: 'POST',
			body: { email: form.email, password: form.password },
		});

		await fetchUserSession();

		navigateTo('/dashboard');

		// toast.add({
		// 	title: 'Success',
		// 	description: 'You have been signed up',
		// 	color: 'success',
		// });
	} catch (error) {
		console.log(error);

		// toast.add({
		// 	title: 'Error',
		// 	description: error instanceof Error ? error.message : 'An error occurred during sign up',
		// 	color: 'error',
		// });
	} finally {
		form.isLoading = false;
	}
};
const handleGoogleSignIn = () => {
	console.log('google');
}
</script>
<template>
	<div class="cn_auth">
		<div class="cn_title">Sign In</div>
		<form class="cn_form" @submit.prevent="handleSubmit">
			<CustomInput id="email" v-model="form.email" label="Email" :is-valid="form.isValidEmail" />	
			<CustomInput id="password" v-model="form.password" label="Password" :is-valid="form.isValidPassword" />
			<CustomButton label="Sign In" :disabled="!form.isFormValid" />
			<hr class="cn_divider">
			<CustomButton label="Google" :icon="IconGoogleLogo" type="button" variant="secondary" @click="handleGoogleSignIn" />
		</form>
		<div class="cn_hint">
			<span>Don't have an account?</span>
			<NuxtLink to="/auth/signup">Sign Up</NuxtLink>
		</div>
	</div>
</template>

<style>
.cn_auth {
	width: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	gap: 2.5rem;
}
.cn_title {
	font-size: 2.5rem;
	font-weight: 700;
}

.cn_form {
	display: flex;
	flex-direction: column;
	gap: 1.25rem;
	width: 100%;
}

.cn_divider {
	width: 100%;
    height: 1px;
    background-color: var(--stroke-color);
    margin: 2rem 0;
    opacity: 0.5;
}

.cn_hint {
	display: flex;
	gap: 0.5rem;
}
</style>