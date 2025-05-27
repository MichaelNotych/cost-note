<script setup lang="ts">
const props = defineProps({
	label: {
		type: String,
		required: true,
	},
	disabled: {
		type: Boolean,
		default: false,
	},
	variant: {
		type: String as PropType<'primary' | 'secondary'>,
		default: 'primary',
	},
	type: {
		type: String as PropType<'button' | 'submit'>,
		default: 'submit',
	},
	icon: {
		type: Object as PropType<Component>,
		required: false,
		default: null,
	},
	isLoading: {
		type: Boolean,
		default: false,
	},
});

const emit = defineEmits(['click']);
</script>
<template>
	<button class="cn_button" :class="{ 'cn_button_secondary': props.variant === 'secondary' }" :disabled="props.disabled || props.isLoading" :type="props.type" @click="emit('click')">
		<component :is="props.icon" v-if="props.icon" />
		{{ props.label }}
	</button>
</template>
<style scoped>
.cn_button {
	background-color: var(--accent-color);
	color: var(--accent-text-color);
	border: none;
	border-radius: 0.25rem;
	padding: 1em;
	display: flex;
	justify-content: center;
	align-items: center;
	gap: 0.5rem;
	transition: background-color 0.2s ease-in-out;
}

.cn_button:hover {
	background-color: var(--accent-hover-color);
}

.cn_button_secondary {
	background-color: var(--primary-background);
	color: var(--text-color);
	border: 1px solid var(--stroke-color);
}

.cn_button_secondary:hover {
	background-color: var(--secondary-background);
}
</style>