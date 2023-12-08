<script setup lang="ts">
import { useUserStore } from '@/stores/user'
import { computed, onMounted, ref } from 'vue'

const userStore = useUserStore()

const isLogged = computed(() => {
  const userEmail = localStorage.getItem('user-email')
  return !!userStore.user?.email || !!userEmail
})

const email = computed(() => {
  const userEmail = localStorage.getItem('user-email')
  return userStore.user?.email || userEmail
})

const logout = async () => {
  userStore.signOut()
}

const uEmail = ref()
</script>

<template>
  <div class="flex items-center">
    <div class="flex items-center ms-3">
      <div>
        <button
          type="button"
          class="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
          aria-expanded="false"
          data-dropdown-toggle="dropdown-user"
        >
          <span class="sr-only">Open user menu</span>
          <img
            class="w-8 h-8 rounded-full"
            src="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
            alt="user photo"
          />
        </button>
      </div>
      <div
        class="z-50 hidden my-4 text-base list-none bg-white divide-y divide-gray-100 rounded shadow dark:bg-gray-700 dark:divide-gray-600"
        id="dropdown-user"
      >
        <div class="px-4 py-3" role="none">
          <p class="text-sm font-medium text-gray-900 truncate dark:text-gray-300" role="none">
            {{ email }}
          </p>
        </div>
        <ul class="py-1" role="none">
          <li
            class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
          >
            <router-link to="/">Dashboard</router-link>
          </li>

          <li
            v-if="!isLogged"
            class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
          >
            <router-link to="/login">Login</router-link>
          </li>

          <li v-if="isLogged" @click="logout">
            <a
              href="#"
              class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
              role="menuitem"
              >Logout</a
            >
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
