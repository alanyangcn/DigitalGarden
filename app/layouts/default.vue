<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col">
    <!-- Navigation Header -->
    <TheHeader />

    <!-- Main Content -->
    <main class="flex-1">
      <slot />
    </main>

    <!-- Footer -->
    <TheFooter />
  </div>
</template>

<script setup>
// 简化的布局逻辑
</script>