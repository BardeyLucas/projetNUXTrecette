<script setup lang="ts">
import type { SanityDocument } from '@sanity/client'

const BOOKS_QUERY = groq`*[
  _type == "book"
  && defined(slug.current)
]|order(publishedAt desc)[0...12]{_id, title, slug, publishedAt}`

const { data: books } = await useLazySanityQuery<SanityDocument[]>(BOOKS_QUERY)
</script>

<template>
  <div class="booksPage">
    <h1 class="booksPage__title">Books</h1>
    <ul class="booksPage__list">
      <li v-for="book in books" :key="book._id" class="booksPage__item">
        <nuxt-link :to="`/books/${book.slug.current}`" class="booksPage__link">
          <h2 class="booksPage__bookTitle">{{ book.title }}</h2>
          <p class="booksPage__publishedAt">{{ new Date(book.publishedAt).toLocaleDateString() }}</p>
        </nuxt-link>
      </li>
    </ul>
  </div>
</template>
<style lang="scss">
  .booksPage {
    padding: rem(50);

    &__list {
      padding: 0 rem(20);
    }

    &__link {
      text-decoration: none;
      font-weight: bold;
    }
    @media (max-width: rem(500)) {
      &__bookTitle {
        font-size: rem(20);
      }

      &__publishedAt {
        font-size: rem(14);
      }
    }
  }
</style>