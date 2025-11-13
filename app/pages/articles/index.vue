<template>
  <div class="min-h-screen bg-gray-50">
    <section class="py-16 px-4">
      <div class="container mx-auto max-w-6xl">
        <div class="text-center mb-12">
          <h1 class="text-4xl font-bold text-gray-900 mb-4">Articles</h1>
          <p class="text-xl text-gray-600">Explore our collection of thoughts, insights, and stories</p>
        </div>

        <!-- Search and Filter -->
        <div class="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div class="flex flex-col md:flex-row gap-4">
            <UInput
              v-model="searchQuery"
              placeholder="Search articles..."
              icon="i-lucide-search"
              size="lg"
              class="flex-1"
            />
            <USelect
              v-model="selectedCategory"
              :options="categories"
              placeholder="All Categories"
              size="lg"
              class="md:w-48"
            />
          </div>
        </div>

        <!-- Articles Grid -->
        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <article
            v-for="article in filteredArticles"
            :key="article.id"
            class="bg-white rounded-lg shadow-sm hover:shadow-lg transition-shadow overflow-hidden"
          >
            <div class="aspect-video bg-gradient-to-br from-blue-400 to-purple-500"/>
            <div class="p-6">
              <div class="flex items-center text-sm text-gray-500 mb-3">
                <Icon name="i-lucide-calendar" class="w-4 h-4 mr-1" />
                {{ article.date }}
                <span class="mx-2">•</span>
                <span class="text-blue-600">{{ article.category }}</span>
              </div>
              <h3 class="text-xl font-semibold text-gray-900 mb-3">{{ article.title }}</h3>
              <p class="text-gray-600 mb-4 line-clamp-3">{{ article.excerpt }}</p>
              <div class="flex items-center justify-between">
                <UButton :to="`/articles/${article.slug}`" variant="ghost" class="p-0">
                  Read More
                  <Icon name="i-lucide-arrow-right" class="w-4 h-4 ml-1" />
                </UButton>
                <div class="flex items-center text-sm text-gray-500">
                  <Icon name="i-lucide-clock" class="w-4 h-4 mr-1" />
                  {{ article.readTime }}
                </div>
              </div>
            </div>
          </article>
        </div>

        <!-- No Results -->
        <div v-if="filteredArticles.length === 0" class="text-center py-16">
          <Icon name="i-lucide-search-x" class="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 class="text-xl font-semibold text-gray-700 mb-2">No articles found</h3>
          <p class="text-gray-500">Try adjusting your search or filters</p>
        </div>

        <!-- Pagination -->
        <div v-if="filteredArticles.length > 0" class="flex justify-center mt-12">
          <UPagination
            v-model="currentPage"
            :page-count="9"
            :total="filteredArticles.length"
            show-last
            show-first
          />
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
useSeoMeta({
  title: 'Articles - Digital Garden',
  description: 'Explore our collection of articles on various topics'
})

// Mock data - in a real app, this would come from an API
const searchQuery = ref('')
const selectedCategory = ref('')
const currentPage = ref(1)

const categories = [
  { label: 'All Categories', value: '' },
  { label: 'Technology', value: 'technology' },
  { label: 'Design', value: 'design' },
  { label: 'Writing', value: 'writing' },
  { label: 'Productivity', value: 'productivity' }
]

const articles = [
  {
    id: 1,
    title: 'Getting Started with Digital Gardens',
    slug: 'getting-started',
    excerpt: 'Discover the power of digital gardening and how it can transform your knowledge management practices.',
    date: 'November 14, 2025',
    category: 'Productivity',
    readTime: '5 min read'
  },
  {
    id: 2,
    title: 'Building Modern Web Applications',
    slug: 'modern-web-apps',
    excerpt: 'Learn the latest techniques and tools for creating responsive, performant web applications.',
    date: 'November 13, 2025',
    category: 'Technology',
    readTime: '8 min read'
  },
  {
    id: 3,
    title: 'The Art of Content Creation',
    slug: 'content-creation',
    excerpt: 'Master the skills needed to create compelling content that engages and inspires your audience.',
    date: 'November 12, 2025',
    category: 'Writing',
    readTime: '6 min read'
  },
  {
    id: 4,
    title: 'UI Design Principles for 2025',
    slug: 'ui-design-principles',
    excerpt: 'Explore the latest design trends and principles that are shaping modern user interfaces.',
    date: 'November 11, 2025',
    category: 'Design',
    readTime: '7 min read'
  },
  {
    id: 5,
    title: 'Mastering TypeScript',
    slug: 'typescript-mastery',
    excerpt: 'A comprehensive guide to becoming proficient in TypeScript and building type-safe applications.',
    date: 'November 10, 2025',
    category: 'Technology',
    readTime: '10 min read'
  },
  {
    id: 6,
    title: 'Minimalist Design Philosophy',
    slug: 'minimalist-design',
    excerpt: 'Less is more: explore how minimalist design can create powerful user experiences.',
    date: 'November 9, 2025',
    category: 'Design',
    readTime: '4 min read'
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

  if (selectedCategory.value) {
    filtered = filtered.filter(article => article.category.toLowerCase() === selectedCategory.value.toLowerCase())
  }

  return filtered
})
</script>