<script setup lang="ts">
const props = defineProps({
	id: {
		type: String,
		required: true,
	},
	label: {
		type: String,
		required: false,
		default: 'Defult label',
	},
	isValid: {
		type: Function,
		required: true,
	},
});
const inputValue = defineModel<string>();

const input = reactive({
	isTouched: false,
	isInputEmpty: computed((): boolean => inputValue.value === ''),
	validation: computed((): { isValid: boolean, error: string } => props.isValid(inputValue.value)),
});
</script>

<template>
	<div class="input">
		<input
			:id="id"
			:value="inputValue"
			class="input__input"
			:class="{ 'input__input--empty': input.isInputEmpty }"
			@input="inputValue = ($event.target as HTMLInputElement).value"
			@blur="input.isTouched = true"
		>
		<label class="input__label" :for="id">{{ label }}</label>
		<small v-if="!input.validation.isValid && input.validation.error && input.isTouched" class="input__warning">{{ input.validation.error }}</small>
	</div>
</template>
<style scoped>
.input {
	display: flex;
	flex-direction: column;
    gap: 0.125rem;
    position: relative;
	width: 100%;
}
.input__label {
	font-family: inherit;
    position: absolute;
    top: 1rem;
    left: 1rem;
    line-height: 1.5;
	border-radius: 0.25rem;
	pointer-events: none;
	transition: all 0.2s ease-in-out;
}
.input__input {
	font: inherit;
    padding: 1rem;
	border: 1px solid var(--stroke-color);
	border-radius: 0.25rem;
	background-color: var(--secondary-background);
	transition: background-color 0.2s ease-in-out, border-color 0.2s ease-in-out;
}

.input__input:hover {
	border-color: var(--accent-color);
}

.input__input:focus + .input__label,
.input__input:not(.input__input--empty) + .input__label {
	top: -13px;
	font-size: 14px;
	padding: 2px 5px;
	background-color: var(--primary-background);
}

.input__input:focus,
.input__input:not(.input__input--empty) {
	background-color: var(--primary-background);
	border-color: var(--accent-color);
}

.input__warning {
	font-size: 14px;
	color: red;
}
</style>