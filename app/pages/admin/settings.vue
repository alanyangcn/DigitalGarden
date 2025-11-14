<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900">
    <!-- Header -->
    <header class="bg-white dark:bg-gray-800 shadow-sm border-b">
      <div class="px-6 py-4">
        <div class="flex items-center justify-between">
          <div class="flex items-center space-x-4">
            <UButton to="/admin" variant="ghost" icon="i-lucide-arrow-left" />
            <h1 class="text-2xl font-bold text-gray-900 dark:text-white">Settings</h1>
          </div>
          <UButton color="primary" @click="saveSettings">
            Save Changes
          </UButton>
        </div>
      </div>
    </header>

    <div class="max-w-4xl mx-auto p-6">
      <!-- General Settings -->
      <UCard class="mb-6">
        <template #header>
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white">General Settings</h3>
        </template>

        <div class="grid gap-6">
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Site Title</label>
            <UInput
              v-model="settings.siteTitle"
              placeholder="Digital Garden"
              size="lg"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Site Description</label>
            <UTextarea
              v-model="settings.siteDescription"
              placeholder="A beautiful space to cultivate your thoughts and share your knowledge."
              :rows="3"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Site URL</label>
            <UInput
              v-model="settings.siteUrl"
              placeholder="https://digitalgarden.com"
              size="lg"
            />
          </div>

          <div class="grid md:grid-cols-2 gap-6">
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Admin Email</label>
              <UInput
                v-model="settings.adminEmail"
                type="email"
                placeholder="admin@digitalgarden.com"
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Timezone</label>
              <USelect
                v-model="settings.timezone"
                :options="timezoneOptions"
                placeholder="Select timezone"
              />
            </div>
          </div>
        </div>
      </UCard>

      <!-- Appearance Settings -->
      <UCard class="mb-6">
        <template #header>
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Appearance</h3>
        </template>

        <div class="grid gap-6">
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Logo</label>
            <div class="flex items-center space-x-4">
              <div class="w-16 h-16 bg-gray-200 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                <Icon name="i-lucide-image" class="w-8 h-8 text-gray-400 dark:text-gray-600" />
              </div>
              <UButton variant="outline" icon="i-lucide-upload">
                Upload Logo
              </UButton>
            </div>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Favicon</label>
            <div class="flex items-center space-x-4">
              <div class="w-12 h-12 bg-gray-200 dark:bg-gray-700 rounded flex items-center justify-center">
                <Icon name="i-lucide-star" class="w-6 h-6 text-gray-400 dark:text-gray-600" />
              </div>
              <UButton variant="outline" size="sm" icon="i-lucide-upload">
                Upload Favicon
              </UButton>
            </div>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Theme Color</label>
            <div class="flex items-center space-x-4">
              <div class="flex space-x-2">
                <button
                  v-for="color in themeColors"
                  :key="color.name"
                  :class="[
                    `w-8 h-8 rounded-full bg-${color.value}-500`,
                    { 'ring-2 ring-offset-2 ring-blue-500': settings.themeColor === color.value }
                  ]"
                  @click="settings.themeColor = color.value"
                />
              </div>
              <UInput
                v-model="settings.themeColor"
                placeholder="blue"
                class="w-32"
              />
            </div>
          </div>

          <div class="grid md:grid-cols-2 gap-6">
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Theme Mode</label>
              <USelect
                v-model="settings.themeMode"
                :options="themeModeOptions"
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Font Family</label>
              <USelect
                v-model="settings.fontFamily"
                :options="fontFamilyOptions"
              />
            </div>
          </div>
        </div>
      </UCard>

      <!-- Blog Settings -->
      <UCard class="mb-6">
        <template #header>
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Blog Settings</h3>
        </template>

        <div class="grid gap-6">
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Posts per Page</label>
            <UInput
              v-model="settings.postsPerPage"
              type="number"
              min="1"
              max="50"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Default Category</label>
            <USelect
              v-model="settings.defaultCategory"
              :options="categoryOptions"
            />
          </div>

          <div class="space-y-4">
            <div class="flex items-center space-x-4">
              <UCheckbox v-model="settings.enableComments" />
              <label class="text-sm font-medium text-gray-700 dark:text-gray-300">Enable Comments</label>
            </div>

            <div class="flex items-center space-x-4">
              <UCheckbox v-model="settings.moderateComments" />
              <label class="text-sm font-medium text-gray-700 dark:text-gray-300">Moderate Comments</label>
            </div>

            <div class="flex items-center space-x-4">
              <UCheckbox v-model="settings.enableRSS" />
              <label class="text-sm font-medium text-gray-700 dark:text-gray-300">Enable RSS Feed</label>
            </div>

            <div class="flex items-center space-x-4">
              <UCheckbox v-model="settings.showAuthor" />
              <label class="text-sm font-medium text-gray-700 dark:text-gray-300">Show Author Information</label>
            </div>

            <div class="flex items-center space-x-4">
              <UCheckbox v-model="settings.showReadingTime" />
              <label class="text-sm font-medium text-gray-700 dark:text-gray-300">Show Reading Time</label>
            </div>
          </div>
        </div>
      </UCard>

      <!-- SEO Settings -->
      <UCard class="mb-6">
        <template #header>
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white">SEO Settings</h3>
        </template>

        <div class="grid gap-6">
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Meta Title Template</label>
            <UInput
              v-model="settings.metaTitleTemplate"
              placeholder="%title% - Digital Garden"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Meta Description Template</label>
            <UTextarea
              v-model="settings.metaDescriptionTemplate"
              placeholder="%description%"
              :rows="2"
            />
          </div>

          <div class="space-y-4">
            <div class="flex items-center space-x-4">
              <UCheckbox v-model="settings.enableSitemap" />
              <label class="text-sm font-medium text-gray-700 dark:text-gray-300">Generate XML Sitemap</label>
            </div>

            <div class="flex items-center space-x-4">
              <UCheckbox v-model="settings.enableRobots" />
              <label class="text-sm font-medium text-gray-700 dark:text-gray-300">Generate robots.txt</label>
            </div>

            <div class="flex items-center space-x-4">
              <UCheckbox v-model="settings.enableStructuredData" />
              <label class="text-sm font-medium text-gray-700 dark:text-gray-300">Enable Structured Data</label>
            </div>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Google Analytics</label>
            <UInput
              v-model="settings.googleAnalytics"
              placeholder="G-XXXXXXXXXX"
            />
          </div>
        </div>
      </UCard>

      <!-- Social Media Settings -->
      <UCard>
        <template #header>
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Social Media</h3>
        </template>

        <div class="grid gap-6">
          <div class="grid md:grid-cols-2 gap-6">
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Twitter URL</label>
              <UInput
                v-model="social.twitter"
                placeholder="https://twitter.com/digitalgarden"
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Facebook URL</label>
              <UInput
                v-model="social.facebook"
                placeholder="https://facebook.com/digitalgarden"
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">LinkedIn URL</label>
              <UInput
                v-model="social.linkedin"
                placeholder="https://linkedin.com/company/digitalgarden"
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">GitHub URL</label>
              <UInput
                v-model="social.github"
                placeholder="https://github.com/digitalgarden"
              />
            </div>
          </div>
        </div>
      </UCard>
    </div>
  </div>
