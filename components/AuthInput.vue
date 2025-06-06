<script setup lang="ts">
const props = defineProps({
	label: {
		type: String,
		required: true,
	},
	isValid: {
		type: Function,
		required: true,
	},
});

const emit = defineEmits(['update:value']);

const input = reactive({
	value: '',
	isTouched: false,
	isInputEmpty: computed((): boolean => input.value === ''),
	validation: computed((): { isValid: boolean, error: string } => props.isValid(input.value)),
});

watch(() => input.value, (newVal) => {
	emit('update:value', newVal);
});
</script>
<template>
	<div class="cn_input">
		<input v-model="input.value" class="cn_input__input" :class="{ 'cn_input__input--empty': input.isInputEmpty }" @blur="input.isTouched = true">
		<label class="cn_input__label">{{ label }}</label>
		<span v-if="!input.validation.isValid && input.validation.error && input.isTouched" class="cn_input__warning">{{ input.validation.error }}</span>
	</div>
</template>
<style scoped>
.cn_input {
	display: flex;
	flex-direction: column;
    gap: 0.125rem;
    position: relative;
	width: 100%;
}
.cn_input__label {
	font-family: inherit;
    position: absolute;
    top: 1rem;
    left: 1rem;
    line-height: 1.5;
	border-radius: 0.25rem;
	pointer-events: none;
	transition: all 0.2s ease-in-out;
}
.cn_input__input {
	font: inherit;
    padding: 1rem;
	border: 1px solid var(--stroke-color);
	border-radius: 0.25rem;
	background-color: var(--secondary-background);
	transition: background-color 0.2s ease-in-out, border-color 0.2s ease-in-out;
}

.cn_input__input:hover {
	border-color: var(--accent-color);
}

.cn_input__input:focus + .cn_input__label,
.cn_input__input:not(.cn_input__input--empty) + .cn_input__label {
	top: -13px;
	font-size: 14px;
	padding: 2px 5px;
	background-color: var(--primary-background);
}

.cn_input__input:focus,
.cn_input__input:not(.cn_input__input--empty) {
	background-color: var(--primary-background);
	border-color: var(--accent-color);
}

.cn_input__warning {
	font-size: 14px;
	color: red;
}
</style>