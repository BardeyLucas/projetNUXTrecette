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
    const token = json.data.token
    const cookie = useCookie('recipe-token')
    cookie.value = token
    if (token) {
      navigateTo('/dashboard')
    }
  } catch {
    console.error('Login failed')
  }
}
</script>
<template>
  <div class="loginPage">
    <h1 class="loginPage__title">Connexion</h1>
    <form class="loginPage__form" action="" @submit.prevent="postLogin">
      <div class="loginPage__form_group">
        <label for="email">Email</label>
        <input id="email" v-model="email" type="text" class="loginPage__form_input">
      </div>
      <div class="loginPage__form_group">
        <label for="password">Password</label>
        <input id="password" v-model="password" type="password" class="loginPage__form_input">
      </div>
      <button type="submit" class="loginPage__form_button">Se connecter</button>
    </form>
  </div>
</template>
<style lang="scss">
  .loginPage{
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