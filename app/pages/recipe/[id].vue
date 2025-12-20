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
  <div class="recipePage">
    <img class="recipePage__image" :src="`/images/${recipe?.image_url}`" >
    <section class="recipePage__content">
      <h1 class="recipePage__content_title">L'article {{ recipe?.title }}</h1>
      <p class="recipePage__content_description">{{ recipe?.description }}</p>
      <div class="recipePage__content_tags"><p class="recipePage__content_tag">{{ recipe?.cuisine_name }}</p><p class="recipePage__content_tag">{{ recipe?.goal_name }}</p><p class="recipePage__content_tag">{{ recipe?.diet_name }}</p><p class="recipePage__content_tag">{{ recipe?.allergy_name }}</p></div>
      <h2 v-if="recipe?.ingredients && recipe.ingredients.length" class="recipePage__content_subtitle">Ingrédients</h2>
      <ul class="recipePage__content_ingredients">
        <li v-for="(ingredient, index) in recipe?.ingredients" :key="index" class="recipePage__content_ingredient">
          {{ ingredient.quantity }} {{ ingredient.unit }} {{ ingredient.name }}
        </li>
      </ul>
      <h2 v-if="recipe?.instructions && recipe.instructions.length" class="recipePage__content_subtitle">Instructions</h2>
      <p v-for="(instruction, index) in recipe?.instructions" :key="index" class="recipePage__content_instruction">{{ instruction.instruction_id }}) {{ instruction.description }}</p>    </section>
  </div>
</template>
<style lang="scss">
  .recipePage {

    &__image {
      width: 100%;
      height: 300px;
      object-fit: cover;
      margin-bottom: rem(20);
    }

    &__content {
      padding: rem(50);
      padding-top: 0;

      &_description{
        margin-bottom: rem(10);
      }

      &_tags {
        display: flex;
        gap: rem(10);
        flex-wrap: wrap;
      }

      &_tag {
        background-color: var(--green);
        color: var(--white);
        padding: rem(4) rem(8);
        border-radius: rem(20);
        font-size: rem(12);
        font-weight: bold;
      }

      &_subtitle {
        margin-top: rem(20);
      }

      &_instruction {
        margin-bottom: rem(8);
      }
    }
    @media (max-width: rem(550)) {
      &__content {
        padding: rem(20);
        font-size: rem(12);

        &_title {
          font-size: rem(24);
        }

        &_tags {
          gap: rem(8);
        }

        &_tag {
          font-size: rem(10);
        }

        &_subtitle {
          font-size: rem(18);
        }
      }
    }
  }
</style>