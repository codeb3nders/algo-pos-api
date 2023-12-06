<script setup lang="ts">
import {  RouterView } from 'vue-router'
import MenuComponent from './components/MenuComponent.vue';
import LoginView from './views/LoginView.vue';
import { useUserStore } from './stores/user';


const userStore = useUserStore()

const isit = false

const isLogged = userStore.isAuthenticated

</script>

<template>
  <menu-component/>
  <div class="w-full flex justify-center space-x-4 ">
     {{ isLogged }}
  </div>
  <RouterView v-if="isLogged" />
 <login-view f-else/>
</template>

<style scoped>

</style>
