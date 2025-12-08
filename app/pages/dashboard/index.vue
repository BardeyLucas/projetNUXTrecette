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

const [{ data: allRecipes, error: recipeError }] =
  await Promise.all([
    useAsyncData('recipes', async () => {
      const { data } = await $fetch<APIReseponse<FullRecipe[]>>(
        `${config.public.apiUrl}/API/recipes`
      )
      return data
    })
  ])

// champ de recherche (disponible pour le template via v-model="search")
const user = ref('')

// liste filtrée exposée sous le nom `recipes` (le template utilise déjà `recipes`)
const recipes = computed(() => {
  const list = unref(allRecipes) ?? []
  const q = (user.value || '').toLowerCase().trim()
  if (!q) return list
  return list.filter(r =>
    (r.title ?? '').toLowerCase().includes(q) ||
    (r.description ?? '').toLowerCase().includes(q)
  )
})
</script>

<template>
  <div class="p-dashboard">
    <h1>Dashboard</h1>
    <button @click="onLogoutClick">Logout</button>
    <div v-if="recipeError">
      <p class="text">Error loading recipes: {{ recipeError.message }}</p>
    </div>
    <div v-else>
      <h2 class="text">Recipes:</h2>
      <p v-for="recipe in recipes" :key="recipe.recipe_id">
        <span v-if="recipe.user_id">
          {{ recipe }}
        </span>
      </p>
    </div>
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