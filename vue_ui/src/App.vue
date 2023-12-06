<script setup lang="ts">
import { RouterView } from 'vue-router'
import MenuComponent from './components/MenuComponent.vue'
import LoginView from './views/LoginView.vue'
import { useUserStore } from './stores/user'
</script>

<template>
  <menu-component />
  <div class="w-full flex justify-center space-x-4"></div>
  <RouterView />
</template>
