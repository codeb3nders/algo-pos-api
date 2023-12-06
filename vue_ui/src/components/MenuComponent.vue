<script setup lang="ts">
import { useUserStore } from '@/stores/user'
import { computed, onMounted } from 'vue'

const userStore = useUserStore()

const isLogged = computed(() => {
  return !!userStore.user?.email
})

const logout = async () => {
  userStore.signOut()
}
</script>

<template>
  <div class="flex w-full justify-start space-x-4">
    <div v-if="isLogged"><router-link to="/">Dashboard</router-link></div>
    <router-link to="/about">About</router-link>
    <div v-if="!isLogged"><router-link to="/login">Login</router-link></div>
    <button v-if="isLogged" @click="logout()">Logout</button>
  </div>
</template>
