<script setup lang="ts">
const config = useRuntimeConfig()
// import { RouterLink } from 'vue-router'
const { data : recipes, error } = await useAsyncData('recipes',async () => {
  const { data } = await $fetch<{ data : [] }> (
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
          <h2>{{ recipe.title }}</h2>
          <p>{{ recipe.description }}</p>
        </NuxtLink>
      </div>
      <p>Data des recettes {{ recipes }} {{ error }}</p>
  </div>
</template>