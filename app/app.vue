<template>
  <UApp>
    <NuxtLayout :name="layoutName">
      <NuxtPage />
    </NuxtLayout>
  </UApp>
</template>

<script setup>
// Initialize authentication state on app startup
const { checkAuth } = useAuth()

onMounted(async () => {
  await checkAuth()
})

// Dynamic layout selection based on route
const route = useRoute()
const layoutName = computed(() => {
  // If current path starts with /admin, use admin layout
  if (route.path.startsWith('/admin')) {
    return 'admin'
  }
  // Otherwise use default layout
  return 'default'
})

// SEO Meta for the entire app
useSeoMeta({
  title: 'Digital Garden',
  description: 'A beautiful space to cultivate your thoughts and share your knowledge.',
  ogTitle: 'Digital Garden',
  ogDescription: 'A beautiful space to cultivate your thoughts and share your knowledge.',
  ogImage: '/og-image.jpg',
  twitterCard: 'summary_large_image',
  twitterTitle: 'Digital Garden',
  twitterDescription: 'A beautiful space to cultivate your thoughts and share your knowledge.'
})
</script>
