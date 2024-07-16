import { defineStore } from "pinia"
import { readMe, registerUser } from "@directus/sdk"

export const useAuthStore = defineStore(
  "auth-store",
  () => {
    const runtimeConfig = useRuntimeConfig()
    const directusConfig = runtimeConfig.public.directus

    const { $directus } = useNuxtApp()

    // state: user, loggedIn
    const user = ref({})
    const loggedIn = ref(false)

    // getters: isLoggedIn, userData
    // these may be uneccessary with the composition api and state being reactive

    // actions: login, logout, register, reset
    // reset
    // reset store
    const reset = () => {
      loggedIn.value = false
      user.value = {}
      localStorage.removeItem("auth-store")
      clearNuxtData()
    }

    // login
    // try to log the user in given the email and password
    // if successful, fetch the user data
    // update the auth store with the user data
    // if there's a redirect, send the user there
    // if there's an error, throw an error
    const login = async ({ email, password, redirect }) => {
      try {
        // Try to login
        const response = await $directus.login(email, password)

        // If login was successful, fetch the users data
        await getUser()

        // If there's a redirect, send the user there
        if (redirect) {
          await navigateTo(redirect)
        }
      } catch (e) {
        console.log(e)
        throw new Error("Wrong email address or password")
      }
    }

    // refresh
    // try to refresh client tokem

    const refresh = async () => {
      const token = await $directus.getToken()
      if (!token) {
        return
      }
      try {
        await getUser()
      } catch (e) {
        console.error(e)
      }
    }

    // logout
    // try to logout
    // if logout was successful, reset the auth store
    const logout = async () => {
      const token = await $directus.getToken()
      if (token) {
        try {
          const response = await $directus.logout()
        } catch (e) {
          console.error(e)
        }
      }
      try {
        localStorage.removeItem("directus-auth")
        // If logout was successful, reset the auth store
        reset()
      } catch (e) {
        console.error(e)
      }
    }

    // getUser
    // try to fetch the user data
    // update the auth store with the user data
    const getUser = async () => {
      try {
        // Try to fetch the user data
        const response = await $directus.request(
          readMe({
            fields: [`${directusConfig.readMe}`],
          })
        )

        // Update the auth store with the user data
        loggedIn.value = true
        user.value = response
      } catch (e) {
        console.error(e)
      }
    }

    // register
    // try to register the user
    // if successful, fetch the user data
    // update the auth store with the user data
    // if there's a redirect, send the user there
    // if there's an error, throw an error
    const register = async ({ email, password, redirect }) => {
      try {
        // Try to register
        const response = await $directus.request(registerUser(email, password))

        // If register was successful, fetch the users data
        await getUser()

        // If there's a redirect, send the user there
        if (redirect) {
          await navigateTo(redirect)
        }
      } catch (e) {
        console.log(e)
        throw new Error("Issue registering")
      }
    }

    return {
      user,
      loggedIn,
      reset,
      login,
      logout,
      getUser,
      register,
      refresh,
    }
  },
  {
    persist: {
      storage: persistedState.cookiesWithOptions({
        maxAge: 60 * 60 * 24 * 1, // 1 day
      }),
    },
  }
)
