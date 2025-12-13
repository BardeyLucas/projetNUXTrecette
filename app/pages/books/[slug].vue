<script setup lang="ts">
import type { SanityDocument } from '@sanity/client'

const BOOK_QUERY = groq`*[_type == "book" && slug.current == $slug][0]
{slug, title, cover, image, body, publishedAt, author -> {nom}, categories[]->{...,nom}}`
const { params } = useRoute()

const { data: book } = await useLazySanityQuery<SanityDocument>(BOOK_QUERY, params)

const { urlFor } = useSanityImage()
</script>

<template>
  <div
    v-if="book"
    class="livre"
  >
    <NuxtLink href="/books/" class="livre__Return">&larr; Back to books</NuxtLink>
    <img
      v-if="book.image"
      class="livre__Image"
      :src="urlFor(book.image)?.width(550).height(310).url()"
      :alt="book?.title"
    >
    <h1 v-if="book.title" class="livre__Title">{{ book.title }}</h1>
    <p v-for="categorie in book.categories" :key="categorie._id">by {{ categorie.nom }}</p>
    <p>{{ book.body[0].children[0].text }}</p>
    <SanityContent v-if="book.body" :blocks="book.body" />
    <div>
      <p v-if="book.publishedAt">
        Published: {{ new Date(book.publishedAt).toLocaleDateString() }}
      </p>
    </div>
    <p>by {{ book.author.nom }}</p>
  </div>
</template>
<style lang="scss">
.livre {
    max-width: 700px;
    margin: auto;
    padding: 2rem;
    display: flex;
    flex-direction: column;
    gap: 1.5rem;

    &__Image {
      border-radius: rem(12);
      object-fit: cover;
    }

    &__Title {
      font-size: rem(36);
      font-weight: bold;
      margin-top: rem(32);
    }
}
</style>