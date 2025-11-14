<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900">
    <!-- Header -->
    <header class="bg-white dark:bg-gray-800 shadow-sm border-b">
      <div class="px-6 py-4">
        <div class="flex items-center justify-between">
          <div class="flex items-center space-x-4">
            <UButton to="/admin/articles" variant="ghost" icon="i-lucide-arrow-left" />
            <h1 class="text-2xl font-bold text-gray-900 dark:text-white">Create New Article</h1>
          </div>
          <div class="flex items-center space-x-4">
            <UButton variant="outline">
              Save as Draft
            </UButton>
            <UButton color="primary" @click="publishArticle">
              Publish
            </UButton>
          </div>
        </div>
      </div>
    </header>

    <div class="max-w-4xl mx-auto p-6">
      <form class="space-y-6" @submit.prevent="handleSubmit">
        <!-- Basic Information -->
        <UCard>
          <template #header>
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Basic Information</h3>
          </template>

          <div class="grid gap-6">
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Title</label>
              <UInput
                v-model="article.title"
                placeholder="Enter article title"
                size="lg"
                required
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Slug</label>
              <UInput
                v-model="article.slug"
                placeholder="article-slug"
                prefix="/articles/"
                size="lg"
                required
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Excerpt</label>
              <UTextarea
                v-model="article.excerpt"
                placeholder="Brief description of the article"
                :rows="3"
                required
              />
            </div>

            <div class="grid md:grid-cols-2 gap-6">
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Category</label>
                <USelect
                  v-model="article.category"
                  :options="categoryOptions"
                  placeholder="Select category"
                  required
                />
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Status</label>
                <USelect
                  v-model="article.status"
                  :options="statusOptions"
                  required
                />
              </div>
            </div>

            <div class="grid md:grid-cols-2 gap-6">
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Featured Image</label>
                <div class="flex items-center space-x-4">
                  <div class="w-24 h-24 bg-gray-200 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                    <Icon name="i-lucide-image" class="w-8 h-8 text-gray-400 dark:text-gray-600" />
                  </div>
                  <UButton variant="outline" icon="i-lucide-upload">
                    Upload Image
                  </UButton>
                </div>
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Tags</label>
                <UInput
                  v-model="tagInput"
                  placeholder="Add tags (press Enter)"
                  @keyup.enter="addTag"
                />
                <div class="flex flex-wrap gap-2 mt-2">
                  <UBadge
                    v-for="tag in article.tags"
                    :key="tag"
                    color="blue"
                    variant="soft"
                    class="cursor-pointer"
                    @click="removeTag(tag)"
                  >
                    {{ tag }} ×
                  </UBadge>
                </div>
              </div>
            </div>
          </div>
        </UCard>

        <!-- Content Editor -->
        <UCard>
          <template #header>
            <div class="flex items-center justify-between">
              <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Content</h3>
              <div class="flex items-center space-x-2">
                <UButton variant="ghost" size="sm" icon="i-lucide-bold" />
                <UButton variant="ghost" size="sm" icon="i-lucide-italic" />
                <UButton variant="ghost" size="sm" icon="i-lucide-link" />
                <UButton variant="ghost" size="sm" icon="i-lucide-image" />
                <UButton variant="ghost" size="sm" icon="i-lucide-code" />
              </div>
            </div>
          </template>

          <div class="grid md:grid-cols-2 gap-6">
            <!-- Markdown Editor -->
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Markdown</label>
              <UTextarea
                v-model="article.content"
                placeholder="Write your article content in Markdown..."
                :rows="20"
                class="font-mono"
                required
              />
            </div>

            <!-- Preview -->
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Preview</label>
              <div class="border rounded-lg p-4 h-96 overflow-auto bg-gray-50 dark:bg-gray-900">
                <div v-if="article.content" class="prose prose-sm max-w-none">
                  <p v-if="article.content">{{ article.content }}</p>
                </div>
                <p v-else class="text-gray-500 dark:text-gray-400 italic">Preview will appear here...</p>
              </div>
            </div>
          </div>
        </UCard>

        <!-- SEO Settings -->
        <UCard>
          <template #header>
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white">SEO Settings</h3>
          </template>

          <div class="grid gap-6">
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Meta Title</label>
              <UInput
                v-model="article.seo.title"
                placeholder="SEO title (leave blank to use article title)"
                maxlength="60"
              />
              <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">{{ article.seo.title.length }}/60 characters</p>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Meta Description</label>
              <UTextarea
                v-model="article.seo.description"
                placeholder="SEO description (leave blank to use article excerpt)"
                :rows="3"
                maxlength="160"
              />
              <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">{{ article.seo.description.length }}/160 characters</p>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Focus Keyword</label>
              <UInput
                v-model="article.seo.keyword"
                placeholder="Main keyword for SEO"
              />
            </div>
          </div>
        </UCard>

        <!-- Publish Settings -->
        <UCard>
          <template #header>
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Publish Settings</h3>
          </template>

          <div class="grid gap-6">
            <div class="flex items-center space-x-4">
              <UCheckbox v-model="article.isFeatured" />
              <label class="text-sm font-medium text-gray-700 dark:text-gray-300">Featured Article</label>
            </div>

            <div class="flex items-center space-x-4">
              <UCheckbox v-model="article.allowComments" />
              <label class="text-sm font-medium text-gray-700 dark:text-gray-300">Allow Comments</label>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Publish Date</label>
              <UInput
                v-model="article.publishDate"
                type="datetime-local"
              />
            </div>
          </div>
        </UCard>
      </form>
    </div>
  </div>
