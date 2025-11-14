<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900">
    <!-- Header -->
    <header class="bg-white dark:bg-gray-800 shadow-sm border-b">
      <div class="px-6 py-4">
        <div class="flex items-center justify-between">
          <div class="flex items-center space-x-4">
            <UButton to="/admin" variant="ghost" icon="i-lucide-arrow-left" />
            <h1 class="text-2xl font-bold text-gray-900 dark:text-white">Articles Management</h1>
          </div>
          <UButton to="/admin/articles/new" color="primary">
            <Icon name="i-lucide-plus" class="w-4 h-4 mr-2" />
            New Article
          </UButton>
        </div>
      </div>
    </header>

    <div class="p-6">
      <!-- Filters and Search -->
      <UCard class="mb-6">
        <div class="flex flex-col lg:flex-row gap-4">
          <UInput
            v-model="searchQuery"
            placeholder="Search articles..."
            icon="i-lucide-search"
            class="flex-1"
          />
          <USelect
            v-model="statusFilter"
            :options="statusOptions"
            placeholder="All Status"
            class="lg:w-48"
          />
          <USelect
            v-model="categoryFilter"
            :options="categoryOptions"
            placeholder="All Categories"
            class="lg:w-48"
          />
          <UButton variant="outline" icon="i-lucide-filter">
            More Filters
          </UButton>
        </div>
      </UCard>

      <!-- Articles Table -->
      <UCard>
        <table class="w-full">
          <thead class="bg-gray-50 dark:bg-gray-900 border-b">
            <tr>
              <th class="text-left p-4 font-medium text-gray-700 dark:text-gray-300 dark:text-gray-600">Title</th>
              <th class="text-left p-4 font-medium text-gray-700 dark:text-gray-300 dark:text-gray-600">Category</th>
              <th class="text-left p-4 font-medium text-gray-700 dark:text-gray-300 dark:text-gray-600">Status</th>
              <th class="text-left p-4 font-medium text-gray-700 dark:text-gray-300 dark:text-gray-600">Views</th>
              <th class="text-left p-4 font-medium text-gray-700 dark:text-gray-300 dark:text-gray-600">Created</th>
              <th class="text-left p-4 font-medium text-gray-700 dark:text-gray-300 dark:text-gray-600">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="article in filteredArticles"
              :key="article.id"
              class="border-b hover:bg-gray-50 dark:hover:bg-gray-700 dark:bg-gray-900"
            >
              <td class="p-4">
                <div>
                  <p class="font-medium text-gray-900 dark:text-white">{{ article.title }}</p>
                  <p class="text-sm text-gray-500 dark:text-gray-400">{{ article.excerpt }}</p>
                </div>
              </td>
              <td class="p-4">
                <UBadge :color="getCategoryColor(article.category)" variant="soft">
                  {{ article.category }}
                </UBadge>
              </td>
              <td class="p-4">
                <UBadge :color="getStatusColor(article.status)" variant="soft">
                  {{ article.status }}
                </UBadge>
              </td>
              <td class="p-4 text-gray-600 dark:text-gray-400">{{ article.views.toLocaleString() }}</td>
              <td class="p-4 text-gray-600 dark:text-gray-400">{{ article.created }}</td>
              <td class="p-4">
                <div class="flex items-center space-x-2">
                  <UButton variant="ghost" size="sm" :to="`/articles/${article.slug}`" target="_blank">
                    <Icon name="i-lucide-eye" class="w-4 h-4" />
                  </UButton>
                  <UButton variant="ghost" size="sm" :to="`/admin/articles/${article.id}/edit`">
                    <Icon name="i-lucide-edit" class="w-4 h-4" />
                  </UButton>
                  <UDropdown :items="getActionItems(article.id)">
                    <UButton variant="ghost" size="sm">
                      <Icon name="i-lucide-more-horizontal" class="w-4 h-4" />
                    </UButton>
                  </UDropdown>
                </div>
              </td>
            </tr>
          </tbody>
        </table>

        <!-- Empty State -->
        <div v-if="filteredArticles.length === 0" class="text-center py-12">
          <Icon name="i-lucide-file-text" class="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
          <h3 class="text-lg font-semibold text-gray-700 dark:text-gray-300 dark:text-gray-600 mb-2">No articles found</h3>
          <p class="text-gray-500 dark:text-gray-400 mb-4">Try adjusting your search or filters</p>
          <UButton to="/admin/articles/new" color="primary">
            Create your first article
          </UButton>
        </div>
      </UCard>

      <!-- Pagination -->
      <div v-if="filteredArticles.length > 0" class="flex justify-between items-center mt-6">
        <p class="text-gray-600 dark:text-gray-400">
          Showing {{ (currentPage - 1) * 10 + 1 }} to {{ Math.min(currentPage * 10, filteredArticles.length) }} of {{ filteredArticles.length }} articles
        </p>
        <UPagination
          v-model="currentPage"
          :page-count="10"
          :total="filteredArticles.length"
          show-last
          show-first
        />
      </div>
    </div>
  </div>
