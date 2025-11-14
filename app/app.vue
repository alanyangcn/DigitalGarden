<template>
  <UApp>
    <NuxtLayout>
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
