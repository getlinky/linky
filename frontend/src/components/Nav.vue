<template>
  <header>
    <nav class="main-nav">
      <div class="items">
        <div class="section">
          <router-link to="/">
            <h1 class="title">Linky</h1>
          </router-link>
        </div>
        <div class="section noselect">
          <slot></slot>
        </div>
      </div>
    </nav>
  </header>
</template>

<script>
export default {
  name: 'Nav',
}
</script>


<style lang="scss" scoped>

.section {
    align-items: center;
    display: flex;
    font-weight: bold;
    text-decoration: none;
    font-size: .8rem;

    // make sure the last link section doesn't hit the edge of the browser
    &:last-child {
      margin-right: .5rem;
    }

    &:first-child {
      margin-left: .5rem;
    }
    a {
      text-decoration: none;
    }
  }
.noselect {
  user-select: none;
}
</style>
