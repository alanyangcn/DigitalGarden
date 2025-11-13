<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
    <!-- Hero Section -->
    <section class="relative py-20 px-4 text-center">
      <div class="container mx-auto">
        <h1 class="text-5xl font-bold text-gray-900 mb-6">
          Welcome to Digital Garden
        </h1>
        <p class="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          A beautiful space to cultivate your thoughts, share your knowledge, and grow your digital presence.
        </p>
        <div class="flex justify-center space-x-4">
          <UButton to="/articles" size="xl" color="primary">
            Explore Articles
          </UButton>
          <UButton to="/about" size="xl" variant="outline">
            Learn More
          </UButton>
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section class="py-16 px-4">
      <div class="container mx-auto">
        <h2 class="text-3xl font-bold text-center text-gray-900 mb-12">
          Why Choose Digital Garden?
        </h2>
        <div class="grid md:grid-cols-3 gap-8">
          <div class="bg-white rounded-lg shadow-lg p-6">
            <div class="text-blue-500 mb-4">
              <Icon name="i-lucide-pen-tool" class="w-12 h-12" />
            </div>
            <h3 class="text-xl font-semibold mb-2">Easy Writing</h3>
            <p class="text-gray-600">Intuitive interface for creating and managing your content.</p>
          </div>
          <div class="bg-white rounded-lg shadow-lg p-6">
            <div class="text-green-500 mb-4">
              <Icon name="i-lucide-users" class="w-12 h-12" />
            </div>
            <h3 class="text-xl font-semibold mb-2">Community Driven</h3>
            <p class="text-gray-600">Connect with readers and build your audience.</p>
          </div>
          <div class="bg-white rounded-lg shadow-lg p-6">
            <div class="text-purple-500 mb-4">
              <Icon name="i-lucide-zap" class="w-12 h-12" />
            </div>
            <h3 class="text-xl font-semibold mb-2">Lightning Fast</h3>
            <p class="text-gray-600">Built on modern web technology for optimal performance.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Recent Articles Preview -->
    <section class="py-16 px-4 bg-white">
      <div class="container mx-auto">
        <h2 class="text-3xl font-bold text-center text-gray-900 mb-12">
          Recent Articles
        </h2>
        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <!-- Placeholder articles -->
          <div class="border rounded-lg p-6 hover:shadow-lg transition-shadow">
            <div class="text-sm text-gray-500 mb-2">November 14, 2025</div>
            <h3 class="text-xl font-semibold mb-2">Getting Started with Digital Gardens</h3>
            <p class="text-gray-600 mb-4">Discover the power of digital gardening and how it can transform your knowledge management.</p>
            <UButton to="/articles/getting-started" variant="ghost">
              Read More →
            </UButton>
          </div>
          <div class="border rounded-lg p-6 hover:shadow-lg transition-shadow">
            <div class="text-sm text-gray-500 mb-2">November 13, 2025</div>
            <h3 class="text-xl font-semibold mb-2">Building Modern Web Apps</h3>
            <p class="text-gray-600 mb-4">Learn the latest techniques and tools for creating responsive web applications.</p>
            <UButton to="/articles/modern-web-apps" variant="ghost">
              Read More →
            </UButton>
          </div>
          <div class="border rounded-lg p-6 hover:shadow-lg transition-shadow">
            <div class="text-sm text-gray-500 mb-2">November 12, 2025</div>
            <h3 class="text-xl font-semibold mb-2">The Art of Content Creation</h3>
            <p class="text-gray-600 mb-4">Master the skills needed to create compelling content that engages your audience.</p>
            <UButton to="/articles/content-creation" variant="ghost">
              Read More →
            </UButton>
          </div>
        </div>
        <div class="text-center mt-8">
          <UButton to="/articles" size="lg">
            View All Articles
          </UButton>
        </div>
      </div>
    </section>
  </div>
</template>
