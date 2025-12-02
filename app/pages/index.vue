<script setup lang="ts">
const config = useRuntimeConfig()
// import { RouterLink } from 'vue-router'
const { data : recipes, error } = await useAsyncData('recipes',async () => {
  const { data } = await $fetch<APIReseponse<Recipe[]>>(
    `${config.public.apiUrl}/api/recipes`
  )
  return data
})
</script>

<template>
  <div>
    <h1>Home</h1>
    <div v-for="(recipe, index) in recipes" :key="index" class="card--test">
        <NuxtLink :to="`/recipe/${recipe.recipe_id}`">
        <img :src="`/images/${recipe.image_url}`" alt="Recipe Image">
        <h2>{{ recipe.title }}</h2>
        <div class="test__info"><p>{{ recipe?.cuisine_name }}</p><p>{{ recipe?.goal_name }}</p></div><div><p>{{ recipe?.diet_name }}</p><p>{{ recipe?.allergy_name }}</p></div>
        </NuxtLink>
      </div>
      <p>Data des recettes {{ recipes }} {{ error }}</p>
  </div>
</template>