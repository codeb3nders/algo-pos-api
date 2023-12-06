import { defineStore } from 'pinia'
import { ref } from 'vue'
import axios from 'axios'
import router from '@/router'

export const useUserStore = defineStore('user', () => {
  const user = ref()
  const isAuthenticated = ref(false)

  interface User {}

  const setUser = (data?: string) => (user.value = data)
  const setAuthenticated = (data: boolean) => (isAuthenticated.value = data)
  const setLocalData = (data: User | null) => {
    localStorage.setItem('user', JSON.stringify(data))
  }

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

      router.push('/about')

      console.log('111111')

      const user = await response.json()
      console.log('2222')

      setAuthenticated(true)
      console.log('3333')

      setUser(user)
      setLocalData(user)
    } catch (error) {
      console.log({ error })
      setAuthenticated(false)
      setLocalData(null)
      setUser()
    }
  }

  const getUser = async () => {
    try {
      const response = await fetch('http://localhost:3001/auth/users', {
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        }
      })

      const user = await response.json()
      console.log('SET TO AUTH')
      setAuthenticated(true)
      setUser(user[0])
    } catch (error) {
      console.log({ error })
      setAuthenticated(false)
      setUser()
    }
  }

  return { user, signIn, getUser, isAuthenticated }
})
