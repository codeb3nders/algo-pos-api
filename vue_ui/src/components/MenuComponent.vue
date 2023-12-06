<script setup lang="ts">
import { useUserStore } from '@/stores/user';
import { onMounted } from 'vue'

onMounted(() => {
  // get user
  const userStore = useUserStore()
  userStore.getUser()
})


</script>

<template>
  <div class="flex w-full justify-start space-x-4">
    <router-link to="/">Go to Home</router-link>
    <router-link to="/about">Go to About</router-link>
    <router-link to="/login">Login</router-link>
  </div>
</template>
