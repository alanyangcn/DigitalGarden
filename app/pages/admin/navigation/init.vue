<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900">
    <div class="container mx-auto px-4 py-8">
      <div class="max-w-2xl mx-auto">
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <h1 class="text-2xl font-bold mb-4">初始化导航数据库</h1>

          <div class="mb-6">
            <p class="text-gray-600 dark:text-gray-300 mb-4">
              此操作将创建导航网站所需的数据库表结构，并插入示例数据。
            </p>

            <div class="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4 mb-4">
              <div class="flex items-center">
                <UIcon name="i-heroicons-exclamation-triangle" class="w-5 h-5 text-yellow-600 mr-2" />
                <span class="text-yellow-800 dark:text-yellow-200">注意：如果数据库已存在数据，此操作可能会重复插入数据。</span>
              </div>
            </div>
          </div>

          <div class="flex gap-4">
            <UButton
              @click="initializeDatabase"
              :loading="loading"
              color="primary"
              size="lg"
            >
              初始化数据库
            </UButton>

            <UButton
              @click="goBack"
              variant="outline"
              color="gray"
              size="lg"
            >
              返回
            </UButton>
          </div>

          <!-- 结果显示 -->
          <div v-if="result" class="mt-6">
            <div v-if="result.success" class="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
              <div class="flex items-center mb-2">
                <UIcon name="i-heroicons-check-circle" class="w-5 h-5 text-green-600 mr-2" />
                <h3 class="text-green-800 dark:text-green-200 font-semibold">初始化成功！</h3>
              </div>

              <div class="text-green-700 dark:text-green-300">
                <p>✅ 创建了 {{ result.data.categoriesCount }} 个分类</p>
                <p>✅ 创建了 {{ result.data.linksCount }} 个链接</p>
                <p>✅ 数据库迁移执行成功</p>
              </div>

              <div class="mt-4">
                <UButton @click="goToNavigation" color="primary" variant="outline">
                  查看导航页面
                </UButton>
              </div>
            </div>

            <div v-else class="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
              <div class="flex items-center mb-2">
                <UIcon name="i-heroicons-x-circle" class="w-5 h-5 text-red-600 mr-2" />
                <h3 class="text-red-800 dark:text-red-200 font-semibold">初始化失败</h3>
              </div>

              <div class="text-red-700 dark:text-red-300">
                {{ result.error || '未知错误' }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

// SEO 配置
useSeoMeta({
  title: '初始化导航数据库 - Digital Garden Admin',
  description: '初始化导航网站数据库表结构和示例数据'
})

// 响应式数据
const loading = ref(false)
const result = ref(null)

// 初始化数据库
const initializeDatabase = async () => {
  loading.value = true
  result.value = null

  try {
    const response = await $fetch('/api/init-db', {
      method: 'POST'
    })

    result.value = response
  } catch (error) {
    result.value = {
      success: false,
      error: error.data?.error || error.message || '初始化失败'
    }
  } finally {
    loading.value = false
  }
}

// 返回上一页
const goBack = () => {
  navigateTo('/admin')
}

// 跳转到导航页面
const goToNavigation = () => {
  navigateTo('/navigation')
}
</script>