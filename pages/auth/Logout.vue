<script setup lang="ts">
const { clear } = useUserSession();
const router = useRouter();

onMounted(async () => {
  try {
    await clear();
    await router.push('/auth/signin');
  } catch (error) {
    console.error('Logout failed:', error);
  }
});
</script>
<template>
  <div class="cn-logout">
    <p>Logging out...</p>
  </div>
</template>

<style scoped>
.cn-logout {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  color: var(--text-color);
}
</style>