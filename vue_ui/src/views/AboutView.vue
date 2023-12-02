<script setup lang="ts">
import { useCounterStore } from '@/stores/counter';
import { useUserStore } from '@/stores/user';


const counter = useCounterStore()

const userStore = useUserStore()

const handleClick = ()=>{
  console.log('======', userStore.token)
  
  
}
</script>

<template>
  <div class="about">
    {{ userStore.token }}
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
