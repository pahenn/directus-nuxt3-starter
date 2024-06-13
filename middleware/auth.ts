export default defineNuxtRouteMiddleware(async (to, from) => {
  const { loggedIn } = storeToRefs(useAuthStore())

  if (to.path === "/auth/login") {
    if (unref(loggedIn)) {
      return navigateTo({ path: "/" })
    }
    return
  }

  if (!unref(loggedIn)) {
    return navigateTo({
      path: "/auth/login",
      query: { redirect: to.path },
    })
  }
})
