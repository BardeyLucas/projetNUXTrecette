<script setup lang="ts">
// import { jwtDecode } from 'jwt-decode'


// const token = useCookie('recipe-token').value
// let userId = null

// if (token) {
//   const decoded: any = jwtDecode(token)
//   userId = decoded.user_Id || decoded.sub
// }

// console.log('User ID:', userId)

// const title = ref('')
// const description = ref('')
// const image_url = ref('')
// const cuisine_name = ref('')
// const goal_name = ref('')
// const diet_name = ref('')
// const allergy_name = ref('')
// const config = useRuntimeConfig()
// const postRecipe = async () => {
//   try {
//     const response = await fetch(`${config.public.apiUrl}/API/recipes`, {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
//       body: JSON.stringify({
//         title: title.value,
//         description: description.value,
//         image_url: image_url.value,
//         cuisine_name: cuisine_name.value,
//         goal_name: goal_name.value,
//         diet_name: diet_name.value,
//         allergy_name: allergy_name.value
//       })
//     })

//     const json = await response.json()

//     if (!response.ok) {
//       console.error('Failed to create recipe:', json)
//       return
//     }

//     console.log('Recipe created successfully:', json)

//   } catch (error) {
//     console.error('Login failed:', error)
//   }
// }

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
  if (!payload.value.title || !payload.value.description || !payload.value.cuisine_id || !payload.value.goal_id || !payload.value.DietaryInformation_id || !payload.value.AllergiesInformation_id) return
    
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
  <div>
    <h1>Ajoute ta recette</h1>
    <form @submit.prevent="onSubmit">
      <div>
        <label for="title">Title</label>
        <input id="title" v-model="payload.title" placeholder="Title" />
      </div>
      <div>
        <label for="description">Description</label>
        <input id="description" v-model="payload.description" placeholder="Description" />
      </div>
      <div>
        <label for="image_url">Image URL</label>
        <input id="image_url" v-model="payload.image_url" placeholder="Image URL" />
      </div>
      <div>
        <label for="cuisine_id">Cuisine</label>
        <select id="cuisine_id" v-model="payload.cuisine_id" >
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
      <div>
        <label for="goal_id">Goal</label>
        <select id="goal_id" v-model="payload.goal_id" >
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
      <div>
        <label for="DietaryInformation_id">Diet</label>
        <select id="DietaryInformation_id" v-model="payload.DietaryInformation_id" >
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
      <div>
        <label for="AllergiesInformation_id">Allergy</label>
        <select id="AllergiesInformation_id" v-model="payload.AllergiesInformation_id" >
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
      <button type="submit">Create Recipe</button>
    </form>
  </div>
</template>
