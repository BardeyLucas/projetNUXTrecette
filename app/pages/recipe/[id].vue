<script setup lang="ts">
const route = useRoute()

const config = useRuntimeConfig()

const { data : recipe, error } = await useAsyncData(`recipe-${route.params.id}`, async () => {
  const { data } = await $fetch<{ data : Recipe }>(
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
    <h1>L'article {{ recipe?.title }}</h1>
  </div>
</template>