<script setup lang="ts">

const config = useRuntimeConfig()

const [{ data: users, error: userError }] =
  await Promise.all([
    useAsyncData('users', async () => {
      const { data } = await $fetch<APIReseponse<Users[]>>(
        `${config.public.apiUrl}/API/users`
      )
      return data
    })
  ])
</script>

<template>
  <div>
    <h1>Index User</h1>
    <div v-if="userError">
      <p>Error loading users: {{ userError.message }}</p>
    </div>
    <div v-else>
      <ul>
        <li v-for="user in users" :key="user.user_id">
          <router-link :to="`/user/${user.user_id}`">{{ user.username }}</router-link>
        </li>
      </ul>
    </div>
  </div>
</template>