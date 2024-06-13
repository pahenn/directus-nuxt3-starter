export default defineNuxtRouteMiddleware(async (to, from) => {
  const { loggedIn } = storeToRefs(useAuthStore())
  const { refresh } = useAuthStore()

  if (to.path === "/auth/login") {
    if (unref(loggedIn)) {
      return navigateTo({ path: to.query.redirect || "/" })
    }
    return
  }
  if (!unref(loggedIn)) {
    try {
      //TODO: check to see if this actually works to refresh the token and user data
      await refresh()
    } catch (e) {}
  }
  if (!unref(loggedIn)) {
    return navigateTo({
      path: "/auth/login",
      query: { redirect: to.path },
    })
  }
})
