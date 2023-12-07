import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useUserStore } from './user'

export const useInventoryStore = defineStore('inventory', () => {
  
const userStore = useUserStore()
  const inventory = ref()

  const setInventory = (data?: string) => (inventory.value = data)

  const getInventory = async () => {
    try {
      const response = await fetch('http://localhost:3006/items', {
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        }
      })

      const res = await response.json()  
      
      console.log(res?.length)
      if (res.length == undefined) {
        userStore.setUser()
        userStore.setLocalData('')
        router.push('/login')
        setInventory()
      }

      setInventory(res)
    } catch (error) {
      console.log({ error })
      userStore.setUser()
      userStore.setLocalData('')
      router.push('/login')
      setInventory()
    }
  }

  return { inventory, getInventory }
})
