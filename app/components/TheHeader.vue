<template>
  <header class="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50">
    <div class="container mx-auto px-4">
      <div class="flex items-center justify-between h-16">
        <!-- Logo和标题 -->
        <div class="flex items-center space-x-3">
          <NuxtLink to="/" class="flex items-center space-x-3 hover:opacity-80 transition-opacity">
            <div class="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <UIcon name="i-heroicons-sparkles" class="w-5 h-5 text-white" />
            </div>
            <span class="text-xl font-bold text-gray-900 dark:text-white">Digital Garden</span>
          </NuxtLink>
        </div>

        <!-- 导航菜单 -->
        <nav class="hidden md:flex items-center space-x-8">
          <NuxtLink
            to="/"
            class="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
          >
            首页
          </NuxtLink>
          <NuxtLink
            to="/navigation"
            class="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
          >
            网址导航
          </NuxtLink>
        </nav>

        <!-- 右侧工具栏 -->
        <div class="flex items-center space-x-4">
          <!-- 颜色模式切换按钮 -->
          <UButton
            :icon="colorMode.value === 'dark' ? 'i-heroicons-sun' : 'i-heroicons-moon'"
            variant="ghost"
            :color="colorMode.value === 'dark' ? 'white' : 'gray'"
            size="sm"
            class="hover:bg-gray-100 dark:hover:bg-gray-700"
            @click="toggleColorMode"
          />

          <!-- 移动端菜单按钮 -->
          <UButton
            icon="i-heroicons-bars-3"
            variant="ghost"
            color="gray"
            size="sm"
            class="md:hidden"
            @click="mobileMenuOpen = !mobileMenuOpen"
          />
        </div>
      </div>

      <!-- 移动端菜单 -->
      <div v-if="mobileMenuOpen" class="md:hidden py-4 border-t border-gray-200 dark:border-gray-700">
        <nav class="flex flex-col space-y-3">
          <NuxtLink
            to="/"
            class="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            @click="mobileMenuOpen = false"
          >
            首页
          </NuxtLink>
          <NuxtLink
            to="/navigation"
            class="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            @click="mobileMenuOpen = false"
          >
            网址导航
          </NuxtLink>
        </nav>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref } from 'vue'

const mobileMenuOpen = ref(false)
const colorMode = useColorMode()

const toggleColorMode = () => {
  colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
}
</script>