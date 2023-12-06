export const getUsersApi = async () => {
  try {
    const response = await fetch('http://localhost:3001/auth/users', {
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      }
    })

    return await response.json()
  } catch (error) {
    return error
  }
}
