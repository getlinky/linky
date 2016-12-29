<template>
  <header>
    <nav class="main-nav">
      <div class="items">
        <div class="section">
          <router-link to="/">
            <h1 class="title">Linky</h1>
          </router-link>
        </div>
        <slot>
          <router-link to="/login">Login</router-link>
        </slot>
        </div>
    </nav>
  </header>
</template>

<script>

export default {
  name: 'linky-nav'

}
</script>
