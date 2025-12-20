<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <footer class="footer">
    <div class="footer__section_logo">
      <img class="footer__logo" src="/images/MainLogoDarkMode.png" alt="Logo" >
      <p class="footer__rights">All Rights Reserved</p>
    </div>
    <div class="footer__sectionRight">
      <div class="footer__section_FreshRecipe">
        <h3>Fresh Recipes</h3>
        <ul>
          <li>Recipes</li>
          <li>Winter salads</li>
          <li>Organic chicken</li>
          <li>Beef and Mutton</li>
          <li>Flavoured Milk</li>
        </ul>
      </div>
      <div class="footer__section_news">
        <h3>In News</h3>
        <ul>
          <li>Our Blogs</li>
          <li>Contests/Sweepsatkes</li>
          <li>Video</li>
          <li>New Releases</li>
          <li>Newsletters</li>
        </ul>
      </div>
      <div class="footer__section_AboutUs">
        <h3>About US</h3>
        <ul>
          <li>FAQ</li>
          <li>Our Board</li>
          <li>Our Staff</li>
          <li>Contact Us</li>
        </ul>
      </div>
      <div class="footer__section_newsletter">
        <h3>Juin Our Newsletter</h3>
        <div class="footer__newsletter-input">
          <input id="email" type="email" placeholder="email">
          <button>
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
  color: white;
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

  &__section_FreshRecipe, &__section_news, &__section_AboutUs, &__section_newsletter {
    

    & > h3 {
     font-size: rem(20);
    }

    & > ul {
      padding: 0;

      & > li {
       list-style: none;
      }
    }
  }

  &__section_newsletter {
    margin-left: rem(70);

    & > h3 {
      font-family: montez;
      font-size: rem(40);
      font-weight: normal;
    }
  }

  &__newsletter-input {
    display: flex;
    border: solid rem(1) white;
    justify-content: space-between;
    padding: 0 rem(20);

    & > input {
      border: none;
      background-color: #00000000;
      color : white;
      font-size: rem(20);
    }

    & > button {
      border: none;
      background-color: #00000000;
      color : white;
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

      & > div {
        & > h3 {
          margin-bottom: 5px;
        }
      }
    }
  }
  @media (max-width: rem(1160)) {
    &__section_newsletter{
      margin: rem(20);
    }
  }
  @media (max-width: rem(550)) {
    padding: rem(20) rem(20);  
    &__section_newsletter{
      max-width: calc(100%);
      margin: 0;
      &  > h3 {
        font-size: rem(30);
      }
    }
    &__newsletter-input{
      padding: 0;
      margin: 0;
      gap: 0;
      & > input {
        font-size: rem(16);
        max-width: calc(100% - rem(60));
      }
    }
  }
}
</style>
