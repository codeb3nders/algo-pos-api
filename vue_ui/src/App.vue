<script setup lang="ts">
import { RouterView } from 'vue-router'
import MenuComponent from './components/MenuComponent.vue'
import LoginView from './views/LoginView.vue'
import { useUserStore } from './stores/user'
import LeftSideNav from './components/LeftSideNav.vue'
import rightSideNav from './components/RightSideNav.vue'
import { onMounted } from 'vue'
import { initFlowbite } from 'flowbite'

onMounted(() => {
  initFlowbite()
})
</script>

<template>
  <nav
    class="dark:border-gray-700 shadow-md p-1 sm:ml-64 border-2 bg-gray-100"
  >
    <!-- Top Nav Bar -->
    <div class="px-3 py-3 lg:px-5 lg:pl-3">
      <div class="flex items-center justify-between">
        <!-- Left side of nav bar -->
        <left-side-nav />

        <!-- Right side of nav var -->
        <right-side-nav />
      </div>
    </div>
  </nav>

  <!-- Sidebar menu content -->

  <menu-component />

  <!-- Center content Area -->
  <div class="p-4 sm:ml-64 border-2 bg-gray-100">
    <div class="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 mt-14">
      <div class="grid gap-4 mb-4">
        <div class="flex items-center justify-center rounded bg-gray-50 dark:bg-gray-800">
          <router-view />
        </div>
      </div>
    </div>
  </div>
</template>
