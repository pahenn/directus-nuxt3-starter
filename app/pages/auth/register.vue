<script lang="ts" setup></script>

<template>
  <div class="flex flex-col flex-1 justify-center items-center">
    <UAuthForm
      title="Register"
      description="Enter your credentials to access your account."
      align="bottom"
      icon="i-heroicons-user-circle"
      :fields="[
        {
          name: 'name',
          type: 'name',
          label: 'Name',
          placeholder: 'Enter your name',
        },
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
    />
  </div>
</template>
