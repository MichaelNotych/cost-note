<script setup lang="ts">
import IconGoogleLogo from '~/components/icons/IconGoogleLogo.vue';

useHead({
	title: 'Sign Up',
});
definePageMeta({ layout: 'auth' });

const { fetch: fetchUserSession } = useUserSession();
const router = useRouter();

const form = reactive({
	name: '',
	isValidName: (name: string) => {
		return {
			isValid: name.length > 0,
			error: 'Name is required',
		}
	},
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
	repeatPassword: '',
	isValidRepeatPassword: (repeatPassword: string) => {
		return {
			isValid: repeatPassword === form.password,
			error: 'Passwords do not match',
		}
	},
	isLoading: false,
	isFormValid: computed((): boolean => {
		return form.isValidName(form.name).isValid && form.isValidEmail(form.email).isValid && form.isValidPassword(form.password).isValid && form.isValidRepeatPassword(form.repeatPassword).isValid;
	}),
});
const handleSubmit = async () => {
	if (!form.isFormValid) {
		alert('Please fill in all fields');
		return;
	}

	try {
		form.isLoading = true;
		await $fetch('/api/signup', {
			method: 'POST',
			body: { name: form.name, email: form.email, password: form.password },
		});

		await fetchUserSession();

		await router.push('/dashboard');

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
const handleGoogleSignUp = () => {
	console.log('google');
}
</script>
<template>
	<div class="cn_auth">
		<div class="cn_title">Sign Up</div>
		<form class="cn_form" @submit.prevent="handleSubmit">
			<CustomInput id="name" v-model="form.name" label="Name" :is-valid="form.isValidName" />	
			<CustomInput id="email" v-model="form.email" label="Email" :is-valid="form.isValidEmail" />	
			<CustomInput id="password" v-model="form.password" label="Password" :is-valid="form.isValidPassword" />
			<CustomInput id="repeat-password" v-model="form.repeatPassword" label="Repeat Password" :is-valid="form.isValidRepeatPassword" />
			<CustomButton label="Sign Up" :disabled="!form.isFormValid" :is-loading="form.isLoading" />
			<hr class="cn_divider">
			<CustomButton label="Google" :icon="IconGoogleLogo" type="button" variant="secondary" @click="handleGoogleSignUp" />
		</form>
		<div class="cn_hint">
			<span>Already have an account?</span>
			<NuxtLink to="/auth/signin">Sign In</NuxtLink>
		</div>
	</div>
</template>
<style scoped>
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
	width: 100%;
	gap: 1.25rem;
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