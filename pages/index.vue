<script lang="ts" setup>
  // definePageMeta({
  //   middleware: "auth",
  // })
  const { loggedIn, user } = storeToRefs(useAuthStore())
  const { logout } = useAuthStore()
</script>

<template>
  <div class="flex flex-col flex-1 justify-center items-center gap-6">
    <UCard v-if="unref(loggedIn)">
      <div class="flex items-center gap-4">
        <UAvatar
          :src="unref(user)?.avatar"
          :alt="unref(user)?.first_name"
        />
        <div>
          <h1 class="font-bold text-xl">{{ unref(user)?.first_name }}</h1>
          <p class="text-sm">{{ unref(user)?.email }}</p>
        </div>
      </div>
    </UCard>
    <div class="flex gap-4 mb-8">
      <UButton
        v-if="!unref(loggedIn)"
        to="/auth/login"
        >Login</UButton
      >
      <UButton
        v-else
        @click="logout"
        >Logout</UButton
      >
      <UButton
        to="/auth/register"
        color="white"
        >Register</UButton
      >
    </div>
    <h1 class="font-bold text-4xl">Patrick Hennessey Starter</h1>
    <p class="text-lg mt-4">A starter template for Nuxt3 with Directus</p>
  </div>
</template>
