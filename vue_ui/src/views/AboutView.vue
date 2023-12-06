<script setup lang="ts">
import router from '@/router'
import { useUserStore } from '@/stores/user'
import { onMounted } from 'vue'

const userStore = useUserStore()

const handleClick = () => {}

onMounted(() => {
  userStore.authCheck()
})
</script>

<template>
  <div class="about">
    <h1>This is an about page</h1>
    <div class="w-full">
      <button @click="handleClick">click me</button>
    </div>
  </div>
</template>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