</template>

<script setup>
useSeoMeta({
  title: 'Settings - Digital Garden',
  description: 'Manage your Digital Garden settings'
})

const settings = ref({
  siteTitle: 'Digital Garden',
  siteDescription: 'A beautiful space to cultivate your thoughts and share your knowledge.',
  siteUrl: 'https://digitalgarden.com',
  adminEmail: 'admin@digitalgarden.com',
  timezone: 'UTC',
  themeColor: 'blue',
  themeMode: 'light',
  fontFamily: 'Inter',
  postsPerPage: 10,
  defaultCategory: 'technology',
  enableComments: true,
  moderateComments: true,
  enableRSS: true,
  showAuthor: true,
  showReadingTime: true,
  metaTitleTemplate: '%title% - Digital Garden',
  metaDescriptionTemplate: '%description%',
  enableSitemap: true,
  enableRobots: true,
  enableStructuredData: true,
  googleAnalytics: ''
})

const social = ref({
  twitter: '',
  facebook: '',
  linkedin: '',
  github: ''
})

const timezoneOptions = [
  { label: 'UTC', value: 'UTC' },
  { label: 'America/New_York', value: 'America/New_York' },
  { label: 'America/Los_Angeles', value: 'America/Los_Angeles' },
  { label: 'Europe/London', value: 'Europe/London' },
  { label: 'Asia/Tokyo', value: 'Asia/Tokyo' }
]

const themeColors = [
  { name: 'Blue', value: 'blue' },
  { name: 'Green', value: 'green' },
  { name: 'Purple', value: 'purple' },
  { name: 'Red', value: 'red' },
  { name: 'Orange', value: 'orange' },
  { name: 'Pink', value: 'pink' }
]

const themeModeOptions = [
  { label: 'Light', value: 'light' },
  { label: 'Dark', value: 'dark' },
  { label: 'Auto', value: 'auto' }
]

const fontFamilyOptions = [
  { label: 'Inter', value: 'Inter' },
  { label: 'Roboto', value: 'Roboto' },
  { label: 'Open Sans', value: 'Open Sans' },
  { label: 'Lato', value: 'Lato' },
  { label: 'Montserrat', value: 'Montserrat' }
]

const categoryOptions = [
  { label: 'Technology', value: 'technology' },
  { label: 'Design', value: 'design' },
  { label: 'Writing', value: 'writing' },
  { label: 'Productivity', value: 'productivity' }
]

const saveSettings = async () => {
  try {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))

    // Show success message
    useToast().add({
      title: 'Settings Saved!',
      description: 'Your settings have been updated successfully.',
      color: 'green'
    })
  } catch {
    useToast().add({
      title: 'Error',
      description: 'Failed to save settings. Please try again.',
      color: 'red'
    })
  }
}
</script>