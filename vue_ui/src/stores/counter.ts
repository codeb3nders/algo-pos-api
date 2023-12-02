import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import type { Router } from 'vue-router'

export const useCounterStore = defineStore('counter', () => {
  const count = ref(0)
  const doubleCount = computed(() => count.value * 2)
  function increment(this: {
    router: Router
    count: import('vue').Ref<number>
    doubleCount: import('vue').ComputedRef<number>
    increment: () => void
  }) {
    count.value++
    console.log(this.count)
    this.router.push('/login') // testing four router inside the store.
  }

  return { count, doubleCount, increment }
})
