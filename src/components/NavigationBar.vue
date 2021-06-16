<template>
  <nav class="navbar navbar-expand-lg navbar-light">
    <div class="container">
      <!-- Your site title as branding in the menu -->
      <router-link to="/search/" class="navbar-brand custom-logo-link" rel="home"><img src="../assets/fundament_logo.svg" class="img-fluid" alt="Your Logo" itemprop="logo"></router-link>
      <router-link to="/search/" class="navbar-brand site-title-with-logo" rel="home" title="Assessment Task">Assessment Task</router-link>
      <a href="https://github.com/kaggl/Assessment-Task">
        <button class="form-inline btn btn-outline-info">
          Repository
        </button>
      </a>
    </div><!-- .container -->
  </nav>
</template>

<script>
export default {
  name: 'NavigationBar',
}
</script>

<style lang="css" scoped>
</style>
