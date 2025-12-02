<script setup lang="ts">
const config = useRuntimeConfig()
// import { RouterLink } from 'vue-router'
const { data : recipes, error } = await useAsyncData('recipes',async () => {
  const { data } = await $fetch<APIReseponse<Recipe[]>>(
    `${config.public.apiUrl}/api/recipes`
  )
  return data
})
const { data : cuisines } = await useAsyncData('cuisines',async () => {
  const { data } = await $fetch<APIReseponse<Cuisine[]>>(
    `${config.public.apiUrl}/api/cuisines`
  )
  return data
})

function onCheckboxInput($event: Event) {
    const target = $event.target
    if(!(target instanceof HTMLInputElement)) return
    const value = target.value
    if (!filters.value.includes(value)) {
        filters.value.push(value)
    } else {
        const index = filters.value.findIndex((v => v === value))
        filters.value.splice(index, 1)
    }
}

const filters = ref<Cuisine['name'][]>([])

const filteredRecipes = computed(() => {
  if (!recipes.value) return []
  if (!filters.value.length) return recipes.value
  return recipes.value.filter(recipe => filters.value.includes(recipe.cuisine_name))
})



if (error && error.value) throw new Error('Failed to fetch recipes')
</script>

<template>
  <div>
    <h1>Home</h1>
    <h2>Filter by Cuisine</h2>
    <div class="recipes__filter">
        <div v-for="cuisine in cuisines" :key="cuisine.cuisine_id">
          <label for="">{{ cuisine.name }}</label>
          <input type="checkbox" :value="cuisine.name" @input="onCheckboxInput" />
        </div>
    </div>
    <div v-for="(recipe, index) in filteredRecipes" :key="index" class="card--test">
      <NuxtLink :to="`/recipe/${recipe.recipe_id}`">
        <img :src="`/images/${recipe.image_url}`" alt="Recipe Image">
        <h2>{{ recipe.title }}</h2>
        <div class="test__info"><p>{{ recipe?.cuisine_name }}</p><p>{{ recipe?.goal_name }}</p></div><div><p>{{ recipe?.diet_name }}</p><p>{{ recipe?.allergy_name }}</p></div>
      </NuxtLink>
    </div>
    <p>Data des recettes {{ recipes }} {{ error }}</p>
  </div>
</template>