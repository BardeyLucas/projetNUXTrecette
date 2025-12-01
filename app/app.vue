<script setup lang="ts">
const config = useRuntimeConfig()
// import { RouterLink } from 'vue-router'
const { data : recipes, error } = await useAsyncData('recipes',async () => {
  const { data } = await $fetch<{ data : [] }> (
    `${config.public.apiUrl}api/recipes`
  )
  return data
})
</script>

<template>
  <NuxtLayout>
    <SiteHeader />
    <main class="page-content">
      <nav class="sectionTemporaire--nav">
        <RouterLink to="/"><MyButton variant="outline">Home</MyButton></RouterLink>
        <RouterLink to="/about"><MyButton variant="outline">About</MyButton></RouterLink>
        <RouterLink to="/button"><MyButton variant="outline">Button</MyButton></RouterLink>
      </nav>
      <NuxtPage />
      <div v-for="(recipe, index) in recipes" :key="index" class="card--test">
        <NuxtLink :to="`/recipe/${recipe.recipe_id}`">
          <h2>{{ recipe.title }}</h2>
          <p>{{ recipe.description }}</p>
        </NuxtLink>
      </div>
      <p>Data des recettes {{ recipes }} {{ error }}</p>
    </main>
  </NuxtLayout>
</template>
