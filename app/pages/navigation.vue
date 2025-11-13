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
        <div v-if="filteredLinks.length === 0" class="text-center py-12">
          <div class="text-gray-400 text-lg">
            {{ searchQuery ? '没有找到匹配的网站' : '该分类下暂无网站' }}
          </div>
        </div>

        <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <div
            v-for="link in filteredLinks"
            :key="link.id"
            class="group bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-blue-200"
            @click="openLink(link.url)"
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
                    {{ getCategoryName(link.categoryId) }}
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
import { computed, ref } from 'vue'

// SEO 配置
useSeoMeta({
  title: '网址导航 - Digital Garden',
  description: '精选实用网站导航，包含开发工具、学习资源、设计素材等各类实用网站',
  keywords: '网址导航,网站收藏,实用工具,开发资源'
})

// 响应式数据
const searchQuery = ref('')
const selectedCategory = ref('all')

// 分类数据
const categories = [
  { id: 'all', name: '全部' },
  { id: 'dev', name: '开发工具' },
  { id: 'design', name: '设计资源' },
  { id: 'productivity', name: '效率工具' },
  { id: 'learning', name: '学习资源' },
  { id: 'entertainment', name: '娱乐休闲' },
  { id: 'news', name: '新闻资讯' },
  { id: 'social', name: '社交媒体' }
]

