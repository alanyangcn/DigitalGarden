<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
    <section class="py-20 px-4">
      <div class="container mx-auto max-w-6xl">
        <div class="text-center mb-16">
          <h1 class="text-4xl font-bold text-gray-900 mb-4">Get in Touch</h1>
          <p class="text-xl text-gray-600">We'd love to hear from you. Send us a message and we'll respond as soon as possible.</p>
        </div>

        <div class="grid lg:grid-cols-2 gap-12">
          <!-- Contact Form -->
          <div class="bg-white rounded-lg shadow-lg p-8">
            <h2 class="text-2xl font-semibold mb-6">Send us a Message</h2>
            <form class="space-y-6" @submit.prevent="handleSubmit">
              <div>
                <UInput
                  v-model="form.name"
                  placeholder="Your Name"
                  size="lg"
                  required
                />
              </div>
              <div>
                <UInput
                  v-model="form.email"
                  type="email"
                  placeholder="Your Email"
                  size="lg"
                  required
                />
              </div>
              <div>
                <USelect
                  v-model="form.subject"
                  placeholder="Select a topic"
                  :options="subjectOptions"
                  size="lg"
                  required
                />
              </div>
              <div>
                <UTextarea
                  v-model="form.message"
                  placeholder="Your Message"
                  :rows="6"
                  size="lg"
                  required
                />
              </div>
              <UButton
                type="submit"
                size="lg"
                class="w-full"
                :loading="isSubmitting"
              >
                Send Message
              </UButton>
            </form>
          </div>

          <!-- Contact Information -->
          <div class="space-y-8">
            <div class="bg-white rounded-lg shadow-lg p-8">
              <h2 class="text-2xl font-semibold mb-6">Contact Information</h2>
              <div class="space-y-6">
                <div class="flex items-start">
                  <div class="bg-blue-100 rounded-lg p-3 mr-4">
                    <Icon name="i-lucide-mail" class="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 class="font-semibold text-gray-900 mb-1">Email</h3>
                    <p class="text-gray-600">hello@digitalgarden.com</p>
                  </div>
                </div>

                <div class="flex items-start">
                  <div class="bg-green-100 rounded-lg p-3 mr-4">
                    <Icon name="i-lucide-message-circle" class="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h3 class="font-semibold text-gray-900 mb-1">Live Chat</h3>
                    <p class="text-gray-600">Available Monday - Friday, 9am - 5pm EST</p>
                  </div>
                </div>

                <div class="flex items-start">
                  <div class="bg-purple-100 rounded-lg p-3 mr-4">
                    <Icon name="i-lucide-map-pin" class="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <h3 class="font-semibold text-gray-900 mb-1">Office</h3>
                    <p class="text-gray-600">123 Garden Street<br>Digital City, DC 12345</p>
                  </div>
                </div>
              </div>
            </div>

            <!-- Social Links -->
            <div class="bg-white rounded-lg shadow-lg p-8">
              <h2 class="text-2xl font-semibold mb-6">Follow Us</h2>
              <div class="grid grid-cols-2 gap-4">
                <UButton variant="outline" class="justify-center">
                  <Icon name="i-simple-icons-twitter" class="w-5 h-5 mr-2" />
                  Twitter
                </UButton>
                <UButton variant="outline" class="justify-center">
                  <Icon name="i-simple-icons-github" class="w-5 h-5 mr-2" />
                  GitHub
                </UButton>
                <UButton variant="outline" class="justify-center">
                  <Icon name="i-simple-icons-linkedin" class="w-5 h-5 mr-2" />
                  LinkedIn
                </UButton>
                <UButton variant="outline" class="justify-center">
                  <Icon name="i-simple-icons-youtube" class="w-5 h-5 mr-2" />
                  YouTube
                </UButton>
              </div>
            </div>
          </div>
        </div>

        <!-- FAQ Section -->
        <div class="mt-20">
          <h2 class="text-3xl font-bold text-center text-gray-900 mb-12">Frequently Asked Questions</h2>
          <div class="grid md:grid-cols-2 gap-6">
            <UCard>
              <template #header>
                <h3 class="font-semibold text-gray-900">How do I get started?</h3>
              </template>
              <p class="text-gray-600">Simply sign up for an account and start creating your first digital garden. Our onboarding process will guide you through the basics.</p>
            </UCard>

            <UCard>
              <template #header>
                <h3 class="font-semibold text-gray-900">Is there a free plan?</h3>
              </template>
              <p class="text-gray-600">Yes! We offer a generous free plan that's perfect for personal use and small projects.</p>
            </UCard>

            <UCard>
              <template #header>
                <h3 class="font-semibold text-gray-900">Can I export my content?</h3>
              </template>
              <p class="text-gray-600">Absolutely. You own your content and can export it at any time in various formats including Markdown and JSON.</p>
            </UCard>

            <UCard>
              <template #header>
                <h3 class="font-semibold text-gray-900">Do you offer support?</h3>
              </template>
              <p class="text-gray-600">We provide email support for all users and priority support for premium customers.</p>
            </UCard>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
useSeoMeta({
  title: 'Contact - Digital Garden',
  description: 'Get in touch with the Digital Garden team'
})

const isSubmitting = ref(false)
const form = ref({
  name: '',
  email: '',
  subject: '',
  message: ''
})

const subjectOptions = [
  'General Inquiry',
  'Technical Support',
  'Feature Request',
  'Partnership',
  'Other'
]

const handleSubmit = async () => {
  isSubmitting.value = true

  try {
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000))

    // Show success message
    useToast().add({
      title: 'Message Sent!',
      description: 'We\'ll get back to you within 24 hours.',
      color: 'green'
    })

    // Reset form
    form.value = {
      name: '',
      email: '',
      subject: '',
      message: ''
    }
  } catch {
    useToast().add({
      title: 'Error',
      description: 'Something went wrong. Please try again.',
      color: 'red'
    })
  } finally {
    isSubmitting.value = false
  }
}
</script>