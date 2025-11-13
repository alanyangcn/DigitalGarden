<template>
  <div class="min-h-screen bg-gray-50">
    <!-- 页面头部 -->
    <section class="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16">
      <div class="container mx-auto px-4 text-center">
        <h1 class="text-4xl md:text-5xl font-bold mb-4">网址导航</h1>
        <p class="text-xl mb-8 text-blue-100">精选实用网站，让您的网络生活更便捷</p>

        <!-- 搜索框 -->
        <div class="max-w-2xl mx-auto">
          <UInput
            v-model="searchQuery"
            size="xl"
            placeholder="搜索网站..."
            icon="i-heroicons-magnifying-glass"
            class="bg-white/20 backdrop-blur-sm border-white/30 text-white placeholder-white/70"
          />
        </div>
      </div>
    </section>

    <!-- 分类筛选 -->
    <section class="sticky top-0 z-10 bg-white border-b border-gray-200 py-4 backdrop-blur-sm bg-white/95">
      <div class="container mx-auto px-4">
        <div class="flex flex-wrap gap-2 justify-center">
          <UButton
            v-for="category in categories"
            :key="category.id"
            :variant="selectedCategory === category.id ? 'solid' : 'outline'"
            :color="selectedCategory === category.id ? 'primary' : 'gray'"
            @click="selectedCategory = category.id"
            class="transition-all duration-200"
          >
            {{ category.name }}
          </UButton>
        </div>
      </div>
    </section>

    <!-- 网站链接网格 -->
    <section class="py-12">
      <div class="container mx-auto px-4">
        <!-- 加载状态 -->
        <div v-if="loading" class="text-center py-12">
          <div class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <div class="text-gray-500 mt-4">正在加载网址导航...</div>
        </div>

        <!-- 错误状态 -->
        <div v-else-if="error" class="text-center py-12">
          <div class="text-red-500 text-lg mb-4">{{ error }}</div>
          <UButton @click="initializeData" color="primary" variant="outline">
            重新加载
          </UButton>
        </div>

        <!-- 空状态 -->
        <div v-else-if="links.length === 0" class="text-center py-12">
          <div class="text-gray-400 text-lg">
            {{ searchQuery ? '没有找到匹配的网站' : '该分类下暂无网站' }}
          </div>
        </div>

        <!-- 数据展示 -->
        <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <div
            v-for="link in links"
            :key="link.id"
            class="group bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-blue-200"
            @click="openLink(link.url, link.id)"
          >
            <div class="p-6">
              <!-- 网站图标和名称 -->
              <div class="flex items-center mb-3">
                <div class="w-12 h-12 rounded-lg overflow-hidden bg-gray-100 flex items-center justify-center mr-3 group-hover:scale-110 transition-transform duration-200">
                  <img
                    v-if="link.icon"
                    :src="link.icon"
                    :alt="link.name"
                    class="w-8 h-8 object-contain"
                    @error="handleIconError"
                  />
                  <UIcon
                    v-else
                    :name="link.iconName || 'i-heroicons-globe-alt'"
                    class="w-6 h-6 text-gray-400"
                  />
                </div>
                <div class="flex-1 min-w-0">
                  <h3 class="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors duration-200 truncate">
                    {{ link.name }}
                  </h3>
                  <span class="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                    {{ link.category?.name || getCategoryName(link.category_id) }}
                  </span>
                </div>
              </div>

              <!-- 网站描述 -->
              <p class="text-gray-600 text-sm mb-4 line-clamp-2">
                {{ link.description }}
              </p>

              <!-- 标签 -->
              <div v-if="link.tags && link.tags.length > 0" class="flex flex-wrap gap-1 mb-4">
                <span
                  v-for="tag in link.tags"
                  :key="tag"
                  class="text-xs bg-blue-50 text-blue-600 px-2 py-1 rounded-md"
                >
                  {{ tag }}
                </span>
              </div>

              <!-- 访问按钮 -->
              <div class="flex items-center justify-between">
                <span class="text-xs text-gray-400">
                  {{ link.domain }}
                </span>
                <UButton
                  size="xs"
                  variant="ghost"
                  color="primary"
                  class="opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                >
                  <UIcon name="i-heroicons-arrow-top-right-on-square" class="w-4 h-4" />
                  访问
                </UButton>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 页脚 -->
    <footer class="bg-gray-800 text-white py-8 mt-16">
      <div class="container mx-auto px-4 text-center">
        <p class="text-gray-400">
          共收录 {{ totalLinks }} 个实用网站 |
          最后更新：{{ lastUpdated }}
        </p>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { computed, ref, onMounted, watch } from 'vue'

