<script setup lang="ts">

const search = ref('')

const config = useRuntimeConfig()
// import { RouterLink } from 'vue-router'
const [{ data: recipes, error: recipeError }, { data: cuisines }] =
  await Promise.all([
    useAsyncData('recipes', async () => {
      const { data } = await $fetch<APIReseponse<Recipe[]>>(
        `${config.public.apiUrl}/API/recipes`
      )
      return data
    }),
    useAsyncData('cuisines', async () => {
      const { data } = await $fetch<APIReseponse<Cuisine[]>>(
        `${config.public.apiUrl}/API/cuisines`
      )
      return data
    })
  ])

function onCheckboxInput ($event: Event) {
  const target = $event.target
  if(!(target instanceof HTMLInputElement)) return
  page.value = 1
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
  let results = recipes.value
  if (filters.value && filters.value.length) {
    results = results.filter(recipe => filters.value.includes(recipe.cuisine_name))
  }
  if (search.value.length) {
    results = results.filter(recipe => recipe.title.toLowerCase().includes(search.value.toLowerCase()))
  }
  return results
})

const page = ref(1)
const recipesPerPage = 2
const totalPages = computed(() => {
  const len = filteredRecipes.value?.length ?? 0
  return Math.max(1, Math.ceil(len / recipesPerPage))
})

// On affiche seulement les deux recettes de la page actuelle
const paginatedRecipes = computed(() => {
  const start = (page.value - 1) * recipesPerPage
  const end = start + recipesPerPage
  return filteredRecipes.value.slice(start, end)
})

if (recipeError && recipeError.value) throw new Error('Failed to fetch recipes')

watch(() => [filters.value, search.value], () => {
  page.value = 1
})

</script>

<template>
  <div class="homePage">
    <aside class="homePage__aside">
      <h2 class="homePage__aside_title">Recherche par Plat</h2>
      <input v-model="search" type="text" placeholder="Search..." class="homePage__aside_search" >
      <h2 class="homePage__aside_title">Filtre par Cuisine</h2>
      <div class="homePage__aside_filter">
        <div class="homePage__aside_filter_item" v-for="cuisine in cuisines" :key="cuisine.cuisine_id">
          <input class="homePage__aside_filter_item_input" :id="`cuisine-${cuisine.cuisine_id}`" type="checkbox" :value="cuisine.name" @input="onCheckboxInput">
          <label class="homePage__aside_filter_item_label" :for="`cuisine-${cuisine.cuisine_id}`">{{ cuisine.name }}</label>
        </div>
      </div>
    </aside>
    <section>
      <p>{{ search }}</p>
      <div v-for="(recipe, index) in paginatedRecipes" :key="index" class="card--test">
        <NuxtLink :to="`/recipe/${recipe.recipe_id}`">
          <img :src="`/images/${recipe.image_url}`" alt="Recipe Image">
          <h2>{{ recipe.title }}</h2>
          <div class="test__info"><p>{{ recipe?.cuisine_name }}</p><p>{{ recipe?.goal_name }}</p></div><div><p>{{ recipe?.diet_name }}</p><p>{{ recipe?.allergy_name }}</p></div>
        </NuxtLink>
      </div>
      <p>Page {{ page }} / {{ totalPages }}</p>
      <input v-model="page" type="number" min="1" :max="totalPages" >
      <p>Data des recettes {{ recipes }} {{ recipeError }}</p>
    </section>
  </div>
</template>
<style lang="scss">
  .homePage{
    display: flex;

    &__aside{
      margin: rem(32) rem(100);

      &_title{
        font-family: Montez;
        font-size: rem(40);
        color: #84BD00;
        line-height: 1;
        margin-bottom: rem(20);
      }

      &_search{
        width: rem(200);
        height: rem(30);
        border: rem(2) solid #84BD00;
        border-radius: rem(8);
        padding: rem(8);
        margin-bottom: rem(32);
      }

      &_filter {
        display: flex;
        flex-direction: column;
        gap: rem(5) rem(20);
        margin-bottom: rem(20);

        &_item_input {
          display: none;
        }

        &_item_input:checked + &_item_label {
          color: #84BD00;
          font-weight: bolder;
        }
      }
    }
  }
</style>