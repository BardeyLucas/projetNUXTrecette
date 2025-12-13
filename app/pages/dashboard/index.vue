<script setup lang="ts">
import { jwtDecode } from 'jwt-decode'

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
  return $fetch(`${config.public.apiUrl}/api/recipes/my-recipes`, {
    headers: {
      Authorization: `Bearer ${cookie.value}`
    }
  })
})

const cookie = useCookie<string | null>('recipe-token')
interface JwtPayload {
  user_id: string
  // ajoute d'autres propriétés si besoin
}

const decoded = ref<JwtPayload | null>(null)

watch(cookie, (newToken) => {
  if (!newToken) {
    decoded.value = null
    return
  }

  try {
    decoded.value = jwtDecode(newToken)
  } catch {
    decoded.value = null
  }
}, { immediate: true })

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

const filters = decoded.value?.user_id ? [decoded.value.user_id] : []

const filteredRecipes = computed(() => {
  if (!recipes.value) return []
  let results = recipes.value
  if (filters && filters.length) {
    const numericFilters = filters.map(f => Number(f))
    results = results.filter(recipe => numericFilters.includes(recipe.user_id))
  }
  return results
})

console.log('Filtered Recipes:', filteredRecipes.value)
</script>

<template>
  <div class="dashboard">
    <h1 class="dashboard__title">Dashboard</h1>
    <div class="dashboard__ButtonContainer">
      <NuxtLink class="dashboard__addRecipeButton" to="/recipe/createRecipe">Ajouter une recette</NuxtLink>
      <button class="dashboard__logoutButton" @click="onLogoutClick">Ce déconnecter</button>
    </div>
    <div v-if="recipeError" class="dashboard__error">
      <p class="dashboard__error_Text">Error loading recipes: {{ recipeError.message }}</p>
    </div>
    <div class="dashboard__recipes">
      <h2 class="dashboard__recipes_Title">Recipes:</h2>
      <section class="dashboard__grille_recipes">
        <FoodCards v-for="recipe in filteredRecipes" :key="recipe.recipe_id" :recipe="recipe" :parameters="true"/>
      </section>
    </div>
  </div>
</template>
<style scoped lang="scss">


.text {
  color: black;
}

.dashboard{
  background-color: white;
  min-height: 100vh; // s'assure que le fond couvre toute la hauteur de la page
  display: flex;
  align-items: center;
  flex-direction: column;
  padding: 2rem;

  &__ButtonContainer{
    display: flex;
    gap: rem(16);
  }

  &__addRecipeButton{
    background-color: #4CAF50;
    color: white;
    border: none;
    border-radius: rem(8);
    padding: rem(8) rem(16);
    font-size: rem(14);
    cursor: pointer;
    text-decoration: none;
  }

  &__logoutButton{
    background-color: #ff4d4d;
    color: white;
    border: none;
    border-radius: rem(8);
    padding: rem(8) rem(16);
    font-size: rem(14);
    cursor: pointer;
  }

  &__grille_recipes{
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: rem(20);
    justify-content: center;
  }
  @media (max-width: rem(700)) {
    &__grille_recipes{
      grid-template-columns: repeat(2, 1fr);
    }
  }
  @media (max-width: rem(500)) {
    &__grille_recipes{
      grid-template-columns: repeat(1, 1fr);
    }
  }
}
</style>