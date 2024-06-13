<script lang="ts" setup>
  definePageMeta({
    middleware: "auth",
  })
  const { loggedIn, user } = storeToRefs(useAuthStore())
</script>

<template>
  <div>secured page</div>
  <div>
    {{ unref(user) }}
  </div>
</template>
