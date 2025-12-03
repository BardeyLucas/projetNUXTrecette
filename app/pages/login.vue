<script setup lang="ts">
const email = ref('')
const password = ref('')
const config = useRuntimeConfig()
const postLogin = async () => {
  try {
    const response = await fetch(`${config.public.apiUrl}/API/users/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: email.value,
        password: password.value
      })
    })
    const json = await response.json()
    console.log(json)
    const token = json.data.token
    const cookie = useCookie('recipe-token')
    cookie.value = token
    console.log(token)
    if (token) {
      navigateTo('/dashboard')
    }
  } catch (error) {
    console.error('Login failed:', error)
  }
}
</script>
<template>
  <div>
    <h1>Connexion</h1>
    <form action="" @submit.prevent="postLogin">
      <label for="email">Email</label>
      <input id="email" v-model="email" type="text">
      <label for="password">Password</label>
      <input id="password" v-model="password" type="password">
      <button type="submit">Se connecter</button>
    </form>
  </div>
</template>