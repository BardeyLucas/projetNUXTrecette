<script setup lang="ts">
const route = useRoute()

const config = useRuntimeConfig()

const { data : users, error } = await useAsyncData(`user-${route.params.id}`, async () => {
  const { data } = await $fetch<APIReseponse<Users>>(
    `${config.public.apiUrl}/api/users/${route.params.id}`
  )
  return data
})
console.log('users' + users.value +'error' + error.value)
if (!users.value || error.value) {
  throw new Error('User not found')
}
</script>

<template>
  <div>
    <h1>{{ users?.username }}</h1>
  </div>
</template>