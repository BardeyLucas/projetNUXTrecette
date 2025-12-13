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
  <div class="dashboard">
    <h1 class="dashboard__title">Dashboard</h1>
    <button class="dashboard__logoutButton" @click="onLogoutClick">Logout</button>
    <div v-if="recipeError" class="dashboard__error">
      <p class="dashboard__error_Text">Error loading recipes: {{ recipeError.message }}</p>
    </div>
    <div class="dashboard__recipes">
      <h2 class="dashboard__recipes_Title">Recipes:</h2>
      <section class="dashboard__grille_recipes">
        <FoodCards v-for="recipe in recipes" :key="recipe.recipe_id" :recipe="recipe" :parameters="true"/>
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

  &__grille_recipes{
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: rem(20);
    justify-content: center;
  }
  &__card {

    &_Link {
      color: black;
      text-decoration: none;
      font-family: montserrat;
    }

    &_Image {
      width: 100%;
      height: auto;
      aspect-ratio: 1 / 1;
      object-fit: cover;
    }

    &_Info {
      display: flex;
      justify-content: space-between;
    }
  }
}
</style>