<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Admin Header -->
    <header class="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div class="px-6 py-4">
        <div class="flex items-center justify-between">
          <div class="flex items-center space-x-4">
            <!-- Logo and Back to Site -->
            <div class="flex items-center space-x-4">
              <NuxtLink to="/admin" class="flex items-center space-x-2">
                <div class="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <Icon name="i-lucide-shield" class="w-5 h-5 text-white" />
                </div>
                <span class="text-xl font-bold text-gray-900">Admin Panel</span>
              </NuxtLink>
              <UButton
                to="/"
                variant="ghost"
                size="sm"
                icon="i-lucide-external-link"
                class="hidden lg:flex"
              >
                View Site
              </UButton>
            </div>
          </div>

          <!-- Right Side Actions -->
          <div class="flex items-center space-x-4">
            <!-- Notifications -->
            <UButton
              variant="ghost"
              size="sm"
              icon="i-lucide-bell"
              class="relative"
            >
              <UBadge
                v-if="unreadNotifications > 0"
                color="red"
                variant="solid"
                class="absolute -top-1 -right-1 w-5 h-5 p-0 flex items-center justify-center text-xs"
              >
                {{ unreadNotifications }}
              </UBadge>
            </UButton>

            <!-- Quick Actions -->
            <UDropdown :items="quickActions">
              <UButton variant="ghost" size="sm" icon="i-lucide-plus-circle">
                Quick Actions
              </UButton>
            </UDropdown>

            <!-- User Menu -->
            <UDropdown :items="userMenuItems">
              <UButton variant="ghost" class="flex items-center space-x-2">
                <div class="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                  A
                </div>
                <span class="hidden md:block">Admin User</span>
                <Icon name="i-lucide-chevron-down" class="w-4 h-4" />
              </UButton>
            </UDropdown>
          </div>
        </div>
      </div>
    </header>

    <div class="flex">
      <!-- Sidebar Navigation -->
      <aside class="w-64 bg-white shadow-sm border-r border-gray-200 h-screen sticky top-0 overflow-y-auto">
        <nav class="p-4">
          <!-- Main Navigation -->
          <div class="space-y-1 mb-6">
            <NuxtLink
              to="/admin"
              class="flex items-center justify-between px-3 py-2 text-sm font-medium rounded-lg transition-colors"
              :class="isCurrentRoute('/admin') ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-700' : 'text-gray-700 hover:bg-gray-50'"
            >
              <div class="flex items-center space-x-3">
                <Icon name="i-lucide-layout-dashboard" class="w-5 h-5" />
                <span>Dashboard</span>
              </div>
              <UBadge v-if="stats.alerts > 0" color="red" variant="soft" size="xs">
                {{ stats.alerts }}
              </UBadge>
            </NuxtLink>

            <NuxtLink
              to="/admin/articles"
              class="flex items-center justify-between px-3 py-2 text-sm font-medium rounded-lg transition-colors"
              :class="isCurrentRoute('/admin/articles') ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-700' : 'text-gray-700 hover:bg-gray-50'"
            >
              <div class="flex items-center space-x-3">
                <Icon name="i-lucide-file-text" class="w-5 h-5" />
                <span>Articles</span>
              </div>
              <UBadge color="gray" variant="soft" size="xs">
                {{ stats.articles }}
              </UBadge>
            </NuxtLink>

            <NuxtLink
              to="/admin/categories"
              class="flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors"
              :class="isCurrentRoute('/admin/categories') ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-700' : 'text-gray-700 hover:bg-gray-50'"
            >
              <div class="flex items-center space-x-3">
                <Icon name="i-lucide-folders" class="w-5 h-5" />
                <span>Categories</span>
              </div>
            </NuxtLink>

            <NuxtLink
              to="/admin/media"
              class="flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors"
              :class="isCurrentRoute('/admin/media') ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-700' : 'text-gray-700 hover:bg-gray-50'"
            >
              <div class="flex items-center space-x-3">
                <Icon name="i-lucide-image" class="w-5 h-5" />
                <span>Media Library</span>
              </div>
            </NuxtLink>

            <NuxtLink
              to="/admin/comments"
              class="flex items-center justify-between px-3 py-2 text-sm font-medium rounded-lg transition-colors"
              :class="isCurrentRoute('/admin/comments') ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-700' : 'text-gray-700 hover:bg-gray-50'"
            >
              <div class="flex items-center space-x-3">
                <Icon name="i-lucide-message-square" class="w-5 h-5" />
                <span>Comments</span>
              </div>
              <UBadge v-if="stats.pendingComments > 0" color="yellow" variant="soft" size="xs">
                {{ stats.pendingComments }}
              </UBadge>
            </NuxtLink>
          </div>

          <!-- User Management -->
          <div class="mb-6">
            <h3 class="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
              User Management
            </h3>
            <div class="space-y-1">
              <NuxtLink
                to="/admin/users"
                class="flex items-center justify-between px-3 py-2 text-sm font-medium rounded-lg transition-colors"
                :class="isCurrentRoute('/admin/users') ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-700' : 'text-gray-700 hover:bg-gray-50'"
              >
                <div class="flex items-center space-x-3">
                  <Icon name="i-lucide-users" class="w-5 h-5" />
                  <span>Users</span>
                </div>
                <UBadge color="gray" variant="soft" size="xs">
                  {{ stats.users }}
                </UBadge>
              </NuxtLink>

              <NuxtLink
                to="/admin/roles"
                class="flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors"
                :class="isCurrentRoute('/admin/roles') ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-700' : 'text-gray-700 hover:bg-gray-50'"
              >
                <div class="flex items-center space-x-3">
                  <Icon name="i-lucide-user-cog" class="w-5 h-5" />
                  <span>Roles</span>
                </div>
              </NuxtLink>
            </div>
          </div>

          <!-- Analytics & Reports -->
          <div class="mb-6">
            <h3 class="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
              Analytics
            </h3>
            <div class="space-y-1">
              <NuxtLink
                to="/admin/analytics"
                class="flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors"
                :class="isCurrentRoute('/admin/analytics') ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-700' : 'text-gray-700 hover:bg-gray-50'"
              >
                <div class="flex items-center space-x-3">
                  <Icon name="i-lucide-bar-chart" class="w-5 h-5" />
                  <span>Analytics</span>
                </div>
              </NuxtLink>

              <NuxtLink
                to="/admin/reports"
                class="flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors"
                :class="isCurrentRoute('/admin/reports') ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-700' : 'text-gray-700 hover:bg-gray-50'"
              >
                <div class="flex items-center space-x-3">
                  <Icon name="i-lucide-file-text" class="w-5 h-5" />
                  <span>Reports</span>
                </div>
              </NuxtLink>
            </div>
          </div>

          <!-- Settings -->
          <div class="mb-6">
            <h3 class="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
              Settings
            </h3>
            <div class="space-y-1">
              <NuxtLink
                to="/admin/settings"
                class="flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors"
                :class="isCurrentRoute('/admin/settings') ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-700' : 'text-gray-700 hover:bg-gray-50'"
              >
                <div class="flex items-center space-x-3">
                  <Icon name="i-lucide-settings" class="w-5 h-5" />
                  <span>General Settings</span>
                </div>
              </NuxtLink>

              <NuxtLink
                to="/admin/seo"
                class="flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors"
                :class="isCurrentRoute('/admin/seo') ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-700' : 'text-gray-700 hover:bg-gray-50'"
              >
                <div class="flex items-center space-x-3">
                  <Icon name="i-lucide-search" class="w-5 h-5" />
                  <span>SEO</span>
                </div>
              </NuxtLink>

              <NuxtLink
                to="/admin/security"
                class="flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors"
                :class="isCurrentRoute('/admin/security') ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-700' : 'text-gray-700 hover:bg-gray-50'"
              >
                <div class="flex items-center space-x-3">
                  <Icon name="i-lucide-shield" class="w-5 h-5" />
                  <span>Security</span>
                </div>
              </NuxtLink>
            </div>
          </div>
        </nav>

        <!-- Back to Site Button -->
        <div class="absolute bottom-0 w-full p-4 border-t border-gray-200 bg-white">
          <NuxtLink
            to="/"
            class="flex items-center justify-center space-x-2 w-full px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
          >
            <Icon name="i-lucide-home" class="w-4 h-4" />
            <span>Back to Site</span>
          </NuxtLink>
        </div>
      </aside>

      <!-- Main Content -->
      <main class="flex-1 overflow-y-auto">
        <slot />
      </main>
    </div>
  </div>
