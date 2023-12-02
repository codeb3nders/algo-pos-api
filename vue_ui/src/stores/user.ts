import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUserStore = defineStore('user', () => {
  const user = ref()
  const token = ref()

  const setUser = (data?: string) => (user.value = data)
  const setToken = (data?: string) => {
    token.value = data
  }

  const signIn = async (data: { email: string; password: string }) => {
    console.log('=============')
    // user.value = data
    // token.value = data.token
    try {
      // call signIn Api
      const token = await fetch('http://127.0.0.1:3001/auth/login', {
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

      const res = await token.json()
      console.log('RESPONSE', res.password)
      setToken(res.password)
    } catch (error) {
      console.log({ error })
      setUser()
      setToken()
    }
  }

  return { user, token, signIn }
})
