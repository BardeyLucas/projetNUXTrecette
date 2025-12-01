<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <header class="header">
    <nav class="header__top">
      <section class="header__TopLeft">
        <p>Community</p>
        <p>Books</p>
        <p>Recipe index</p>
        <p>Popular</p>
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
        <img class="header__logo" src="/images/MainLogo.png" alt="Logo" >
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
        <button class="header__profile">
          <!-- <img > -->
        </button>
      </section>
    </section>
  </header>
</template>
