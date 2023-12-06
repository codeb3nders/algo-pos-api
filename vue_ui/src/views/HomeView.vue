<script setup lang="ts">
import router from '@/router'
import TheWelcome from '../components/TheWelcome.vue'
import { useUserStore } from '@/stores/user'
import { onMounted } from 'vue'

const userStore = useUserStore()

onMounted(() => {
  userStore.authCheck()
})
</script>

<template>
  <main>
    <TheWelcome />
  </main>
</template>
