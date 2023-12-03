import { defineStore } from 'pinia'
import { ref } from 'vue'
import axios from 'axios'

export const useUserStore = defineStore('user', () => {
  const user = ref()

  interface User {}

  const setUser = (data?: string) => (user.value = data)

  const signIn = async (data: { email: string; password: string }) => {
    try {
      const response = await fetch('http://localhost:3001/auth/login', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        },
        body: JSON.stringify({
          email: data.email,
          password: data.password
        })
      })

      setUser(await response.json())
    } catch (error) {
      console.log({ error })
      setUser()
    }
  }

  return { user, signIn }
})
