export default defineNuxtRouteMiddleware(async (to, from) => {
  const { loggedIn } = storeToRefs(useAuthStore())
  const { refresh, reset: resetAuth } = useAuthStore()

  if (to.path === "/auth/login") {
    if (unref(loggedIn)) {
      return navigateTo({ path: to.query.redirect || "/" })
    }
    return
  }
  if (!unref(loggedIn)) {
    try {
      await refresh()
    } catch (e) {}
  }
  if (!unref(loggedIn)) {
    resetAuth()
    return navigateTo({
      path: "/auth/login",
      query: { redirect: to.path },
    })
  }
})
