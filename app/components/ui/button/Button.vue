<script setup lang="ts">
import type { PrimitiveProps } from "reka-ui";
import type { HTMLAttributes } from "vue";
import type { ButtonVariants } from ".";
import { Primitive } from "reka-ui";
import { cn } from "@/lib/utils";
import { buttonVariants } from ".";
import { Spinner } from "../spinner";

interface Props extends PrimitiveProps {
    variant?: ButtonVariants["variant"];
    size?: ButtonVariants["size"];
    class?: HTMLAttributes["class"];
    loading?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
    as: "button",
});
</script>

<template>
    <Primitive
        data-slot="button"
        :as="as"
        :as-child="asChild"
        :class="cn(buttonVariants({ variant, size }), props.class)"
    >
        <div
            v-if="loading"
            class="absolute inset-0 bg-inherit rounded-inherit"
        ></div>
        <Spinner
            v-if="loading"
            class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        />
        <slot />
    </Primitive>
</template>
