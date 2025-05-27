<script setup lang="ts">
import AuthInput from '~/components/AuthInput.vue';
import IconGoogleLogo from '~/components/icons/IconGoogleLogo.vue';

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
const handleSubmit = () => {
	console.log('submit');
};
const handleGoogleSignUp = () => {
	console.log('google');
}
</script>
<template>
	<section class="cn_layout">
		<div class="cn_col">
			<AuthBanner />
		</div>
		<div class="cn_col cn_col_form">
			<div class="cn_title">Sign Up</div>
			<form class="cn_form" @submit.prevent="handleSubmit">
				<AuthInput v-model="form.name" label="Name" :is-valid="form.isValidName" @update:value="form.name = $event" />	
				<AuthInput v-model="form.email" label="Email" :is-valid="form.isValidEmail" @update:value="form.email = $event" />	
				<AuthInput v-model="form.password" label="Password" :is-valid="form.isValidPassword" @update:value="form.password = $event" />
				<AuthInput v-model="form.repeatPassword" label="Repeat Password" :is-valid="form.isValidRepeatPassword" @update:value="form.repeatPassword = $event" />
				<CustomButton label="Sign Up" :disabled="!form.isFormValid" />
				<hr class="cn_divider">
				<CustomButton label="Google" :icon="IconGoogleLogo" type="button" variant="secondary" @click="handleGoogleSignUp" />
			</form>
			<div class="cn_hint">
				<span>Already have an account?</span>
				<NuxtLink to="/auth/signin">Sign In</NuxtLink>
			</div>
		</div>
	</section>
</template>
<style scoped>
</style>