<script setup lang="ts">
import type { SanitySiteSettings } from '~/types/cms/site-settings'

const props = defineProps<{
  user: Users | null
}>()

const query = groq`*[_type == "settingsType"]{ _id, logo, navigation }[0]`
const { data } = await useLazySanityQuery<SanitySiteSettings>(query)
const { urlFor } = useSanityImage()

</script>
<template>
  <section class="header__bottom">
    <section class="header__bottomLeft">
      <RouterLink class="header__sectionlogo" to="/">
        <img v-if="data?.logo" class="header__logo" :src="urlFor(data.logo)?.url()" alt="Logo" >
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
        <button 
          class="header__profile"  
          :style="{ backgroundImage: props.user ? 'url(/images/UserConnected.png)' : 'url(/images/UserNotConnected.png)'}">
          <!-- Profile Button -->
        </button>
      </RouterLink>
    </section>
  </section>
</template>
<style lang="scss">
.header {
  &__bottom {
    background-color: #ffffff;
    display: flex;
    justify-content: space-between;
    padding: rem(20) rem(112);
    gap: rem(100);
  }
  &__bottomLeft {
    display: flex;
    align-items: center;
    height: rem(72);
    width: auto;
    gap: rem(100);
  }
  &__sectionlogo {
      height: rem(72);
      min-width: rem(150);
  }
  &__logo {
      height: rem(72);
      width: rem(150);
  }

  &__search {
    display: flex;
    border: solid rem(1) #d9d9d9;
    border-radius: rem(20);
    overflow: hidden;
    height: rem(48);
    gap: rem(30);
  }

  &__shearch-categories {
    font-family: Montserrat;
    border: none;
    display: flex;
    background-color: #d0c5c543;
    white-space: pre;
    width: fit-content;
    font-size: rem(20);
    align-items: center;
    gap: rem(14);
    padding: 0 rem(16);
  }

  &__ArrowDownIcon {
    width: rem(20);
    height: rem(20);
  }

  &__inputSearch {
    font-family: Montserrat;
    border: none;
    font-weight: bold;
    font-size: rem(20);
    width: 100%;

    &::-webkit-input-placeholder {
      color: #d9d9d9;
    }
    &:-ms-input-placeholder {
      color: #d9d9d9;
    }
    &::placeholder {
      color: #d9d9d9;
    }
  }

  &__buttonShearch {
    margin-right: -1px;
    font-family: Montserrat;
    border: none;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #d9d9d9;
    border-radius: rem(24) rem(20) rem(20) rem(24);
    min-width: rem(46);
  }
  &__IconButtonShearch {
    width: rem(20);
    height: rem(20);
  }
  &__bottomRight {
    display: flex;
    align-items: center;
    gap: rem(24);
  }
  &__panier {
    width: rem(52);
    height: rem(52);
    border: none;
    display: block;
    background-color: #00000000;
  }
  &__IconShoppingCart_PositionPatcher {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  &__IconShoppingCart {
    width: rem(40);
    height: rem(40);
    margin-top: rem(20);
  }
  &__panier-notification {
    position: relative;
    top: rem(-53);
    left: rem(15);
    width: rem(30);
    height: rem(30);
    background-color: #84bd00;
    border-radius: rem(1000);
    display: flex;
    align-items: center;
    justify-content: center;
  }
  &__notification-number {
    font-size: rem(20);
    font-weight: 500;
    font-family: Montserrat;
  }
  &__profile {
    width: rem(56);
    height: rem(56);
    border: none;
    border-radius: rem(1000);
    background-size: cover;
    background-position: center;
    border: rem(2) solid #858585;
  }
  @media (max-width: rem(1200)) {
      &__bottom {
        padding: rem(20) rem(50);
      }

    &__bottomLeft {
      gap: rem(60);
    }

    &__shearch-categories>p{
      font-size: rem(14);
    }
    &__inputSearch{
      font-size: rem(14);
    }
  }
  @media (max-width: rem(950)) {
    &__bottom{
      padding: rem(20) rem(20);
      gap: rem(30);
    }
    &__bottomLeft{
      flex-direction: column;
      align-items: flex-start;
      gap: rem(20);
      height: auto;
    }
    &__sectionlogo{
      min-width: rem(120);
      height: rem(58);
    }
    &__logo{
      width: rem(120);
      height: rem(58);
    }
    &__search{
      width: calc(100vw - rem(40));
      margin-right: -100vw;
      z-index: 2;
    }
    &__bottomRight{
      align-items: flex-start;
    }
  }
  @media (max-width: rem(500)) {

    &__sectionlogo{
      height: rem(48);
      min-width: rem(100);
    }
    &__logo{
      height: rem(48);
      width: rem(100);
    }

    &__bottomRight{
      gap: rem(10);
    }

    &__IconShoppingCart {
      margin-top: rem(20);
      width: rem(28);
      height: rem(28);
    }

    &__IconShoppingCart_PositionPatcher{
      width: rem(28);
      height: rem(28);
    }

    &__panier-notification{
      width: rem(20);
      height: rem(20);
      top: rem(-30);
      left: rem(10);
    }

    &__notification-number{
      font-size: rem(15);
    }

    &__profile{
      width: rem(40);
      height: rem(40);
    }

    &__search{
      height: rem(25);
      gap: rem(10);
    }  
    
    &__shearch-categories{
      padding: 0 rem(8);
      gap: rem(5);
      &>p{
        font-size: rem(12);
      }
    }
    &__ArrowDownIcon {
      width: rem(15);
      height: rem(15);
    }
    &__buttonShearch{
      min-width: rem(25);
    }
  }
}
</style>