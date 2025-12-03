<script setup lang="ts">
const email = ref('')
const password = ref('')
const config = useRuntimeConfig()

async function onSubmit () {
  try {
    console.log('=> Api call to login')

    const response = await fetch(
      `${config.public.apiUrl}/api/users/login`,
      {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: email.value,
          password: password.value
        })
      }
    )

    const json = await response.json()

    const token = json.data.token
    
    const cookie = useCookie('recipe_token')
    cookie.value = token

    console.log(token)

  } catch (err) {
    console.error(err)
  }
}

</script>
<template>
  <div>
    <h1>Connexion</h1>
    <form action="" @submit.prevent="onSubmit">
      <label for="email">Email</label>
      <input id="email" v-model="email" type="text">
      <label for="password">Password</label>
      <input id="password" v-model="password" type="password">
      <button type="submit">Se connecter</button>
    </form>
  </div>
</template>