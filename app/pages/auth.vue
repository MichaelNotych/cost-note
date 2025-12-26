<script setup lang="ts">
import { toTypedSchema } from "@vee-validate/zod";
import { useForm } from "vee-validate";
import z from "zod";

useHead({
    title: "Auth",
});

const { fetch: fetchUserSession } = useUserSession();
const router = useRouter();

const isNewUser: Ref<boolean> = ref(false);

const formSchema = toTypedSchema(
    z.object({
        email: z.string().email(),
        password: z.string().min(6).max(30),
    })
);

const form = useForm({
    validationSchema: formSchema,
});

const onSubmit = form.handleSubmit(async (values) => {
    console.log("Form submitted!", values, isNewUser.value);
    const endpoint = isNewUser.value ? '/api/signup' : '/api/auth/signin';
    try {
        await $fetch(endpoint, {
            method: "POST",
            body: { email: values.email, password: values.password },
        });

        await fetchUserSession();

        await router.push("/");
    } catch (error) {
        console.log(error);
    }
});

</script>
<template>
    <h1 class="text-4xl mb-4 font-bold">
        {{ isNewUser ? "Sign up" : "Sign in" }}
    </h1>
    <div class="m-auto w-full">
        <form @submit="onSubmit" class="flex flex-col gap-2">
            <FormField v-slot="{ componentField }" name="email">
                <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                        <Input type="email" v-bind="componentField" />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            </FormField>
            <FormField v-slot="{ componentField }" name="password">
                <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                        <Input type="password" v-bind="componentField" />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            </FormField>
            <Button type="submit">
                {{ isNewUser ? "Sign up" : "Sign in" }}
            </Button>
            <div>
                {{
                    isNewUser
                        ? "Already have an account?"
                        : " Do not have an account?"
                }}

                <span
                    class="underline cursor-pointer"
                    @click="() => (isNewUser = !isNewUser)"
                >
                    {{ isNewUser ? "Sign in here" : "Sign up here" }}
                </span>
            </div>
        </form>
    </div>
</template>
