<script setup lang="ts">
defineProps<{
  recipe: Recipe
  parameters?: boolean
}>()


const config = useRuntimeConfig()

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
  <div class="homePage__card">
    <NuxtLink :to="`/recipe/${recipe.recipe_id}`" class="homePage__card_Link">
      <img :src="`/images/${recipe.image_url}`" class="homePage__card_Image" alt="Recipe Image">
      <h2 class="homePage__card_Title">{{ recipe.title }}</h2>
      <div class="homePage__card_Info"><p v-if="recipe.cuisine_name" class="homePage__card_CuisineName">{{ recipe?.cuisine_name }}</p><p v-if="recipe.goal_name" class="homePage__card_GoalName">{{ recipe?.goal_name }}</p><p v-if="recipe.diet_name" class="homePage__card_DietName">{{ recipe?.diet_name }}</p><p v-if="recipe.allergy_name" class="homePage__card_AllergyName">{{ recipe?.allergy_name }}</p></div>
    </NuxtLink>
    <button v-if="parameters" class="dashboard__card_Button" @click="onDelete(recipe.recipe_id)">{{ recipe.recipe_id }}</button>
  </div>
</template>