import { defineStore } from 'pinia'
import { ref } from 'vue'
import axios from 'axios'

export const useInventoryStore = defineStore('inventory', () => {
  const inventory = ref()

  const setInventory = (data?: string) => (inventory.value = data)

  const getInventory = async () => {
    try {
      const response = await fetch('http://localhost:3006/items', {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        }
      })

      setInventory(await response.json())
    } catch (error) {
      console.log({ error })
      setInventory()
    }
  }

  return { inventory, getInventory }
})
