<script setup lang="ts">
const payload = ref({
  title: '',
  description: '',
  image_url: '',
  cuisine_id: '',
  goal_id: '',
  DietaryInformation_id: '',
  AllergiesInformation_id: ''
})

const config = useRuntimeConfig()

async function onSubmit () {
  if (!payload.value.title || !payload.value.description || !payload.value.cuisine_id) return
    
  try {
    await fetch(`${config.public.apiUrl}/API/recipes`, {
      method: 'POST',
      headers: { 
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${useCookie('recipe-token').value}`
      },
      body: JSON.stringify(payload.value)
    })
  } catch (error) {
    console.error('Error creating recipe:', error)
  }
}

</script>

<template>
  <div class="createRecipe">
    <h1 class="createRecipe__title">Ajoute ta recette</h1>
    <form class="createRecipe__form" @submit.prevent="onSubmit">
      <div class="createRecipe__form_group">
        <label for="title">Title</label>
        <input id="title" v-model="payload.title" class="createRecipe__form_input">
      </div>
      <div class="createRecipe__form_group">
        <label for="description">Description</label>
        <input id="description" v-model="payload.description" class="createRecipe__form_input">
      </div>
      <div class="createRecipe__form_group">
        <label for="image_url">Image URL</label>
        <input id="image_url" v-model="payload.image_url" class="createRecipe__form_input">
      </div>
      <div class="createRecipe__form_group">
        <label for="cuisine_id">Cuisine</label>
        <select id="cuisine_id" v-model="payload.cuisine_id" class="createRecipe__form_input">
          <option value="" disabled>Select Cuisine</option>
          <option value="8">Américaine</option>
          <option value="1">Asiatique</option>
          <option value="3">Chinoise</option>
          <option value="4">Française</option>
          <option value="6">Indienne</option>
          <option value="2">Italienne</option>
          <option value="10">Japonaise</option>
          <option value="5">Mexicaine</option>
          <option value="7">Méditerranéenne</option>
          <option value="9">Thaïlandaise</option>
        </select>
      </div>
      <div class="createRecipe__form_group">
        <label for="goal_id">Goal</label>
        <select id="goal_id" v-model="payload.goal_id" class="createRecipe__form_input">
          <option value="" disabled>Select Goal</option>
          <option value="1">Perte de poids</option>
          <option value="2">Riche en protéines</option>
          <option value="3">Riche en nutriments</option>
          <option value="4">Faible en calories</option>
          <option value="5">Rapide et facile</option>
          <option value="6">Adapté aux familles</option>
          <option value="7">Économique</option>
          <option value="8">Occasions spéciales</option>
        </select>
      </div>
      <div class="createRecipe__form_group">
        <label for="DietaryInformation_id">Diet</label>
        <select id="DietaryInformation_id" v-model="payload.DietaryInformation_id" class="createRecipe__form_input">
          <option value="" disabled>Select Diet</option>
          <option value="1">Snas produits laitiers</option>
          <option value="2">Sans oeufs</option>
          <option value="3">Sans sucre</option>
          <option value="4">Sans gluten</option>
          <option value="5">Végétarien</option>
          <option value="6">Végétalien</option>
          <option value="7">Paléo</option>
          <option value="8">Cétogène</option>
          <option value="9">Faible en glucides</option>
          <option value="10">Faible en matières grasses</option>
        </select>
      </div>
      <div class="createRecipe__form_group">
        <label for="AllergiesInformation_id">Allergy</label>
        <select id="AllergiesInformation_id" v-model="payload.AllergiesInformation_id" class="createRecipe__form_input">
          <option value="" disabled>Select Allergy</option>
          <option value="1">Gluten</option>
          <option value="2">Produit laitiers</option>
          <option value="3">Noix</option>
          <option value="4">Fruits de mer</option>
          <option value="5">Soja</option>
          <option value="6">Oeufs</option>
          <option value="7">Blé</option>
        </select>
      </div>
      <button class="createRecipe__form_button" type="submit">Create Recipe</button>
    </form>
  </div>
</template>
<style lang="scss">
  .createRecipe{
    margin-top: rem(50);
    display: flex;
    flex-direction: column;
    align-items: center;

    &__form{
      display: flex;
      flex-direction: column;
      gap: rem(10);
      align-items: center;
      width: 100%;
      max-width: rem(500);
      padding-left: rem(50);
      padding-right: rem(50);

      &_group{
        display: flex;
        flex-direction: column;
        gap: rem(2);
        width: 100%;
      }

      &_input{
        padding: rem(8);
        border: rem(2) solid var(--green);
        border-radius: rem(8);
        width: 100%;
      }

      &_button{
        background-color: var(--green);
        color: var(--white);
        border: none;
        border-radius: rem(8);
        padding: rem(10);
        font-size: rem(16);
        cursor: pointer;
        margin-top: rem(20);
        margin-bottom: rem(50);
      }
    }
  }
</style>