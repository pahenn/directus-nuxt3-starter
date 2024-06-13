import { defineStore } from "pinia"
import { readMe, registerUser } from "@directus/sdk"

export const useAuthStore = defineStore(
  "auth",
  () => {
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
    // try to refresh the token
    // if successful, fetch the user data
    // update the auth store with the user data
    // if there's an error, throw an error
    const refresh = async () => {
      try {
        const response = await $directus.refresh()
        await getUser()
      } catch (e) {
        console.error(e)
        throw new Error("Issue refreshing token")
      }
    }

    // logout
    // get the token
    // if there is no token, reset the auth store
    // try to logout
    // if logout was successful, reset the auth store
    const logout = async () => {
      try {
        const token = $directus.getToken()
        if (!token) {
          reset()
        }
        const response = await $directus.logout()
        localStorage.removeItem("directus_session_token")

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
        const token = await $directus.getToken()
        // Try to fetch the user data
        const response = await $directus.request(readMe(), {
          fields: ["*"],
        })

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
      refresh,
      reset,
      login,
      logout,
      getUser,
      register,
    }
  },
  { persist: true }
)
