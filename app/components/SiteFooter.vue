<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <footer class="footer">
    <div class="footer__section_logo">
      <img class="footer__logo" src="/images/MainLogoDarkMode.png" alt="Logo" >
      <p class="footer__rights">All Rights Reserved</p>
    </div>
    <div class="footer__sectionRight">
      <div class="footer__section_FreshRecipe">
        <h3 class="footer__section_title">Fresh Recipes</h3>
        <ul class="footer__section_list">
          <li class="footer__section_list_item">Recipes</li>
          <li class="footer__section_list_item">Winter salads</li>
          <li class="footer__section_list_item">Organic chicken</li>
          <li class="footer__section_list_item">Beef and Mutton</li>
          <li class="footer__section_list_item">Flavoured Milk</li>
        </ul>
      </div>
      <div class="footer__section_news">
        <h3 class="footer__section_title">In News</h3>
        <ul class="footer__section_list">
          <li class="footer__section_list_item">Our Blogs</li>
          <li class="footer__section_list_item">Contests/Sweepsatkes</li>
          <li class="footer__section_list_item">Video</li>
          <li class="footer__section_list_item">New Releases</li>
          <li class="footer__section_list_item">Newsletters</li>
        </ul>
      </div>
      <div class="footer__section_AboutUs">
        <h3 class="footer__section_title">About US</h3>
        <ul class="footer__section_list">
          <li class="footer__section_list_item">FAQ</li>
          <li class="footer__section_list_item">Our Board</li>
          <li class="footer__section_list_item">Our Staff</li>
          <li class="footer__section_list_item">Contact Us</li>
        </ul>
      </div>
      <div class="footer__section_newsletter">
        <h3 class="footer__section_newsletter_title">Juin Our Newsletter</h3>
        <div class="footer__newsletter_input">
          <input class="footer__newsletter_input_section" id="email" type="email" placeholder="email">
          <button class="footer__newsletter_input_button" type="submit">
            <AssetsSendMail />
          </button>
        </div>
      </div>
    </div>
  </footer>
</template>
<style lang="scss">
  .footer{
  background-color: var(--darkgray);
  display: flex;
  color: var(--white);
  padding: rem(25) rem(100);
  justify-content: space-between;
  gap: rem(150);

  &__section_logo {
    margin-top: rem(35);
    width: fit-content;
  }

  &__logo {
    width: rem(150);
    height: rem(72);
  }

  &__rights {
    font-size: rem(20);
    white-space: pre;
  }

  &__sectionRight {
    display: flex;
    margin-top: rem(25);
    gap: rem(30);
    justify-content: space-between;
    width: 100%;
  }    

  &__section_title {
    font-size: rem(20);
  }

  &__section_list {
    padding: 0;

    &_item {
      list-style: none;
    }
  }

  &__section_newsletter {
    margin-left: rem(70);

    &_title {
      font-family: montez;
      font-size: rem(40);
      font-weight: normal;
    }
  }

  &__newsletter_input {
    display: flex;
    border: solid rem(1) var(--white);
    justify-content: space-between;
    padding: 0 rem(20);

    &_section {
      border: none;
      background-color: var(--transparent);
      color : var(--white);
      font-size: rem(20);
    }

    &_button {
      border: none;
      background-color: var(--transparent);
      color : var(--white);
      padding: 0;

      & > svg {
        width: rem(50);
        height: rem(50);
      }
    }
  }
  @media (max-width: rem(1500)) {
    flex-direction: column-reverse;
    gap: 0;

    &__section_logo {
      margin-top: rem(25);
      width: 100%;
    }

    &__logo {
      display: none;
    }

    &__rights {
      white-space: pre;
      text-align: center;
    }

    &__reductRights {
      display: inline;
    }

    &__sectionRight {
      flex-wrap: wrap;
      gap: rem(40);
      justify-content: center;
      text-align: center;
    }
  }

  &__section_title {
    margin-bottom: 5px;
  }
  
  @media (max-width: rem(1160)) {
    &__section_newsletter{
      margin: rem(20);
    }
  }
  @media (max-width: rem(550)) {
    padding: rem(20) rem(20); 
    
    &__sectionRight{
      flex-direction: column;
    }

    &__section_newsletter{
      max-width: calc(100%);
      margin: 0;
      &_title {
        font-size: rem(30);
      }
    }
    &__newsletter_input{
      padding: 0 rem(10);
      margin: 0 rem(20);
      gap: 0;

      &_section{
        font-size: rem(16);
        max-width: calc(100% - rem(60));
      }
    }
  }
}
</style>
