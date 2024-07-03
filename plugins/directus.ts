// directus nuxt 3 plugin based on watching bryant gillespie on 100 apps in 100 hours

import {
  createDirectus,
  authentication,
  rest,
  realtime,
  readMe,
  withOptions,
} from "@directus/sdk"
import { getCookie } from "h3"

export default defineNuxtPlugin(async (nuxtApp) => {
  const user = useState("user") // TODO: this should refer to the auth store rather than useState
  const event = useRequestEvent()

  const runtimeConfig = useRuntimeConfig()
  const directusConfig = runtimeConfig.public.directus

  const directus = createDirectus(directusConfig.url)
    .with(
      authentication("session", {
        credentials: "include",
      })
    )
    .with(realtime())
    .with(rest({ credentials: "include" }))

  if (import.meta.server) {
    const cookie = getCookie(event!, "directus_session_token")

    try {
      const response = await directus.request(
        withOptions(
          readMe({
            fields: [`${directusConfig.readMe}`],
          }),
          {
            headers: {
              cookie: `directus_session_token=${cookie}`,
            },
          }
        )
      )
      user.value = response
    } catch (error) {
      console.error(error)
    }
  }

  nuxtApp.provide("directus", directus)
})
