<template>
  <div class="min-h-screen bg-white">
    <section class="py-20 px-4">
      <div class="container mx-auto max-w-4xl">
        <h1 class="text-4xl font-bold text-gray-900 mb-8">About Digital Garden</h1>

        <div class="prose prose-lg max-w-none">
          <p class="text-xl text-gray-600 leading-relaxed mb-8">
            Digital Garden is a modern platform designed to help you cultivate and share your knowledge in a beautiful, organized way.
            We believe that everyone's thoughts and ideas deserve a place to grow and flourish.
          </p>

          <div class="bg-gray-50 rounded-lg p-8 my-12">
            <h2 class="text-2xl font-semibold mb-6">Our Mission</h2>
            <p class="text-gray-700 mb-4">
              To provide a simple, elegant, and powerful platform where knowledge can be planted, nurtured, and shared with the world.
              We aim to make content creation accessible to everyone while maintaining the highest standards of design and functionality.
            </p>
          </div>

          <h2 class="text-2xl font-semibold mb-6">What Makes Us Different</h2>

          <div class="grid md:grid-cols-2 gap-8 my-8">
            <div class="bg-blue-50 rounded-lg p-6">
              <Icon name="i-lucide-sprout" class="w-10 h-10 text-blue-500 mb-4" />
              <h3 class="text-xl font-semibold mb-3">Organic Growth</h3>
              <p class="text-gray-700">Like a real garden, your digital knowledge space grows naturally. Start small and expand as your ideas flourish.</p>
            </div>

            <div class="bg-green-50 rounded-lg p-6">
              <Icon name="i-lucide-share-2" class="w-10 h-10 text-green-500 mb-4" />
              <h3 class="text-xl font-semibold mb-3">Easy Sharing</h3>
              <p class="text-gray-700">Share your knowledge effortlessly with friends, colleagues, or the wider community.</p>
            </div>

            <div class="bg-purple-50 rounded-lg p-6">
              <Icon name="i-lucide-palette" class="w-10 h-10 text-purple-500 mb-4" />
              <h3 class="text-xl font-semibold mb-3">Beautiful Design</h3>
              <p class="text-gray-700">Every aspect is crafted with care to provide an elegant and enjoyable writing and reading experience.</p>
            </div>

            <div class="bg-orange-50 rounded-lg p-6">
              <Icon name="i-lucide-zap" class="w-10 h-10 text-orange-500 mb-4" />
              <h3 class="text-xl font-semibold mb-3">Lightning Fast</h3>
              <p class="text-gray-700">Built on cutting-edge technology to ensure your content loads instantly, anywhere in the world.</p>
            </div>
          </div>

          <h2 class="text-2xl font-semibold mb-6">The Story Behind Digital Garden</h2>
          <p class="text-gray-700 mb-6">
            Digital Garden was born from a simple observation: knowledge sharing should be as natural and rewarding as tending to a garden.
            Our founder, frustrated with the complexity of existing content platforms, envisioned a space where ideas could grow organically,
            connections could form naturally, and everyone could participate in cultivating collective intelligence.
          </p>
          <p class="text-gray-700 mb-8">
            Today, we're proud to offer a platform that embodies these principles – simplicity, beauty, and the joy of sharing knowledge with others.
          </p>

          <div class="bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg p-8 my-12 text-center">
            <h2 class="text-2xl font-semibold mb-4">Join Our Community</h2>
            <p class="text-lg mb-6">Be part of a growing community of knowledge cultivators</p>
            <div class="flex justify-center space-x-4">
              <UButton to="/contact" size="lg" variant="white">
                Get Started
              </UButton>
              <UButton to="/articles" size="lg" variant="ghost" class="text-white hover:bg-white/20">
                Explore Content
              </UButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
useSeoMeta({
  title: 'About Digital Garden',
  description: 'Learn about Digital Garden - your platform for cultivating and sharing knowledge in a beautiful, organized way.'
})
</script>