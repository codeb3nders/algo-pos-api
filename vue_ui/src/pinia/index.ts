import router from '@/router'
import { createPinia } from 'pinia'
import type { Router } from 'vue-router'

export const pinia = createPinia()
pinia.use(({ store }) => {
  store.router = router
})
