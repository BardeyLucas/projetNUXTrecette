<script setup lang="ts">
definePageMeta({
  middleware: ['auth']
})

function onLogoutClick () {
  const cookie = useCookie('recipe-token')
  cookie.value = null
  navigateTo('/login')
}

const config = useRuntimeConfig()

await useAsyncData('my-recipes', () => {
  const cookie = useCookie('recipe-token')
  return $fetch(`${config.public.apiUrl}/api/recipes/my-recipes`, {
    headers: {
      Authorization: `Bearer ${cookie.value}`
    }
  })
})


</script>

<template>
  <div class="p-dashboard">
    <h1>Dashboard</h1>
    <button @click="onLogoutClick">Logout</button>
    
  </div>
</template>

<style scoped lang="scss">
div {
  background-color: white;
  min-height: 100vh; // s'assure que le fond couvre toute la hauteur de la page
  display: flex;
  align-items: center;
  flex-direction: column;
  padding: 2rem;
}

.text {
  color: black;
}

</style>