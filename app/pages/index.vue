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
const recipesPerPage = 12
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
        <div v-for="cuisine in cuisines" :key="cuisine.cuisine_id" class="homePage__aside_filter_item">
          <input 
            v-if="cuisine.name != 'Méditerranéenne'" 
            :id="`cuisine-${cuisine.cuisine_id}`" 
            class="homePage__aside_filter_item_input" 
            type="checkbox" 
            :value="cuisine.name" 
            @input="onCheckboxInput">
          <label v-if="cuisine.name != 'Méditerranéenne'"  class="homePage__aside_filter_item_label" :for="`cuisine-${cuisine.cuisine_id}`">{{ cuisine.name }}</label>
        </div>
      </div>
    </aside>
    <section>
      <p>{{ search }}</p>
      <section class="homePage__grille_recipes">
        <FoodCards v-for="(recipe, index) in paginatedRecipes" :key="index" :recipe="recipe"/>
      </section>
      <p>Page {{ page }} / {{ totalPages }}</p>
      <input v-model="page" type="number" min="1" :max="totalPages" >
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
    &__grille_recipes{
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: rem(20);
      justify-content: center;
      margin-right: rem(100);
      margin-top: rem(50);
    }
    @media (max-width: rem(1375)) {
      &__grille_recipes{
        grid-template-columns: repeat(2, 1fr);
      }
    }
    @media (max-width: rem(950)) {
      &__aside{
        margin: rem(32) rem(50);

        &_title{
          font-size: rem(32);
        }
      }
      &__grille_recipes{
        margin-right: rem(50);
      }
    }
    @media (max-width: rem(700)) {
      &__grille_recipes{
        grid-template-columns: repeat(1, 1fr);
      }
    }
    @media (max-width: rem(550)) {
      &__aside{
        margin: rem(32) rem(20);

        &_title{
          font-size: rem(24);
        }

        &_search{
          width: rem(100);
        }
      }
      &__grille_recipes{
        margin-right: rem(20);
      }
    }
    @media (max-width: rem(450)) {
      &__aside{
        &_title{
          font-size: rem(20);
        }
        &_search{
          width: rem(80);
          font-size: rem(12);
        }
        &_filter {
          font-size: rem(12);
        }
      }
    }
  }
</style>