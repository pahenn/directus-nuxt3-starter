// directus nuxt 3 plugin based on watching bryant gillespie on 100 apps in 100 hours

import {
  createDirectus,
  authentication,
  rest,
  realtime,
  readMe,
  withOptions,
} from "@directus/sdk"
import type {
  AuthenticationClient,
  RestClient,
  AuthenticationStorage,
  AuthenticationData,
  WebSocketClient,
} from "@directus/sdk"
import { getCookie } from "h3"

export default defineNuxtPlugin(async (nuxtApp) => {
  const runtimeConfig = useRuntimeConfig()
  const directusConfig = runtimeConfig.public.directus

  // We're creating a custom storage class to use the Nuxt so we can use auth on the server and clien
  class CookieStorage {
    get() {
      const cookie = useCookie("directus-auth")
      return cookie.value
    }

    set(value: AuthenticationData) {
      const cookie = useCookie("directus-auth")
      cookie.value = value as any
    }
  }

  const directus = createDirectus(directusConfig.url, {
    globals: {
      fetch: $fetch, // We're using the built-in Nuxt $fetch from ofetch
    },
  })
    .with(
      authentication("json", {
        storage: new CookieStorage() as AuthenticationStorage,
        credentials: "include",
      })
    )
    .with(
      rest({
        onRequest: async (request) => {
          const userToken = await directus.getToken()

          return request
        },
      })
    )
    .with(realtime())

  // SSR Stuff
  // const user = useState("user")
  // const event = useRequestEvent()
  // if (import.meta.server) {
  //   const cookie = getCookie(event!, "directus_session_token")

  //   try {
  //     const response = await directus.request(
  //       withOptions(
  //         readMe({
  //           fields: [`${directusConfig.readMe}`],
  //         }),
  //         {
  //           headers: {
  //             cookie: `directus_session_token=${cookie}`,
  //           },
  //         }
  //       )
  //     )
  //     user.value = response
  //   } catch (error) {
  //     console.error(error)
  //   }
  // }

  nuxtApp.provide("directus", directus)
})
