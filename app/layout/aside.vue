<template>
    <div class="ly-aside">
        <aside>Sidebar</aside>
        <main>
            Contenu de la page
            <slot />
        </main>
    </div>
</template>
<style lang="scss" scoped>
.ly-aside {
    display: flex;
    flex-flow: row nowrap;

    &__sidebar {
        flex: 1;
    }
    &__main {
        flex-grow: 3;
        padding: 1rem;
    }
}
</style>