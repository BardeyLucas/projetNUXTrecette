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
  <div class="usersPage">
    <h1>Index User</h1>
    <div v-if="userError">
      <p>Error loading users: {{ userError.message }}</p>
    </div>
    <div v-else>
      <ul class="usersPage__list">
        <li v-for="user in users" :key="user.user_id" class="usersPage__item">
          <router-link :to="`/user/${user.user_id}`" class="usersPage__link">{{ user.username }}</router-link>
        </li>
      </ul>
    </div>
  </div>
</template>
<style lang="scss">
  .usersPage {
    padding: rem(50);

    &__list {
      padding: 0 rem(20);
    }

    &__link {
      text-decoration: none;
      font-weight: bold;
    }
  }
</style>