// SEO 配置
useSeoMeta({
  title: '网址导航 - Digital Garden',
  description: '精选实用网站导航，包含开发工具、学习资源、设计素材等各类实用网站',
  keywords: '网址导航,网站收藏,实用工具,开发资源'
})

// 响应式数据
const searchQuery = ref('')
const selectedCategory = ref('all')
const categories = ref([])
const links = ref([])
const stats = ref({})
const loading = ref(true)
const error = ref(null)

// 获取分类数据
const fetchCategories = async () => {
  try {
    const { data } = await $fetch('/api/navigation/categories')
    return data || []
  } catch (err) {
    console.error('获取分类失败:', err)
    return []
  }
}

// 获取链接数据
const fetchLinks = async (params = {}) => {
  try {
    const { data } = await $fetch('/api/navigation/links', {
      query: params
    })
    return data || []
  } catch (err) {
    console.error('获取链接失败:', err)
    return []
  }
}

// 获取统计信息
const fetchStats = async () => {
  try {
    const { data } = await $fetch('/api/navigation/stats')
    return data || {}
  } catch (err) {
    console.error('获取统计信息失败:', err)
    return {}
  }
}

// 初始化数据
const initializeData = async () => {
  loading.value = true
  error.value = null

  try {
    // 并行获取所有数据
    const [categoriesData, linksData, statsData] = await Promise.all([
      fetchCategories(),
      fetchLinks(),
      fetchStats()
    ])

    // 在分类列表前添加"全部"选项
    categories.value = [
      { id: 'all', name: '全部' },
      ...categoriesData
    ]

    links.value = linksData
    stats.value = statsData
  } catch (err) {
    error.value = '加载数据失败，请稍后重试'
    console.error('初始化数据失败:', err)
  } finally {
    loading.value = false
  }
}

// 更新链接数据
const updateLinks = async () => {
  try {
    const params = {
      category: selectedCategory.value === 'all' ? undefined : selectedCategory.value,
      search: searchQuery.value.trim() || undefined
    }

    links.value = await fetchLinks(params)
  } catch (err) {
    console.error('更新链接失败:', err)
    error.value = '加载数据失败，请稍后重试'
  }
}

// 监听搜索和分类变化
watch([searchQuery, selectedCategory], updateLinks, { debounce: 300 })

// 计算属性
const totalLinks = computed(() => stats.value.totalLinks || 0)

const lastUpdated = computed(() => {
  if (stats.value.lastUpdated) {
    return new Date(stats.value.lastUpdated).toLocaleDateString('zh-CN')
  }
  return new Date().toLocaleDateString('zh-CN')
})

// 方法
const getCategoryName = (categoryId) => {
  const category = categories.value.find(cat => cat.id === categoryId)
  return category ? category.name : '其他'
}

const openLink = async (url, linkId) => {
  try {
    // 记录点击次数
    if (linkId) {
      await $fetch(`/api/navigation/links/${linkId}/click`, {
        method: 'POST'
      })
    }

    // 打开链接
    window.open(url, '_blank', 'noopener,noreferrer')
  } catch (err) {
    console.error('记录点击失败:', err)
    // 即使记录失败也要打开链接
    window.open(url, '_blank', 'noopener,noreferrer')
  }
}

const handleIconError = (event) => {
  // 图标加载失败时使用默认图标
  event.target.style.display = 'none'
  const parent = event.target.parentElement
  const defaultIcon = document.createElement('i')
  defaultIcon.className = 'w-6 h-6 text-gray-400'
  parent.appendChild(defaultIcon)
}

// 页面加载时初始化数据
onMounted(initializeData)
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>