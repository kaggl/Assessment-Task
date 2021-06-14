<template>
  <nav class="navbar navbar-expand-lg navbar-light">
    <div class="container">
      <!-- Your site title as branding in the menu -->
      <a href="/" class="navbar-brand custom-logo-link" rel="home" itemprop="url"><img src="../assets/fundament_logo.svg" class="img-fluid" alt="Your Logo" itemprop="logo"></a>
      <a class="navbar-brand site-title-with-logo" rel="home" href="#" title="Your Project" itemprop="url">Assessment Task</a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
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