</template>

<script setup>
useSeoMeta({
  title: 'Articles Management - Digital Garden',
  description: 'Manage your articles and content'
})

const searchQuery = ref('')
const statusFilter = ref('')
const categoryFilter = ref('')
const currentPage = ref(1)

const statusOptions = [
  { label: 'All Status', value: '' },
  { label: 'Published', value: 'published' },
  { label: 'Draft', value: 'draft' },
  { label: 'Scheduled', value: 'scheduled' },
  { label: 'Archived', value: 'archived' }
]

const categoryOptions = [
  { label: 'All Categories', value: '' },
  { label: 'Technology', value: 'technology' },
  { label: 'Design', value: 'design' },
  { label: 'Writing', value: 'writing' },
  { label: 'Productivity', value: 'productivity' }
]

// Mock articles data
const articles = [
  {
    id: 1,
    title: 'Getting Started with Digital Gardens',
    slug: 'getting-started',
    excerpt: 'Discover the power of digital gardening and how it can transform your knowledge management.',
    category: 'Productivity',
    status: 'published',
    views: 3420,
    created: 'Nov 14, 2025'
  },
  {
    id: 2,
    title: 'Building Modern Web Applications',
    slug: 'modern-web-apps',
    excerpt: 'Learn the latest techniques and tools for creating responsive web applications.',
    category: 'Technology',
    status: 'published',
    views: 2890,
    created: 'Nov 13, 2025'
  },
  {
    id: 3,
    title: 'The Art of Content Creation',
    slug: 'content-creation',
    excerpt: 'Master the skills needed to create compelling content that engages your audience.',
    category: 'Writing',
    status: 'published',
    views: 2150,
    created: 'Nov 12, 2025'
  },
  {
    id: 4,
    title: 'UI Design Principles for 2025',
    slug: 'ui-design-principles',
    excerpt: 'Explore the latest design trends and principles that are shaping modern user interfaces.',
    category: 'Design',
    status: 'draft',
    views: 0,
    created: 'Nov 11, 2025'
  },
  {
    id: 5,
    title: 'Mastering TypeScript',
    slug: 'typescript-mastery',
    excerpt: 'A comprehensive guide to becoming proficient in TypeScript and building type-safe applications.',
    category: 'Technology',
    status: 'published',
    views: 1456,
    created: 'Nov 10, 2025'
  },
  {
    id: 6,
    title: 'Minimalist Design Philosophy',
    slug: 'minimalist-design',
    excerpt: 'Less is more: explore how minimalist design can create powerful user experiences.',
    category: 'Design',
    status: 'scheduled',
    views: 0,
    created: 'Nov 9, 2025'
  }
]

const filteredArticles = computed(() => {
  let filtered = articles

  if (searchQuery.value) {
    filtered = filtered.filter(article =>
      article.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      article.excerpt.toLowerCase().includes(searchQuery.value.toLowerCase())
    )
  }

  if (statusFilter.value) {
    filtered = filtered.filter(article => article.status === statusFilter.value)
  }

  if (categoryFilter.value) {
    filtered = filtered.filter(article => article.category.toLowerCase() === categoryFilter.value.toLowerCase())
  }

  return filtered
})

const getCategoryColor = (category) => {
  const colors = {
    'Technology': 'blue',
    'Design': 'green',
    'Writing': 'purple',
    'Productivity': 'orange'
  }
  return colors[category] || 'gray'
}

const getStatusColor = (status) => {
  const colors = {
    'published': 'green',
    'draft': 'yellow',
    'scheduled': 'blue',
    'archived': 'gray'
  }
  return colors[status] || 'gray'
}

const getActionItems = (articleId) => [
  [{
    label: 'Edit',
    icon: 'i-lucide-edit',
    click: () => navigateTo(`/admin/articles/${articleId}/edit`)
  }],
  [{
    label: 'Duplicate',
    icon: 'i-lucide-copy'
  }],
  [{
    label: 'Delete',
    icon: 'i-lucide-trash',
    click: () => deleteArticle(articleId)
  }]
]

const deleteArticle = (articleId) => {
  // Show confirmation dialog
  if (confirm('Are you sure you want to delete this article?')) {
    // Delete logic here
    console.log('Deleting article:', articleId)
  }
}
</script>