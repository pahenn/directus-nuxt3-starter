<script lang="ts" setup>
  const { refresh } = useAuthStore()

  await refresh()
</script>

<template>
  <div></div>
</template>
