<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import type { SanityDocument } from '@sanity/client'
import { jwtDecode } from 'jwt-decode'
const token = useCookie<string | null>('recipe-token')
const isConnected = computed(() => !!token.value)
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


const PARAMETER_QUERY = groq`*[_type == "settingsType"]{ _id, logo, navigation }[0]`
const { params } = useRoute()

const { data: settingsType } = await useLazySanityQuery<SanityDocument>(PARAMETER_QUERY, params)
const { urlFor } = useSanityImage()

// import type { SanitySiteSettings } from '~/types/cms/site-settings'
// defineProps<{
//   siteSettings: SanitySiteSettings
// }>()
</script>

<template>
  <header class="header">
    <nav class="header__top">
      <section class="header__TopLeft">
        <RouterLink v-for="item in settingsType?.navigation" :key="item._id" :to="item.url">{{ item.label }}</RouterLink>
      </section>
      <section class="header__TopRight">
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
    <section class="header__bottom">
      <section class="header__bottomLeft">
        <RouterLink class="header__sectionlogo" to="/">
          <img v-if="settingsType?.logo" class="header__logo" :src="urlFor(settingsType.logo)?.url()" alt="Logo" >
        </RouterLink>
        <div class="header__search">
          <button class="header__shearch-categories">
            <p>All Categories</p>
            <AssetsArrowDown class="header__ArrowDownIcon" />
          </button>
          <input id="SearchBar" class="header__inputSearch" type="text" placeholder="Search" >
          <button class="header__buttonShearch">
            <AssetsSearch class="header__IconButtonShearch" />
          </button>
        </div>
      </section>
      <section class="header__bottomRight">
        <button class="header__panier">
          <div class="header__IconShoppingCart_PositionPatcher">
            <AssetsShoppingCart class="header__IconShoppingCart" />
          </div>
          <div class="header__panier-notification">
            <p class="header__notification-number">1</p>
          </div>
        </button>
        <RouterLink to="/dashboard">
          <button class="header__profile" :class="{ 'header__profile--connected': isConnected == true }">
            <!-- Profile Button -->
          </button>
        </RouterLink>
      </section>
    </section>
  </header>
</template>
