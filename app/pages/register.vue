<script setup lang="ts">
const payload = ref({
  username: '',
  email: '',
  first_name: '',
  last_name: '',
  password: ''
})

const config = useRuntimeConfig()

async function onSubmit () {
  if (!payload.value.username || !payload.value.email || !payload.value.first_name || !payload.value.last_name || !payload.value.password) return
    
  try {
    await fetch(`${config.public.apiUrl}/api/users/register`, {
      method: 'POST',
      headers: { 
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload.value)
    })
  } catch (error) {
    console.error('Error creating users profil:', error)
  }
}

</script>

<template>
  <div class="createRecipe">
    <h1 class="createRecipe__title">Ajoute ta recette</h1>
    <form class="createRecipe__form" @submit.prevent="onSubmit">
      <div class="createRecipe__form_group">
        <label for="username">Pseudo</label>
        <input id="username" v-model="payload.username" class="createRecipe__form_input">
      </div>
      <div class="createRecipe__form_group">
        <label for="email">Email</label>
        <input id="email" v-model="payload.email" class="createRecipe__form_input">
      </div>
      <div class="createRecipe__form_group">
        <label for="first_name">Prénom</label>
        <input id="first_name" v-model="payload.first_name" class="createRecipe__form_input">
      </div>
      <div class="createRecipe__form_group">
        <label for="last_name">Nom</label>
        <input id="last_name" v-model="payload.last_name" class="createRecipe__form_input">
      </div>
      <div class="createRecipe__form_group">
        <label for="password">Mot de passe</label>
        <input id="password" v-model="payload.password" class="createRecipe__form_input" type="password">
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
        border: rem(2) solid #84BD00;
        border-radius: rem(8);
        width: 100%;
      }

      &_button{
        background-color: #84BD00;
        color: white;
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