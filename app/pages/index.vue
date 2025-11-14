<template>
  <div class="bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
    <!-- Hero Section -->
    <section class="relative py-20 px-4 text-center">
      <div class="container mx-auto">
        <h1 class="text-5xl font-bold text-gray-900 dark:text-white mb-6">
          Welcome to Digital Garden
        </h1>
        <p class="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
          A beautiful space to cultivate your thoughts, share your knowledge, and grow your digital presence.
        </p>
        <div class="flex justify-center space-x-4">
          <UButton to="/navigation" size="xl" color="primary">
            网址导航
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
        <h2 class="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">
          Why Choose Digital Garden?
        </h2>
        <div class="grid md:grid-cols-3 gap-8">
          <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <div class="text-blue-500 mb-4">
              <UIcon name="i-heroicons-pencil" class="w-12 h-12" />
            </div>
            <h3 class="text-xl font-semibold mb-2 text-gray-900 dark:text-white">Easy Writing</h3>
            <p class="text-gray-600 dark:text-gray-300">Intuitive interface for creating and managing your content.</p>
          </div>
          <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <div class="text-green-500 mb-4">
              <UIcon name="i-heroicons-users" class="w-12 h-12" />
            </div>
            <h3 class="text-xl font-semibold mb-2 text-gray-900 dark:text-white">Community Driven</h3>
            <p class="text-gray-600 dark:text-gray-300">Connect with readers and build your audience.</p>
          </div>
          <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <div class="text-purple-500 mb-4">
              <UIcon name="i-heroicons-bolt" class="w-12 h-12" />
            </div>
            <h3 class="text-xl font-semibold mb-2 text-gray-900 dark:text-white">Lightning Fast</h3>
            <p class="text-gray-600 dark:text-gray-300">Built on modern web technology for optimal performance.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Recent Articles Preview -->
    <section class="py-16 px-4 bg-white dark:bg-gray-800">
      <div class="container mx-auto">
        <h2 class="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">
          网址导航特色
        </h2>
        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <!-- 特色卡片 -->
          <div class="border border-gray-200 dark:border-gray-700 rounded-lg p-6 hover:shadow-lg transition-shadow bg-white dark:bg-gray-800">
            <div class="text-sm text-gray-500 dark:text-gray-400 mb-2">精选收录</div>
            <h3 class="text-xl font-semibold mb-2 text-gray-900 dark:text-white">高质量网站资源</h3>
            <p class="text-gray-600 dark:text-gray-300 mb-4">我们精心筛选和整理了各类实用网站，涵盖开发工具、设计资源、学习平台等多个领域。</p>
            <UButton to="/navigation" variant="ghost">
              浏览资源 →
            </UButton>
          </div>
          <div class="border border-gray-200 dark:border-gray-700 rounded-lg p-6 hover:shadow-lg transition-shadow bg-white dark:bg-gray-800">
            <div class="text-sm text-gray-500 dark:text-gray-400 mb-2">分类清晰</div>
            <h3 class="text-xl font-semibold mb-2 text-gray-900 dark:text-white">智能分类系统</h3>
            <p class="text-gray-600 dark:text-gray-300 mb-4">按功能和用途分类，支持快速搜索和筛选，帮助您快速找到所需的网站资源。</p>
            <UButton to="/navigation" variant="ghost">
              开始探索 →
            </UButton>
          </div>
          <div class="border border-gray-200 dark:border-gray-700 rounded-lg p-6 hover:shadow-lg transition-shadow bg-white dark:bg-gray-800">
            <div class="text-sm text-gray-500 dark:text-gray-400 mb-2">持续更新</div>
            <h3 class="text-xl font-semibold mb-2 text-gray-900 dark:text-white">动态维护</h3>
            <p class="text-gray-600 dark:text-gray-300 mb-4">我们定期更新和添加新的网站资源，确保您始终能获得最新的实用工具和信息。</p>
            <UButton to="/navigation" variant="ghost">
              立即体验 →
            </UButton>
          </div>
        </div>
        <div class="text-center mt-8">
          <UButton to="/navigation" size="lg" color="primary">
            进入网址导航
          </UButton>
        </div>
      </div>
    </section>
  </div>
</template>