</template>

<script setup>
// Mock stats - in a real app, this would come from an API
const stats = ref({
  articles: 24,
  users: 1234,
  alerts: 3,
  pendingComments: 8
})

const unreadNotifications = ref(5)

// Route helpers
const route = useRoute()

const isCurrentRoute = (path) => {
  if (path === '/admin') {
    return route.path === '/admin'
  }
  return route.path.startsWith(path)
}

// Quick actions dropdown
const quickActions = [
  [{
    label: 'New Article',
    icon: 'i-lucide-file-text',
    click: () => navigateTo('/admin/articles/new')
  }],
  [{
    label: 'Upload Media',
    icon: 'i-lucide-image',
    click: () => navigateTo('/admin/media')
  }],
  [{
    label: 'Add User',
    icon: 'i-lucide-user-plus',
    click: () => navigateTo('/admin/users/new')
  }]
]

// User menu dropdown
const userMenuItems = [
  [{
    label: 'Profile',
    icon: 'i-lucide-user',
    click: () => navigateTo('/admin/profile')
  }],
  [{
    label: 'Settings',
    icon: 'i-lucide-cog',
    click: () => navigateTo('/admin/settings')
  }],
  [{
    label: 'Help',
    icon: 'i-lucide-help-circle'
  }],
  [{
    label: 'Sign out',
    icon: 'i-lucide-sign-out',
    click: () => {
      // Handle logout logic here
      navigateTo('/')
    }
  }]
]
</script>