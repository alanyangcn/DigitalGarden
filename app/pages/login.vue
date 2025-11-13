<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center px-4">
    <div class="max-w-md w-full">
      <!-- Logo and Title -->
      <div class="text-center mb-8">
        <div class="mx-auto w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center mb-4">
          <Icon name="i-lucide-sprout" class="w-8 h-8 text-white" />
        </div>
        <h1 class="text-3xl font-bold text-gray-900">Digital Garden</h1>
        <p class="text-gray-600 mt-2">Sign in to your account</p>
      </div>

      <!-- Login Form -->
      <UCard class="shadow-lg">
        <form class="space-y-6" @submit.prevent="handleLogin">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Email</label>
            <UInput
              v-model="form.email"
              type="email"
              placeholder="admin@digitalgarden.com"
              size="lg"
              required
              :disabled="isLoading"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Password</label>
            <UInput
              v-model="form.password"
              type="password"
              placeholder="Enter your password"
              size="lg"
              required
              :disabled="isLoading"
            />
          </div>

          <div class="flex items-center justify-between">
            <div class="flex items-center">
              <UCheckbox v-model="form.rememberMe" />
              <label class="ml-2 text-sm text-gray-700">Remember me</label>
            </div>
            <a href="#" class="text-sm text-blue-600 hover:text-blue-500">
              Forgot your password?
            </a>
          </div>

          <UButton
            type="submit"
            size="lg"
            class="w-full"
            :loading="isLoading"
            :disabled="isLoading"
          >
            Sign In
          </UButton>
        </form>

        <!-- Demo Account Info -->
        <div class="mt-6 p-4 bg-blue-50 rounded-lg">
          <p class="text-sm text-blue-800 font-medium mb-2">Demo Account:</p>
          <p class="text-xs text-blue-700">Email: admin@digitalgarden.com</p>
          <p class="text-xs text-blue-700">Password: password</p>
        </div>
      </UCard>

      <!-- Footer -->
      <div class="text-center mt-8">
        <p class="text-gray-600">
          Don't have an account?
          <a href="#" class="text-blue-600 hover:text-blue-500 font-medium">
            Contact us
          </a>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
useSeoMeta({
  title: 'Login - Digital Garden',
  description: 'Sign in to your Digital Garden admin account'
})

const { login, isLoading } = useAuth()

const form = ref({
  email: 'admin@digitalgarden.com',
  password: 'password',
  rememberMe: false
})

const route = useRoute()
const router = useRouter()

const handleLogin = async () => {
  try {
    await login({
      email: form.value.email,
      password: form.value.password
    })

    // Show success message
    useToast().add({
      title: 'Welcome back!',
      description: 'You have successfully signed in.',
      color: 'green'
    })

    // Redirect to intended page or admin dashboard
    const redirectTo = route.query.redirect || '/admin'
    await router.push(redirectTo)
  } catch (error) {
    useToast().add({
      title: 'Login Failed',
      description: error.message || 'Please check your credentials and try again.',
      color: 'red'
    })
  }
}

// If already authenticated, redirect to admin
onMounted(async () => {
  const { isAuthenticated } = useAuth()
  await nextTick()

  if (isAuthenticated.value) {
    await router.push('/admin')
  }
})
</script>