import { defineStore } from 'pinia'
import { ref } from 'vue'
import axios from 'axios'
import router from '@/router'
import { getUsersApi } from '@/api/user'

export const useUserStore = defineStore('user', () => {
  const user = ref()
  const errorMessage = ref('')

  const setUser = (data?: string | null) => (user.value = data)

  const setLocalData = (data: string) => {
    localStorage.setItem('user-email', data)
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
      errorMessage.value = ''
      const user = await response.json()

      if (user.email) {
        setUser(user)
        setLocalData(user.email)

        router.push('/about')
      } else {
        setUser(null)
        setLocalData('')
        errorMessage.value = 'Invalid username or password!'
        router.push('/login')
      }
    } catch (error) {
      console.log({ error })
      setLocalData('')
      setUser()
      errorMessage.value = 'Invalid username or password!'
      router.push('/login')
    }
  }

  const getUser = async () => {
    try {
      const response = await getUsersApi()

      const user = response
      setUser(user[0])
    } catch (error) {
      console.log({ error })

      setUser()
    }
  }

  const signOut = async () => {
    try {
      const response = await fetch('http://localhost:3001/auth/logout', {
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        }
      })

      setUser(null)
      setLocalData('')
      router.push('/login')
    } catch (error) {
      console.log({ error })

      setLocalData('')
      setUser()
    }
  }

  const authCheck = async () => {
    const userEmail = localStorage.getItem('user-email')

    if (!userEmail) {
      router.push('/login')
    }
  }

  return { user, signIn, signOut, getUser, authCheck, errorMessage }
})
