<script setup lang="ts">
import router from '@/router';
import { useUserStore } from '@/stores/user';

const userStore = useUserStore()



const handleSubmit =async ()=>{
  const email = 'coffee-algo-admin@gmail.com'
  const password = 'password'
  
  userStore.signIn({email,password})

  // router.push('/about')
}

</script>
<template>
  <div class="about">
  {{ userStore.user }}
    <h1>Login>>></h1>
    <button @click="handleSubmit()">Submit</button>
    <br/>
     
  </div>
</template>

<style>

</style>