</template>

<script setup>
useSeoMeta({
  title: 'Create Article - Digital Garden',
  description: 'Create a new article for your Digital Garden'
})

const _route = useRoute()
const router = useRouter()

const tagInput = ref('')

const article = ref({
  title: '',
  slug: '',
  excerpt: '',
  content: '',
  category: '',
  status: 'draft',
  tags: [],
  isFeatured: false,
  allowComments: true,
  publishDate: new Date().toISOString().slice(0, 16),
  seo: {
    title: '',
    description: '',
    keyword: ''
  }
})

const categoryOptions = [
  { label: 'Technology', value: 'technology' },
  { label: 'Design', value: 'design' },
  { label: 'Writing', value: 'writing' },
  { label: 'Productivity', value: 'productivity' }
]

const statusOptions = [
  { label: 'Draft', value: 'draft' },
  { label: 'Published', value: 'published' },
  { label: 'Scheduled', value: 'scheduled' }
]

// Auto-generate slug from title
watchEffect(() => {
  if (article.value.title && !article.value.slug) {
    article.value.slug = article.value.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '')
  }
})

// Auto-generate SEO title from article title
watchEffect(() => {
  if (article.value.title && !article.value.seo.title) {
    article.value.seo.title = article.value.title
  }
})

// Auto-generate SEO description from excerpt
watchEffect(() => {
  if (article.value.excerpt && !article.value.seo.description) {
    article.value.seo.description = article.value.excerpt
  }
})

const addTag = () => {
  if (tagInput.value.trim() && !article.value.tags.includes(tagInput.value.trim())) {
    article.value.tags.push(tagInput.value.trim())
    tagInput.value = ''
  }
}

const removeTag = (tag) => {
  article.value.tags = article.value.tags.filter(t => t !== tag)
}

const publishArticle = () => {
  article.value.status = 'published'
  handleSubmit()
}

const handleSubmit = async () => {
  try {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))

    // Show success message
    useToast().add({
      title: 'Article Created!',
      description: `Article "${article.value.title}" has been ${article.value.status === 'published' ? 'published' : 'saved as draft'}.`,
      color: 'green'
    })

    // Redirect to articles list
    router.push('/admin/articles')
  } catch {
    useToast().add({
      title: 'Error',
      description: 'Failed to create article. Please try again.',
      color: 'red'
    })
  }
}
</script>