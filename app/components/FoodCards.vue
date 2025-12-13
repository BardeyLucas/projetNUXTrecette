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
  <div class="card">
    <NuxtLink :to="`/recipe/${recipe.recipe_id}`" class="card__Link">
      <img :src="`/images/${recipe.image_url}`" class="card__Image" alt="Recipe Image">
      <h2 class="card__Title">{{ recipe.title }}</h2>
      <div class="card__Info"><p v-if="recipe.cuisine_name" class="card__CuisineName">{{ recipe?.cuisine_name }}</p><p v-if="recipe.goal_name" class="card__GoalName">{{ recipe?.goal_name }}</p><p v-if="recipe.diet_name" class="card__DietName">{{ recipe?.diet_name }}</p><p v-if="recipe.allergy_name" class="card__AllergyName">{{ recipe?.allergy_name }}</p></div>
    </NuxtLink>
    <button v-if="parameters" class="dashboard__card_Button" @click="onDelete(recipe.recipe_id)">{{ recipe.recipe_id }}</button>
  </div>
</template>
<style lang="scss">
    .card {
      border-radius: rem(20);
      box-shadow: 0 rem(5) rem(5) rgba(0, 0, 0, 0.1);
      overflow: hidden;

      &__Link {
        color: black;
        text-decoration: none;
        font-family: montserrat;
      }

      &__Image {
        width: 100%;
        height: auto;
        aspect-ratio: 1 / 1;
        object-fit: cover;
      }

      &__Title {
        padding: 0 rem(10);
      }

      &__Info {
        display: flex;
        justify-content: left;
        padding: 0 rem(10);
        padding-bottom: rem(10);
        flex-wrap: wrap;
        gap: rem(5);
      }
      &__CuisineName,
      &__GoalName,
      &__DietName,
      &__AllergyName {
        background-color: #84BD00;
        color: white;
        padding: rem(4) rem(8);
        border-radius: rem(8);
        font-size: rem(12);
        font-weight: bold;
      }
      @media (max-width: rem(750)) and (min-width: rem(700)) {
        &__Title {
          font-size: rem(20);
        }
        &__CuisineName,
        &__GoalName,
        &__DietName,
        &__AllergyName {
            padding: rem(4) rem(6);
            border-radius: rem(6);
            font-size: rem(10);
        }
      }
      @media (max-width: rem(450)) {
        &__Title {
          font-size: rem(16) !important;
        }
      }
    }
</style>