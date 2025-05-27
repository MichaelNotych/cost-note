<script setup lang="ts">
import AuthInput from '~/components/AuthInput.vue';
import IconGoogleLogo from '~/components/icons/IconGoogleLogo.vue';

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

const handleSubmit = () => {
	console.log('submit');
};
const handleGoogleSignIn = () => {
	console.log('google');
}
</script>
<template>
	<div class="cn_auth">
		<div class="cn_title">Sign In</div>
		<form class="cn_form" @submit.prevent="handleSubmit">
			<AuthInput v-model="form.email" label="Email" :is-valid="form.isValidEmail" @update:value="form.email = $event" />	
			<AuthInput v-model="form.password" label="Password" :is-valid="form.isValidPassword" @update:value="form.password = $event" />
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