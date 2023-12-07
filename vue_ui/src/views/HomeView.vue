<script setup lang="ts">
import router from '@/router'
import TheWelcome from '../components/TheWelcome.vue'
import { useUserStore } from '@/stores/user'
import { computed, onMounted } from 'vue'
import { useInventoryStore } from '@/stores/inventory';

const userStore = useUserStore()
const inventoryStore = useInventoryStore()

const stocks =  computed( ()=>{
  return  inventoryStore.inventory

})

onMounted(async () => {
  
  await inventoryStore.getInventory()
  await userStore.authCheck()
})

console.log("STOKCS",  stocks.value)
</script>

<template>
  <main>
    <TheWelcome />
    <ul >
      <li v-for="stock in stocks">
        {{ stock.item }}
      </li>
    </ul>
  </main>
</template>
