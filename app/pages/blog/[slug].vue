<script setup lang="ts">
const route = useRoute()
// console.log('Current route:', route.path)
</script>

<template>
  <div>
    <h1>L'article {{ route.params.slug }}</h1>
  </div>
</template>