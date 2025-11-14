<template>
  <footer class="bg-gray-800 dark:bg-gray-950 text-white py-4 mt-auto">
    <div class="container mx-auto px-4">
      <div class="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
        <!-- 版权信息 -->
        <div class="text-center md:text-left">
          <p class="text-gray-500 dark:text-gray-600 text-xs">
            © {{ new Date().getFullYear() }} Digital Garden. All rights reserved.
          </p>
        </div>

        <!-- 链接 -->
        <div class="flex items-center space-x-6 text-xs">
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            class="text-gray-400 dark:text-gray-500 hover:text-white transition-colors"
          >
            GitHub
          </a>
          <a
            href="/about"
            class="text-gray-400 dark:text-gray-500 hover:text-white transition-colors"
          >
            关于我们
          </a>
          <a
            href="/contact"
            class="text-gray-400 dark:text-gray-500 hover:text-white transition-colors"
          >
            联系方式
          </a>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
// 无需额外逻辑
</script>