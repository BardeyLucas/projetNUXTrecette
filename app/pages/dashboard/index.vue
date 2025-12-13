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

async function onDelete (recipeId: string | number) {
  try {
    await $fetch(`${config.public.apiUrl}/api/recipes/${recipeId}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${useCookie('recipe-token').value}`
      }
    })
    // Rafraîchir la liste après suppression
    await refreshNuxtData('recipes')
  } catch (error) {
    console.error('Error deleting recipe:', error)
  }
}
</script>

<template>
  <div class="dashboard">
    <h1 class="dashboard__title">Dashboard</h1>
    <button class="dashboard__logoutButton" @click="onLogoutClick">Logout</button>
    <div class="dashboard__error" v-if="recipeError">
      <p class="dashboard__error_Text">Error loading recipes: {{ recipeError.message }}</p>
    </div>
    <div class="dashboard__recipes" v-else>
      <h2 class="dashboard__recipes_Title">Recipes:</h2>
      <section class="dashboard__grille_recipes">
        <div v-for="recipe in recipes" :key="recipe.recipe_id" class="dashboard__card">
          <NuxtLink :to="`/recipe/${recipe.recipe_id}`" class="dashboard__card_Link">
            <img :src="`/images/${recipe.image_url}`" class="dashboard__card_Image" alt="Recipe Image">
            <h2 class="dashboard__card_Title">{{ recipe.title }}</h2>
            <div class="dashboard__card_Info"><p class="dashboard__card_CuisineName">{{ recipe?.cuisine_name }}</p><p class="dashboard__card_GoalName">{{ recipe?.goal_name }}</p></div>
            <div class="dashboard__card_Info dashboard__card_Info_Bottom"><p class="dashboard__card_DietName">{{ recipe?.diet_name }}</p><p class="dashboard__card_AllergyName">{{ recipe?.allergy_name }}</p></div>
          </NuxtLink>
          <button class="dashboard__card_Button" @click="onDelete(recipe.recipe_id)">{{ recipe.recipe_id }}</button>
        </div>
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