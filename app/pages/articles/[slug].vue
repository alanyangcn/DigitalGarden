<template>
  <div class="min-h-screen bg-white">
    <article class="py-16 px-4">
      <div class="container mx-auto max-w-4xl">
        <!-- Article Header -->
        <header class="text-center mb-12">
          <div class="flex items-center justify-center text-sm text-gray-500 mb-4">
            <Icon name="i-lucide-calendar" class="w-4 h-4 mr-1" />
            {{ article.date }}
            <span class="mx-2">•</span>
            <span class="text-blue-600">{{ article.category }}</span>
            <span class="mx-2">•</span>
            <Icon name="i-lucide-clock" class="w-4 h-4 mr-1" />
            {{ article.readTime }}
          </div>
          <h1 class="text-4xl font-bold text-gray-900 mb-6">{{ article.title }}</h1>
          <p class="text-xl text-gray-600 leading-relaxed">{{ article.excerpt }}</p>
        </header>

        <!-- Article Image -->
        <div class="mb-12 rounded-lg overflow-hidden">
          <div class="aspect-video bg-gradient-to-br from-blue-400 to-purple-500"/>
        </div>

        <!-- Article Content -->
        <div class="prose prose-lg max-w-none">
          <p class="text-lg text-gray-700 leading-relaxed mb-6">
            {{ article.content }}
          </p>

          <!-- Mock article content sections -->
          <section class="my-12">
            <h2 class="text-2xl font-semibold text-gray-900 mb-6">Understanding the Concept</h2>
            <p class="text-gray-700 leading-relaxed mb-4">
              Digital gardening is more than just a metaphor—it's a philosophy about how we interact with and organize knowledge in the digital age. Unlike traditional blogs where posts are published and then forgotten, digital gardens are living spaces where ideas can grow, evolve, and interconnect over time.
            </p>
            <p class="text-gray-700 leading-relaxed mb-4">
              The concept draws inspiration from actual gardening: you plant seeds (initial thoughts), nurture them as they grow (develop ideas), prune what isn't working (edit and refine), and watch as different plants influence each other (connect related ideas).
            </p>
          </section>

          <section class="my-12">
            <h2 class="text-2xl font-semibold text-gray-900 mb-6">Getting Started</h2>
            <p class="text-gray-700 leading-relaxed mb-4">
              Starting your digital garden doesn't require complex tools or extensive planning. Begin with a simple note-taking system and gradually build up your ecosystem of ideas. The key is consistency and allowing yourself the freedom to experiment.
            </p>
            <ul class="list-disc pl-6 text-gray-700 space-y-2 mb-6">
              <li>Choose a platform that works for you</li>
              <li>Start with one idea or topic</li>
              <li>Make it a daily practice to add something new</li>
              <li>Connect related ideas as you discover them</li>
              <li>Don't be afraid to revise and improve existing content</li>
            </ul>
          </section>

          <section class="my-12">
            <h2 class="text-2xl font-semibold text-gray-900 mb-6">Best Practices</h2>
            <div class="bg-blue-50 border-l-4 border-blue-400 p-6 mb-6">
              <h3 class="font-semibold text-blue-900 mb-2">🌱 Plant Seeds Daily</h3>
              <p class="text-blue-800">Make it a habit to add new ideas regularly, even if they're just rough notes or questions.</p>
            </div>
            <div class="bg-green-50 border-l-4 border-green-400 p-6 mb-6">
              <h3 class="font-semibold text-green-900 mb-2">🔗 Create Connections</h3>
              <p class="text-green-800">Link related ideas together to create a rich network of knowledge.</p>
            </div>
            <div class="bg-purple-50 border-l-4 border-purple-400 p-6 mb-6">
              <h3 class="font-semibold text-purple-900 mb-2">✂️ Prune Regularly</h3>
              <p class="text-purple-800">Review and refine your content to keep it relevant and accurate.</p>
            </div>
          </section>

          <section class="my-12">
            <h2 class="text-2xl font-semibold text-gray-900 mb-6">Conclusion</h2>
            <p class="text-gray-700 leading-relaxed">
              Digital gardening offers a refreshing alternative to traditional content management. By treating your knowledge as a living, growing ecosystem, you create something that evolves with you and continues to provide value over time. Start small, stay consistent, and watch as your digital garden flourishes.
            </p>
          </section>
        </div>

        <!-- Article Footer -->
        <footer class="mt-16 pt-8 border-t border-gray-200">
          <div class="flex flex-col md:flex-row justify-between items-center">
            <div class="mb-4 md:mb-0">
              <p class="text-gray-600">Written by Digital Garden Team</p>
            </div>
            <div class="flex space-x-4">
              <UButton variant="outline" size="sm">
                <Icon name="i-lucide-share-2" class="w-4 h-4 mr-2" />
                Share
              </UButton>
              <UButton variant="outline" size="sm">
                <Icon name="i-lucide-bookmark" class="w-4 h-4 mr-2" />
                Save
              </UButton>
            </div>
          </div>
        </footer>

        <!-- Related Articles -->
        <section class="mt-16 pt-16 border-t border-gray-200">
          <h2 class="text-2xl font-semibold text-gray-900 mb-8">Related Articles</h2>
          <div class="grid md:grid-cols-3 gap-6">
            <div class="border rounded-lg p-4 hover:shadow-lg transition-shadow">
              <h3 class="font-semibold text-gray-900 mb-2">Building Modern Web Apps</h3>
              <p class="text-sm text-gray-600 mb-3">Learn the latest techniques and tools for creating responsive web applications.</p>
              <UButton to="/articles/modern-web-apps" variant="ghost" class="p-0 text-sm">
                Read More →
              </UButton>
            </div>
            <div class="border rounded-lg p-4 hover:shadow-lg transition-shadow">
              <h3 class="font-semibold text-gray-900 mb-2">The Art of Content Creation</h3>
              <p class="text-sm text-gray-600 mb-3">Master the skills needed to create compelling content that engages your audience.</p>
              <UButton to="/articles/content-creation" variant="ghost" class="p-0 text-sm">
                Read More →
              </UButton>
            </div>
            <div class="border rounded-lg p-4 hover:shadow-lg transition-shadow">
              <h3 class="font-semibold text-gray-900 mb-2">Minimalist Design Philosophy</h3>
              <p class="text-sm text-gray-600 mb-3">Explore how minimalist design can create powerful user experiences.</p>
              <UButton to="/articles/minimalist-design" variant="ghost" class="p-0 text-sm">
                Read More →
              </UButton>
            </div>
          </div>
        </section>
      </div>
    </article>
  </div>
</template>

<script setup>
const route = useRoute()
const slug = route.params.slug

// Mock article data - in a real app, this would come from an API
const articles = {
  'getting-started': {
    title: 'Getting Started with Digital Gardens',
    excerpt: 'Discover the power of digital gardening and how it can transform your knowledge management.',
    content: 'Digital gardening represents a fundamental shift in how we think about creating and organizing content online. Unlike traditional blogging, where posts are published with timestamps and then gradually fade into archives, digital gardens treat content as living entities that can be updated, interconnected, and continuously evolved.',
    date: 'November 14, 2025',
    category: 'Productivity',
    readTime: '5 min read'
  },
  'modern-web-apps': {
    title: 'Building Modern Web Applications',
    excerpt: 'Learn the latest techniques and tools for creating responsive web applications.',
    content: 'The web development landscape is constantly evolving, with new frameworks, tools, and best practices emerging regularly. Building modern web applications requires understanding current trends while maintaining a solid foundation in core web technologies.',
    date: 'November 13, 2025',
    category: 'Technology',
    readTime: '8 min read'
  }
}

const article = computed(() => {
  return articles[slug] || articles['getting-started']
})

useSeoMeta({
  title: article.value.title,
  description: article.value.excerpt
})
</script>