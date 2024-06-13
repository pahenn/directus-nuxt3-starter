// import { defineStore } from "pinia"
// import { readMe } from "@directus/sdk"

// interface AuthState {
//   loggedIn: boolean
//   user: object
// }

// export const useAuth = defineStore("auth-old", {
//   state: (): AuthState => ({
//     loggedIn: false,
//     user: {},
//   }),

//   getters: {
//     isLoggedIn: (state) => state.loggedIn,
//     userData: (state) => state.user,
//   },

//   actions: {
//     async login({ email, password, redirect }) {
//       const { $directus } = useNuxtApp()

//       try {
//         // Try to login
//         const response = await $directus.login(email, password)

//         // If login was successful, fetch the users data
//         const user = await $directus.request(readMe(), {
//           fields: ["*"],
//         })

//         // Update the auth store with the user data
//         this.loggedIn = true
//         this.user = user

//         // If there's a redirect, send the user there
//         if (redirect) {
//           router.push(redirect)
//         }
//       } catch (e) {
//         console.log(e)
//         throw new Error("Wrong email address or password")
//       }
//     },
//     async logout() {
//       const router = useRouter()
//       const { $directus } = useNuxtApp()
//       try {
//         // Try to logout
//         const token = $directus.token
//         console.log(token)
//         if (!token) {
//           this.$reset()
//         }
//         const response = await $directus.logout()
//         localStorage.removeItem("directus_session_token")

//         // If logout was successful, reset the auth store
//         this.$reset()

//         // Send the user back to the home page
//         router.push("/")
//       } catch (e) {
//         console.log(e)
//         throw new Error("Issue logging out")
//       }
//     },
//     async getUser() {
//       const { $directus } = useNuxtApp()
//       try {
//         // Try to fetch the user data
//         const user = await $directus.request(readMe(), {
//           fields: ["*"],
//         })

//         // Update the auth store with the user data
//         this.loggedIn = true
//         this.user = user
//       } catch (e) {
//         console.log(e)
//       }
//     },
//     async resetState() {
//       this.$reset()
//     },
//   },
// })
