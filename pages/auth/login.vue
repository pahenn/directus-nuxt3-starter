<script lang="ts" setup>
  definePageMeta({
    middleware: "auth",
  })
  const route = useRoute()
  const redirect = route.query.redirect || "/"

  const { login } = useAuthStore()

  const pending = ref(false)
  const onSubmit = async (data: any) => {
    try {
      pending.value = true
      await login({ ...data, redirect })
    } catch (error) {
      console.error(error)
    } finally {
      pending.value = false
    }
  }
</script>

<template>
  <div class="flex flex-col flex-1 justify-center items-center">
    <UAuthForm
      class="shadow p-8"
      title="Login"
      description="Enter your credentials to access your account."
      align="bottom"
      icon="i-heroicons-user-circle"
      :fields="[
        {
          name: 'email',
          type: 'email',
          label: 'Email',
          placeholder: 'Enter your email',
        },
        {
          name: 'password',
          type: 'password',
          label: 'Password',
          placeholder: 'Enter your password',
        },
      ]"
      @submit="onSubmit({ ...$event, redirect })"
      :loading="pending"
    />
  </div>
</template>
