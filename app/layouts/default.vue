<template>
  <div class="min-h-screen bg-white">
    <!-- Navigation Header -->
    <header class="sticky top-0 z-50 bg-white border-b border-gray-200">
      <div class="container mx-auto px-4">
        <nav class="flex items-center justify-between h-16">
          <!-- Logo -->
          <NuxtLink to="/" class="flex items-center space-x-2">
            <div class="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <Icon name="i-lucide-sprout" class="w-5 h-5 text-white" />
            </div>
            <span class="text-xl font-bold text-gray-900">Digital Garden</span>
          </NuxtLink>

          <!-- Desktop Navigation -->
          <div class="hidden md:flex items-center space-x-8">
            <NuxtLink
              to="/"
              class="text-gray-700 hover:text-blue-600 font-medium transition-colors"
              :class="{ 'text-blue-600': $route.path === '/' }"
            >
              Home
            </NuxtLink>
            <NuxtLink
              to="/articles"
              class="text-gray-700 hover:text-blue-600 font-medium transition-colors"
              :class="{ 'text-blue-600': $route.path.startsWith('/articles') }"
            >
              Articles
            </NuxtLink>
            <NuxtLink
              to="/about"
              class="text-gray-700 hover:text-blue-600 font-medium transition-colors"
              :class="{ 'text-blue-600': $route.path === '/about' }"
            >
              About
            </NuxtLink>
            <NuxtLink
              to="/contact"
              class="text-gray-700 hover:text-blue-600 font-medium transition-colors"
              :class="{ 'text-blue-600': $route.path === '/contact' }"
            >
              Contact
            </NuxtLink>
          </div>

          <!-- Right Side Actions -->
          <div class="flex items-center space-x-4">
            <!-- Search -->
            <UButton
              variant="ghost"
              size="sm"
              icon="i-lucide-search"
              class="hidden md:flex"
              @click="searchOpen = true"
            />

            <!-- Theme Toggle -->
            <UButton
              variant="ghost"
              size="sm"
              :icon="isDark ? 'i-lucide-sun' : 'i-lucide-moon'"
              @click="toggleTheme"
            />

            <!-- Admin Access -->
            <UButton
              to="/admin"
              variant="outline"
              size="sm"
              icon="i-lucide-shield"
              class="hidden lg:flex"
            >
              Admin
            </UButton>

            <!-- Mobile Menu Toggle -->
            <UButton
              variant="ghost"
              size="sm"
              icon="i-lucide-menu"
              class="md:hidden"
              @click="mobileMenuOpen = !mobileMenuOpen"
            />
          </div>
        </nav>

        <!-- Mobile Navigation -->
        <div
          v-if="mobileMenuOpen"
          class="md:hidden border-t border-gray-200 py-4"
        >
          <div class="space-y-2">
            <NuxtLink
              to="/"
              class="block px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-lg"
              @click="mobileMenuOpen = false"
            >
              Home
            </NuxtLink>
            <NuxtLink
              to="/articles"
              class="block px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-lg"
              @click="mobileMenuOpen = false"
            >
              Articles
            </NuxtLink>
            <NuxtLink
              to="/about"
              class="block px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-lg"
              @click="mobileMenuOpen = false"
            >
              About
            </NuxtLink>
            <NuxtLink
              to="/contact"
              class="block px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-lg"
              @click="mobileMenuOpen = false"
            >
              Contact
            </NuxtLink>
            <div class="pt-2 border-t border-gray-200">
              <NuxtLink
                to="/admin"
                class="block px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-lg"
                @click="mobileMenuOpen = false"
              >
                Admin Access
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <main>
      <slot />
    </main>

    <!-- Footer -->
    <footer class="bg-gray-900 text-white">
      <div class="container mx-auto px-4 py-12">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
          <!-- Brand -->
          <div class="col-span-1 md:col-span-2">
            <div class="flex items-center space-x-2 mb-4">
              <div class="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <Icon name="i-lucide-sprout" class="w-5 h-5 text-white" />
              </div>
              <span class="text-xl font-bold">Digital Garden</span>
            </div>
            <p class="text-gray-400 mb-6">
              A beautiful space to cultivate your thoughts, share your knowledge, and grow your digital presence.
            </p>
            <div class="flex space-x-4">
              <a href="#" class="text-gray-400 hover:text-white transition-colors">
                <Icon name="i-simple-icons-twitter" class="w-5 h-5" />
              </a>
              <a href="#" class="text-gray-400 hover:text-white transition-colors">
                <Icon name="i-simple-icons-github" class="w-5 h-5" />
              </a>
              <a href="#" class="text-gray-400 hover:text-white transition-colors">
                <Icon name="i-simple-icons-linkedin" class="w-5 h-5" />
              </a>
              <a href="#" class="text-gray-400 hover:text-white transition-colors">
                <Icon name="i-simple-icons-youtube" class="w-5 h-5" />
              </a>
            </div>
          </div>

          <!-- Quick Links -->
          <div>
            <h3 class="text-lg font-semibold mb-4">Quick Links</h3>
            <ul class="space-y-2">
              <li>
                <NuxtLink to="/" class="text-gray-400 hover:text-white transition-colors">
                  Home
                </NuxtLink>
              </li>
              <li>
                <NuxtLink to="/articles" class="text-gray-400 hover:text-white transition-colors">
                  Articles
                </NuxtLink>
              </li>
              <li>
                <NuxtLink to="/about" class="text-gray-400 hover:text-white transition-colors">
                  About
                </NuxtLink>
              </li>
              <li>
                <NuxtLink to="/contact" class="text-gray-400 hover:text-white transition-colors">
                  Contact
                </NuxtLink>
              </li>
            </ul>
          </div>

          <!-- Categories -->
          <div>
            <h3 class="text-lg font-semibold mb-4">Categories</h3>
            <ul class="space-y-2">
              <li>
                <NuxtLink to="/articles?category=technology" class="text-gray-400 hover:text-white transition-colors">
                  Technology
                </NuxtLink>
              </li>
              <li>
                <NuxtLink to="/articles?category=design" class="text-gray-400 hover:text-white transition-colors">
                  Design
                </NuxtLink>
              </li>
              <li>
                <NuxtLink to="/articles?category=writing" class="text-gray-400 hover:text-white transition-colors">
                  Writing
                </NuxtLink>
              </li>
              <li>
                <NuxtLink to="/articles?category=productivity" class="text-gray-400 hover:text-white transition-colors">
                  Productivity
                </NuxtLink>
              </li>
            </ul>
          </div>
        </div>

        <div class="border-t border-gray-800 mt-8 pt-8 text-center">
          <p class="text-gray-400">
            © {{ new Date().getFullYear() }} Digital Garden. All rights reserved.
          </p>
        </div>
      </div>
    </footer>

    <!-- Search Modal -->
    <UModal v-model="searchOpen">
      <UCard>
        <template #header>
          <h3 class="text-lg font-semibold">Search</h3>
        </template>

        <div class="space-y-4">
          <UInput
            v-model="searchQuery"
            placeholder="Search articles, pages, and more..."
            size="lg"
            icon="i-lucide-search"
            autofocus
          />

          <div v-if="searchQuery" class="max-h-96 overflow-y-auto">
            <p class="text-sm text-gray-500 mb-3">Search results for "{{ searchQuery }}"</p>
            <!-- Search results would go here -->
            <div class="space-y-2">
              <div class="p-3 hover:bg-gray-50 rounded-lg cursor-pointer">
                <p class="font-medium">Getting Started with Digital Gardens</p>
                <p class="text-sm text-gray-500">Article • 5 min read</p>
              </div>
            </div>
          </div>
        </div>
      </UCard>
    </UModal>
  </div>
</template>

<script setup>
const mobileMenuOpen = ref(false)
const searchOpen = ref(false)
const searchQuery = ref('')

// Theme handling
const colorMode = useColorMode()
const isDark = computed(() => colorMode.value === 'dark')

const toggleTheme = () => {
  colorMode.preference = isDark.value ? 'light' : 'dark'
}

// Close mobile menu when route changes
watch(() => useRoute().path, () => {
  mobileMenuOpen.value = false
})
</script>