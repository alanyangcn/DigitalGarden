<template>
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
    <section class="sticky top-0 z-10 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 py-4 backdrop-blur-sm bg-white/95 dark:bg-gray-800/95">
      <div class="container mx-auto px-4">
        <div class="relative">
          <!-- 左侧渐变遮罩 -->
          <div class="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-white dark:from-gray-800 to-transparent z-10 pointer-events-none"></div>

          <!-- 右侧渐变遮罩 -->
          <div class="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-white dark:from-gray-800 to-transparent z-10 pointer-events-none"></div>

          <!-- 滚动容器 -->
          <div
            ref="scrollContainer"
            class="overflow-x-auto scrollbar-hide scroll-smooth cursor-grab active:cursor-grabbing"
            @mousedown="handleMouseDown"
          >
            <div class="flex gap-2 whitespace-nowrap justify-center min-w-max px-4">
              <UButton
                v-for="category in categories"
                :key="category.id"
                :variant="selectedCategory === category.id ? 'solid' : 'outline'"
                :color="selectedCategory === category.id ? 'primary' : 'gray'"
                @click="selectedCategory = category.id"
                class="transition-all duration-200 flex-shrink-0 select-none"
              >
                {{ category.name }}
              </UButton>
            </div>
          </div>
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
        <div v-else class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
          <div
            v-for="link in links"
            :key="link.id"
            class="group bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden border border-gray-100 dark:border-gray-700 hover:border-blue-200 dark:hover:border-blue-400 cursor-pointer"
            @click="openLink(link.url)"
          >
            <div class="p-4">
              <!-- 网站图标和名称 -->
              <div class="flex items-center mb-2">
                <div class="w-10 h-10 rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-700 flex items-center justify-center mr-2 group-hover:scale-105 transition-transform duration-200">
                  <img
                    v-if="link.icon"
                    :src="link.icon"
                    :alt="link.name"
                    class="w-6 h-6 object-contain"
                    @error="handleIconError"
                  />
                  <UIcon
                    v-else
                    :name="link.iconName || 'i-heroicons-globe-alt'"
                    class="w-5 h-5 text-gray-400"
                  />
                </div>
                <div class="flex-1 min-w-0">
                  <h3 class="font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200 truncate text-sm">
                    {{ link.name }}
                  </h3>
                  <span class="text-xs text-gray-500 dark:text-gray-400 truncate">
                    {{ link.domain }}
                  </span>
                </div>
              </div>

              <!-- 网站描述 -->
              <p class="text-gray-600 dark:text-gray-300 text-xs mb-2 line-clamp-1">
                {{ link.description }}
              </p>

              <!-- 标签 -->
              <div v-if="link.tags && link.tags.length > 0" class="flex flex-wrap gap-1">
                <span
                  v-for="tag in link.tags.slice(0, 3)"
                  :key="tag"
                  class="text-xs bg-blue-50 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400 px-1.5 py-0.5 rounded"
                >
                  {{ tag }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
</template>

<script setup>
import { computed, ref, onMounted, onUnmounted, watch } from 'vue'

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
const loading = ref(true)
const error = ref(null)

// 拖拽滚动相关
const scrollContainer = ref(null)
const isDragging = ref(false)
const startX = ref(0)
const scrollLeft = ref(0)

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


// 初始化数据
const initializeData = async () => {
  loading.value = true
  error.value = null

  try {
    // 并行获取分类和链接数据
    const [categoriesData, linksData] = await Promise.all([
      fetchCategories(),
      fetchLinks()
    ])

    // 在分类列表前添加"全部"选项
    categories.value = [
      { id: 'all', name: '全部' },
      ...categoriesData
    ]

    links.value = linksData
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
const totalLinks = computed(() => links.value.length)

const lastUpdated = computed(() => {
  return new Date().toLocaleDateString('zh-CN')
})

// 方法
const getCategoryName = (categoryId) => {
  const category = categories.value.find(cat => cat.id === categoryId)
  return category ? category.name : '其他'
}

const openLink = (url) => {
  // 直接打开链接
  window.open(url, '_blank', 'noopener,noreferrer')
}

// 拖拽滚动功能
const handleMouseDown = (e) => {
  if (!scrollContainer.value) return

  isDragging.value = true
  startX.value = e.pageX - scrollContainer.value.offsetLeft
  scrollLeft.value = scrollContainer.value.scrollLeft

  // 添加全局鼠标事件监听
  document.addEventListener('mousemove', handleMouseMove)
  document.addEventListener('mouseup', handleMouseUp)

  // 防止文本选择
  e.preventDefault()
}

const handleMouseMove = (e) => {
  if (!isDragging.value || !scrollContainer.value) return

  e.preventDefault()
  const x = e.pageX - scrollContainer.value.offsetLeft
  const walk = (x - startX.value) * 2 // 滚动速度
  scrollContainer.value.scrollLeft = scrollLeft.value - walk
}

const handleMouseUp = () => {
  isDragging.value = false

  // 移除全局鼠标事件监听
  document.removeEventListener('mousemove', handleMouseMove)
  document.removeEventListener('mouseup', handleMouseUp)
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

// 页面卸载时清理事件监听
onUnmounted(() => {
  document.removeEventListener('mousemove', handleMouseMove)
  document.removeEventListener('mouseup', handleMouseUp)
})
</script>

<style scoped>
.line-clamp-1 {
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* 隐藏滚动条但保持滚动功能 */
.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

.scrollbar-hide::-webkit-scrollbar {
  display: none;
}

.scrollbar-hide::-webkit-scrollbar-track {
  background: transparent;
}

.scrollbar-hide::-webkit-scrollbar-thumb {
  background: transparent;
}
</style>