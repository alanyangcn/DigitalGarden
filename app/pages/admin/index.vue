<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-800 dark:bg-gray-900">


    <div class="flex">
      <!-- Sidebar Navigation -->
      

      <!-- Main Content -->
      <main class="flex-1 p-6">
        <!-- Stats Overview -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <UCard>
            <div class="flex items-center justify-between">
              <div>
                <p class="text-sm font-medium text-gray-600 dark:text-gray-300">Total Articles</p>
                <p class="text-2xl font-bold text-gray-900 dark:text-white">{{ stats.articles }}</p>
              </div>
              <div class="bg-blue-100 rounded-lg p-3">
                <Icon name="i-lucide-file-text" class="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </UCard>

          <UCard>
            <div class="flex items-center justify-between">
              <div>
                <p class="text-sm font-medium text-gray-600 dark:text-gray-300">Total Views</p>
                <p class="text-2xl font-bold text-gray-900 dark:text-white">{{ stats.views.toLocaleString() }}</p>
              </div>
              <div class="bg-green-100 rounded-lg p-3">
                <Icon name="i-lucide-eye" class="w-6 h-6 text-green-600" />
              </div>
            </div>
          </UCard>

          <UCard>
            <div class="flex items-center justify-between">
              <div>
                <p class="text-sm font-medium text-gray-600 dark:text-gray-300">Comments</p>
                <p class="text-2xl font-bold text-gray-900 dark:text-white">{{ stats.comments }}</p>
              </div>
              <div class="bg-purple-100 rounded-lg p-3">
                <Icon name="i-lucide-message-square" class="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </UCard>

          <UCard>
            <div class="flex items-center justify-between">
              <div>
                <p class="text-sm font-medium text-gray-600 dark:text-gray-300">Users</p>
                <p class="text-2xl font-bold text-gray-900 dark:text-white">{{ stats.users }}</p>
              </div>
              <div class="bg-orange-100 rounded-lg p-3">
                <Icon name="i-lucide-users" class="w-6 h-6 text-orange-600" />
              </div>
            </div>
          </UCard>
        </div>

        <!-- Recent Activity & Quick Actions -->
        <div class="grid lg:grid-cols-2 gap-8">
          <!-- Recent Activity -->
          <UCard>
            <template #header>
              <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Recent Activity</h3>
            </template>
            <div class="space-y-4">
              <div
                v-for="activity in recentActivity"
                :key="activity.id"
                class="flex items-start space-x-3"
              >
                <div class="flex-shrink-0">
                  <div :class="getActivityIconClass(activity.type)" class="rounded-lg p-2">
                    <Icon :name="getActivityIcon(activity.type)" class="w-4 h-4" />
                  </div>
                </div>
                <div class="flex-1">
                  <p class="text-sm text-gray-900 dark:text-white">{{ activity.description }}</p>
                  <p class="text-xs text-gray-500 dark:text-gray-400">{{ activity.time }}</p>
                </div>
              </div>
            </div>
          </UCard>

          <!-- Quick Actions -->
          <UCard>
            <template #header>
              <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Quick Actions</h3>
            </template>
            <div class="grid grid-cols-2 gap-4">
              <UButton to="/admin/articles/new" variant="outline" class="flex-col h-20">
                <Icon name="i-lucide-plus-circle" class="w-6 h-6 mb-2" />
                New Article
              </UButton>
              <UButton to="/admin/media" variant="outline" class="flex-col h-20">
                <Icon name="i-lucide-upload" class="w-6 h-6 mb-2" />
                Upload Media
              </UButton>
              <UButton to="/admin/settings" variant="outline" class="flex-col h-20">
                <Icon name="i-lucide-cog" class="w-6 h-6 mb-2" />
                Settings
              </UButton>
              <UButton to="/admin/analytics" variant="outline" class="flex-col h-20">
                <Icon name="i-lucide-bar-chart" class="w-6 h-6 mb-2" />
                Analytics
              </UButton>
            </div>
          </UCard>
        </div>

        <!-- Charts Section -->
        <div class="grid lg:grid-cols-2 gap-8 mt-8">
          <!-- Page Views Chart -->
          <UCard>
            <template #header>
              <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Page Views (Last 7 Days)</h3>
            </template>
            <div class="h-64 flex items-center justify-center bg-gray-50 dark:bg-gray-800 rounded">
              <p class="text-gray-500 dark:text-gray-400">Chart placeholder - Views trending up 25%</p>
            </div>
          </UCard>

          <!-- Popular Articles -->
          <UCard>
            <template #header>
              <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Popular Articles</h3>
            </template>
            <div class="space-y-3">
              <div
                v-for="article in popularArticles"
                :key="article.id"
                class="flex items-center justify-between"
              >
                <div class="flex-1">
                  <p class="text-sm font-medium text-gray-900 dark:text-white">{{ article.title }}</p>
                  <p class="text-xs text-gray-500 dark:text-gray-400">{{ article.views }} views</p>
                </div>
                <div class="w-24 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div
                    class="bg-blue-500 h-2 rounded-full"
                    :style="`width: ${article.percentage}%`"
                  />
                </div>
              </div>
            </div>
          </UCard>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup>
useSeoMeta({
  title: 'Admin Dashboard - Digital Garden',
  description: 'Manage your Digital Garden content'
})

// Mock data
const stats = ref({
  articles: 24,
  views: 15420,
  comments: 89,
  users: 1234
})

const recentActivity = [
  {
    id: 1,
    type: 'article',
    description: 'New article "Getting Started with Digital Gardens" published',
    time: '2 hours ago'
  },
  {
    id: 2,
    type: 'comment',
    description: 'New comment on "Building Modern Web Apps"',
    time: '4 hours ago'
  },
  {
    id: 3,
    type: 'user',
    description: 'New user registered: john.doe@example.com',
    time: '6 hours ago'
  },
  {
    id: 4,
    type: 'article',
    description: 'Article "UI Design Principles" updated',
    time: '8 hours ago'
  },
  {
    id: 5,
    type: 'media',
    description: '3 new images uploaded to media library',
    time: '12 hours ago'
  }
]

const popularArticles = [
  { id: 1, title: 'Getting Started with Digital Gardens', views: 3420, percentage: 100 },
  { id: 2, title: 'Building Modern Web Apps', views: 2890, percentage: 85 },
  { id: 3, title: 'The Art of Content Creation', views: 2150, percentage: 63 },
  { id: 4, title: 'UI Design Principles for 2025', views: 1876, percentage: 55 },
  { id: 5, title: 'Mastering TypeScript', views: 1456, percentage: 43 }
]

const userMenuItems = [
  [{
    label: 'Profile',
    icon: 'i-lucide-user'
  }],
  [{
    label: 'Settings',
    icon: 'i-lucide-cog'
  }],
  [{
    label: 'Sign out',
    icon: 'i-lucide-sign-out',
    click: () => navigateTo('/login')
  }]
]

const getActivityIcon = (type) => {
  const icons = {
    article: 'i-lucide-file-text',
    comment: 'i-lucide-message-square',
    user: 'i-lucide-user',
    media: 'i-lucide-image'
  }
  return icons[type] || 'i-lucide-circle'
}

const getActivityIconClass = (type) => {
  const classes = {
    article: 'bg-blue-100 text-blue-600',
    comment: 'bg-green-100 text-green-600',
    user: 'bg-purple-100 text-purple-600',
    media: 'bg-orange-100 text-orange-600'
  }
  return classes[type] || 'bg-gray-100 text-gray-600 dark:text-gray-300'
}
</script>