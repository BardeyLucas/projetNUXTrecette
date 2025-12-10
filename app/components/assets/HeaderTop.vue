<script setup lang="ts">
import type { SanitySiteSettings } from '~/types/cms/site-settings'
const query = groq`*[_type == "settingsType"]{ _id, logo, navigation }[0]`
const { data } = await useLazySanityQuery<SanitySiteSettings>(query)
</script>
<template>
  <nav class="header__top">
    <section class="header__topLeft">
      <RouterLink v-for="item in data?.navigation" :key="item._id" :to="item.url">{{ item.label }}</RouterLink>
    </section>
    <section class="header__topRight">
      <button>
        <AssetsLogin class="LoginIcon" />
        Register
      </button>
      <button>
        <AssetsUser class="UserIcon" />
        Login
      </button>
    </section>
  </nav>
</template>
<style lang="scss">
    .header {
      &__top {
      display: flex;
      justify-content: space-between;
      padding: rem(12) rem(72);
      font-family: Montserrat;
      text-transform: uppercase;
      font-weight: 700;

      &Left {
        display: flex;
        gap: 0 rem(32);

        & > a {
          color: rgb(255, 255, 255);
          text-decoration: none;
        }
      }
    &Right {
      display: flex;
      gap: rem(20);

      & > button {
        background-color: #00000000;
        border: none;
        color: white;
        font-family: Montserrat;
        font-size: rem(15);
        text-transform: uppercase;
        font-weight: 700;
        display: flex;
        align-items: center;
        gap: rem(8);
      }

      .LoginIcon {
        width: rem(20);
        height: rem(20);
      }

      .UserIcon {
        width: rem(20);
        height: rem(20);
      }
    }
  }
  @media (max-width: rem(950)) {
    &__top{
      flex-direction: column-reverse;
      gap: rem(10);
      padding: rem(12) rem(20);
    }
    &__topLeft{
      justify-content: center;
      flex-wrap: wrap;
    }
    &__topRight{
      justify-content: right;
    }
  }
}
</style>