// 网站链接数据
const links = [
  // 开发工具
  {
    id: 1,
    name: 'GitHub',
    url: 'https://github.com',
    description: '全球最大的代码托管平台和开源社区',
    icon: 'https://github.com/favicon.ico',
    categoryId: 'dev',
    tags: ['代码托管', '开源', '版本控制'],
    domain: 'github.com'
  },
  {
    id: 2,
    name: 'Stack Overflow',
    url: 'https://stackoverflow.com',
    description: '程序员问答社区，解决编程问题的最佳平台',
    icon: 'https://cdn.sstatic.net/Sites/stackoverflow/Img/favicon.ico',
    categoryId: 'dev',
    tags: ['问答', '编程', '技术'],
    domain: 'stackoverflow.com'
  },
  {
    id: 3,
    name: 'MDN Web Docs',
    url: 'https://developer.mozilla.org',
    description: 'Web 技术文档，包括 HTML、CSS、JavaScript 等',
    icon: 'https://developer.mozilla.org/favicon-48x48.png',
    categoryId: 'dev',
    tags: ['文档', 'Web技术', '学习'],
    domain: 'developer.mozilla.org'
  },
  {
    id: 4,
    name: 'CodePen',
    url: 'https://codepen.io',
    description: '在线代码编辑器，前端开发者的 playground',
    icon: 'https://cpwebassets.codepen.io/assets/favicon/favicon-touch-de50acbf5d634ec6791894eba4ba9cf490f709b3d742597c6fc4b734e6492a5a.png',
    categoryId: 'dev',
    tags: ['在线编辑', '前端', '展示'],
    domain: 'codepen.io'
  },

  // 设计资源
  {
    id: 5,
    name: 'Figma',
    url: 'https://www.figma.com',
    description: '协作式界面设计工具，支持实时协作',
    icon: 'https://static.figma.com/app/icon/1/favicon.ico',
    categoryId: 'design',
    tags: ['UI设计', '协作', '原型'],
    domain: 'figma.com'
  },
  {
    id: 6,
    name: 'Unsplash',
    url: 'https://unsplash.com',
    description: '免费高质量图片素材库',
    icon: 'https://unsplash.com/favicon.ico',
    categoryId: 'design',
    tags: ['图片', '免费', '素材'],
    domain: 'unsplash.com'
  },
  {
    id: 7,
    name: 'Dribbble',
    url: 'https://dribbble.com',
    description: '设计师作品展示和交流平台',
    icon: 'https://cdn.dribbble.com/assets/dribbble-ball-icon-1e8c7a47e43585e5a858b639a78659aa090694a78e7491defe21451775c81e65.png',
    categoryId: 'design',
    tags: ['设计', '作品', '灵感'],
    domain: 'dribbble.com'
  },

  // 效率工具
  {
    id: 8,
    name: 'Notion',
    url: 'https://www.notion.so',
    description: 'All-in-one 工作空间，笔记、项目管理、知识库',
    icon: 'https://www.notion.so/images/favicon.ico',
    categoryId: 'productivity',
    tags: ['笔记', '项目管理', '协作'],
    domain: 'notion.so'
  },
  {
    id: 9,
    name: 'Trello',
    url: 'https://trello.com',
    description: '可视化项目管理工具，基于看板方法',
    icon: 'https://trello.com/favicon.ico',
    categoryId: 'productivity',
    tags: ['项目管理', '看板', '协作'],
    domain: 'trello.com'
  },

  // 学习资源
  {
    id: 10,
    name: 'Coursera',
    url: 'https://www.coursera.org',
    description: '在线课程平台，与顶级大学合作提供课程',
    icon: 'https://www.coursera.org/favicon.ico',
    categoryId: 'learning',
    tags: ['在线课程', '大学', '证书'],
    domain: 'coursera.org'
  },
  {
    id: 11,
    name: 'Khan Academy',
    url: 'https://www.khanacademy.org',
    description: '免费在线教育平台，涵盖各种学科',
    icon: 'https://cdn.kastatic.org/images/favicon.ico',
    categoryId: 'learning',
    tags: ['免费教育', '数学', '科学'],
    domain: 'khanacademy.org'
  },

  // 娱乐休闲
  {
    id: 12,
    name: 'YouTube',
    url: 'https://www.youtube.com',
    description: '全球最大的视频分享平台',
    icon: 'https://www.youtube.com/favicon.ico',
    categoryId: 'entertainment',
    tags: ['视频', '娱乐', '学习'],
    domain: 'youtube.com'
  },

  // 新闻资讯
  {
    id: 13,
    name: 'Hacker News',
    url: 'https://news.ycombinator.com',
    description: '技术新闻和讨论社区',
    icon: '/favicon.ico',
    iconName: 'i-heroicons-newspaper',
    categoryId: 'news',
    tags: ['技术新闻', '讨论', '创业'],
    domain: 'news.ycombinator.com'
  },

  // 社交媒体
  {
    id: 14,
    name: 'Twitter',
    url: 'https://twitter.com',
    description: '实时信息和社交网络平台',
    icon: 'https://abs.twimg.com/favicons/twitter.ico',
    categoryId: 'social',
    tags: ['社交', '实时信息', '微博'],
    domain: 'twitter.com'
  }
]

// 计算属性
const filteredLinks = computed(() => {
  let filtered = links

  // 按分类筛选
  if (selectedCategory.value !== 'all') {
    filtered = filtered.filter(link => link.categoryId === selectedCategory.value)
  }

  // 按搜索关键词筛选
  if (searchQuery.value.trim()) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(link =>
      link.name.toLowerCase().includes(query) ||
      link.description.toLowerCase().includes(query) ||
      link.tags?.some(tag => tag.toLowerCase().includes(query)) ||
      link.domain.toLowerCase().includes(query)
    )
  }

  return filtered
})

const totalLinks = computed(() => links.length)

const lastUpdated = computed(() => {
  return new Date().toLocaleDateString('zh-CN')
})

// 方法
const getCategoryName = (categoryId) => {
  const category = categories.find(cat => cat.id === categoryId)
  return category ? category.name : '其他'
}

const openLink = (url) => {
  window.open(url, '_blank', 'noopener,noreferrer')
}

const handleIconError = (event) => {
  // 图标加载失败时使用默认图标
  event.target.style.display = 'none'
  const parent = event.target.parentElement
  const defaultIcon = document.createElement('i')
  defaultIcon.className = 'w-6 h-6 text-gray-400'
  parent.appendChild(defaultIcon)
}
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>