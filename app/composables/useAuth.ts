export const useAuth = () => {
  // In a real app, this would connect to your authentication system
  const user = ref(null)
  const isAuthenticated = ref(false)
  const isLoading = ref(false)

  // Mock user data
  const mockUser = {
    id: 1,
    name: 'Admin User',
    email: 'admin@digitalgarden.com',
    role: 'admin',
    avatar: null
  }

  // Check authentication status
  const checkAuth = async () => {
    isLoading.value = true
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500))

      // For demo purposes, we'll just set the user
      user.value = mockUser
      isAuthenticated.value = true
    } catch (error) {
      console.error('Auth check failed:', error)
      user.value = null
      isAuthenticated.value = false
    } finally {
      isLoading.value = false
    }
  }

  // Login function
  const login = async (credentials: { email: string; password: string }) => {
    isLoading.value = true
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))

      // Mock login - in a real app, this would validate credentials
      if (credentials.email === 'admin@digitalgarden.com' && credentials.password === 'password') {
        user.value = mockUser
        isAuthenticated.value = true
        return { success: true }
      } else {
        throw new Error('Invalid credentials')
      }
    } finally {
      isLoading.value = false
    }
  }

  // Logout function
  const logout = async () => {
    isLoading.value = true
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500))

      user.value = null
      isAuthenticated.value = false
    } catch (error) {
      console.error('Logout failed:', error)
    } finally {
      isLoading.value = false
    }
  }

  // Check if user has required role
  const hasRole = (role: string) => {
    return user.value?.role === role
  }

  // Check if user is admin
  const isAdmin = computed(() => {
    return user.value?.role === 'admin'
  })

  return {
    user: readonly(user),
    isAuthenticated: readonly(isAuthenticated),
    isLoading: readonly(isLoading),
    isAdmin,
    checkAuth,
    login,
    logout,
    hasRole
  }
}