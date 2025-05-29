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
		type: String as PropType<'primary' | 'secondary' | 'outline'>,
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
	size: {
		type: String as PropType<'small' | 'medium' | 'large'>,
		default: 'medium',
	},
});

const emit = defineEmits(['click']);

const extraClasses = [`cn-button_${props.variant}`, `cn-button_${props.size}`];


</script>
<template>
	<button class="cn-button" :class="[extraClasses.join(' '), { 'cn-button_loading': props.isLoading }]" :disabled="props.disabled" :type="props.type" @click="emit('click')">
		<component :is="props.icon" v-if="props.icon" />
		{{ props.label }}
	</button>
</template>
<style scoped>
.cn-button {
	background-color: var(--accent-color);
	color: var(--accent-text-color);
	border: none;
	border-radius: 0.25rem;
	padding: 1em;
	display: flex;
	justify-content: center;
	align-items: center;
	gap: 0.5rem;
	cursor: pointer;
	transition: background-color 0.2s ease-in-out, color 0.2s ease-in-out;
}

.cn-button:hover {
	background-color: var(--accent-hover-color);
}

.cn-button_secondary {
	background-color: var(--primary-background);
	color: var(--text-color);
	border: 1px solid var(--stroke-color);
}

.cn-button_secondary:hover {
	background-color: var(--secondary-background);
}

.cn-button_outline {
	background-color: var(--primary-background);
	color: var(--accent-color);
	border: 1px solid var(--accent-color);
}

.cn-button_outline:hover {
	color: var(--accent-text-color);
}

.cn-button_small {
	padding: 0.5em 1em;
	font-size: 1rem;
}

.cn-button[disabled] {
	opacity: 0.5;
	pointer-events: none;
}

.cn-button_loading {
	position: relative;
	pointer-events: none;
}

.cn-button_loading::before {
	content: '';
	position: absolute;
	inset: 0;
	background-color: inherit;
	border-radius: inherit;
	z-index: 2;
}

.cn-button_loading::after {
	content: '';
	position: absolute;
	left: calc(50% - 8px);
	top: calc(50% - 8px);
	width: 16px;
	height: 16px;
	border-radius: 100%;
	z-index: 3;
	border: 2px solid var(--accent-text-color);
	border-top-color: transparent;
	animation: spin 1s linear infinite;
}

.cn-button_secondary.cn-button_loading::after {
	border-color: var(--text-color);
	border-top-color: transparent;
}

.cn-button_outline.cn-button_loading::after {
	border-color: var(--accent-color);
	border-top-color: transparent;
}

@keyframes spin {
	to {
		transform: rotate(360deg);
	}
}
</style>