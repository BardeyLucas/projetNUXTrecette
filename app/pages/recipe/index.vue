<script setup lang="ts">

const config = useRuntimeConfig()

const [{ data: recipes, error: recipeError }] =
  await Promise.all([
    useAsyncData('recipes', async () => {
      const { data } = await $fetch<APIReseponse<Recipe[]>>(
        `${config.public.apiUrl}/API/recipes`
      )
      return data
    })
  ])
</script>

<template>
  <div class="recipesPage">
    <h1>Index Recipe</h1>
    <div v-if="recipeError">
      <p>Error loading recipes: {{ recipeError.message }}</p>
    </div>
    <div v-else>
      <ul class="recipesPage__list">
        <li v-for="recipe in recipes" :key="recipe.recipe_id" class="recipesPage__item">
          <router-link :to="`/recipe/${recipe.recipe_id}`" class="recipesPage__link">{{ recipe.title }}</router-link>
        </li>
      </ul>
    </div>
  </div>
</template>
<style lang="scss">
  .recipesPage {
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