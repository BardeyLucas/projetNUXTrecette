<script setup lang="ts">
import type { SanitySiteSettings } from '~/types/cms/site-settings'
const query = groq`*[_type == "settingsType"]{ _id, logo, navigation }[0]`
const { data } = await useLazySanityQuery<SanitySiteSettings>(query)

const props = defineProps<{
  user: Users | null
}>()
</script>
<template>
  <nav class="header__top">
    <section class="header__topLeft">
      <RouterLink v-for="item in data?.navigation" :key="item._id" :to="item.url" class="header__topLeft_link">{{ item.label }}</RouterLink>
    </section>
    <section 
      class="header__topRight"
      :style="{ display: props.user ? 'none' : 'flex'}">
      <NuxtLink to="/register" class="header__topRight_link">
        <AssetsLogin class="LoginIcon" />
        Register
      </NuxtLink>
      <NuxtLink to="/login" class="header__topRight_link">
        <AssetsUser class="UserIcon" />
        Login
      </NuxtLink>
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
        color: var(--white);
        text-decoration: none;
      }
    }
    &Right {
      display: flex;
      gap: rem(20);

      &_link  {
        background-color: var(--transparent);
        border: none;
        color: var(--white);
        font-family: Montserrat;
        font-size: rem(15);
        text-transform: uppercase;
        font-weight: 700;
        display: flex;
        align-items: center;
        gap: rem(8);
        text-decoration: none;
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
  @media (max-width: rem(700)) {
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
  @media (max-width: rem(400)) {
    &__topLeft_link, &__topRight_link{
      font-size: rem(12);
    }
  }
}
</style>