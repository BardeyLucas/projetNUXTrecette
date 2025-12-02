<script setup lang="ts">
const route = useRoute()

const config = useRuntimeConfig()

const { data : recipe, error } = await useAsyncData(`recipe-${route.params.id}`, async () => {
  const { data } = await $fetch<APIReseponse<FullRecipe>>(
    `${config.public.apiUrl}/api/recipes/${route.params.id}`
  )
  return data
})

if (!recipe.value || error.value) {
  throw new Error('Recipe not found')
}

</script>

<template>
  <div>
    <img :src="`/images/${recipe?.image_url}`" >
    <h1>L'article {{ recipe?.title }}</h1>
    <p>{{ recipe?.description }}</p>
    <div class="test__info"><p>{{ recipe?.cuisine_name }}</p><p>{{ recipe?.goal_name }}</p><p>{{ recipe?.diet_name }}</p><p>{{ recipe?.allergy_name }}</p></div>
    <ul>
      <li v-for="(ingredient, index) in recipe?.ingredients" :key="index">
        {{ ingredient.quantity }} {{ ingredient.unit }} {{ ingredient.name }}
      </li>
    </ul>
    <h2>Instructions</h2>
    <p v-for="(instruction, index) in recipe?.instructions" :key="index">{{ instruction.description }}</p>
    <div>{{ recipe }}</div>
  </div>
</template>