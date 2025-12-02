<template>
  <NuxtLayout>
    <SiteHeader />
    <main class="page-content">
      <nav class="sectionTemporaire--nav">
        <RouterLink to="/"><MyButton variant="outline">Home</MyButton></RouterLink>
        <RouterLink to="/about"><MyButton variant="outline">About</MyButton></RouterLink>
        <RouterLink to="/button"><MyButton variant="outline">Button</MyButton></RouterLink>
      </nav>
      <NuxtPage />
    </main>
  </NuxtLayout>
</template>
