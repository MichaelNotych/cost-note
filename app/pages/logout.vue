<script setup lang="ts">
const { clear } = useUserSession();
const router = useRouter();

onMounted(async () => {
    try {
        await clear();
        await router.push("/auth");
    } catch (error) {
        console.error("Logout failed:", error);
    }
});
</script>
<template>
    <h1>Logout</h1>
</template>
