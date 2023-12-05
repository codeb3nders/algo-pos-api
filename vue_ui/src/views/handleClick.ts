import { inventoryStore } from './AboutView.vue'

export const handleClick = () => {
  inventoryStore.getInventory()
  console.log('======', inventoryStore.inventory)
}
