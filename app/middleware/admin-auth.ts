export default defineNuxtRouteMiddleware((_to) => {
  const { isAuthenticated, isAdmin } = useAuth()

  // Check if user is authenticated and is admin
  if (!isAuthenticated.value || !isAdmin.value) {
    // Redirect to login page or home page
    throw createError({
      statusCode: 401,
      statusMessage: 'Unauthorized access. Admin privileges required.'
    })
  }
})