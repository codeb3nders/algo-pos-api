<script setup lang="ts">
import {  RouterView } from 'vue-router'

</script>

<template>
  <h1>Menu</h1>  
  <div class="w-full flex justify-center space-x-4 ">
     <router-link to="/">Go to Home</router-link>
    <router-link to="/about">Go to About</router-link>
    <router-link to="/login">Login</router-link>
  </div>
  <RouterView />
</template>

<style scoped>

</style>
