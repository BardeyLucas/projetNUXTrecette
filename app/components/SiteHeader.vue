<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">

import { jwtDecode } from 'jwt-decode'
const token = useCookie<string | null>('recipe-token')
const user = ref(null)

watch(token, (newToken) => {
  if (!newToken) {
    user.value = null
    return
  }

  try {
    user.value = jwtDecode(newToken)
  } catch {
    user.value = null
  }
}, { immediate: true })
const isConnected = computed(() => !!token.value)
</script>

<template>
  <header class="header">
    <assetsHeaderTop />
    <assetsHeaderBottom :is-connected="isConnected" />
  </header>
</template>
<style lang="scss">
  .header {
  width: 100%;
  background-color: black;
  box-shadow: 0 rem(4) rem(8) #0000000d;
  position: sticky;
  top: 0;
  z-index: 100;
}
</style>
