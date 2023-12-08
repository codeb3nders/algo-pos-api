<script setup lang="ts">
import router from '@/router'
import { useUserStore } from '@/stores/user'
import { onMounted, reactive } from 'vue'

const userStore = useUserStore()

const state = reactive({ email: '', password: '' })

const handleSubmit = async () => {
  userStore.signIn({ email: state.email, password: state.password })
}

onMounted(() => {
  const userEmail = localStorage.getItem('user-email')
  console.log({ userEmail })
  if (userEmail) router.push('/')
})
</script>

<template>
  <div class="flex justify-center items-center m-10">
    <div class="w-full max-w-xs">
      <form @submit.prevent="handleSubmit" class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div class="identity-input mb-4">
          <label for="identity" class="block text-gray-700 text-sm font-bold mb-2"> Email</label>
          <input
            id="identity"
            class="shadow appearance-none borderrounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            placeholder="Email"
            aria-describedby="emailHelp"
            v-model="state.email"
          />
          <span class="text-xs text-red-700" id="emailHelp"></span>
        </div>

        <div class="password-input mb-6">
          <label for="identity" class="block text-gray-700 text-sm font-bold mb-2">Password</label>

          <input
            aria-describedby="passwordHelp"
            v-model="state.password"
            class="shadow appearance-none borderrounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            type="password"
            placeholder="Password"
          />

          <span class="text-xs text-red-700" id="passwordHelp"></span>
        </div>

        <div class="flex items-center justify-between">
          <button
            @click="handleSubmit"
            class="bg-blue-600 hover:bg-black text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Sign In
          </button>
          <div v-if="userStore.errorMessage" class="text-red-500">{{ userStore.errorMessage }}</div>
        </div>
      </form>
    </div>
  </div>
</template>

<style></style>
