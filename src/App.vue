<template>
  <div id="app">
    <nav class="navbar navbar-expand-lg navbar-light">
      <div class="container">
        <!-- Your site title as branding in the menu -->
        <a href="#" class="navbar-brand custom-logo-link" rel="home" itemprop="url"><img src="./assets/fundament_logo.svg" class="img-fluid" alt="Your Logo" itemprop="logo"></a>
        <a class="navbar-brand site-title-with-logo" rel="home" href="#" title="Your Project" itemprop="url">Assessment Task</a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
      </div><!-- .container -->
    </nav>
    <HelloWorld />
  </div>
</template>

<script>
import HelloWorld from "./components/HelloWorld";

export default {
  name: "App",
  components: {
    HelloWorld,
  },
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  width: 100vw;
}
nav {
  margin-bottom: 60px;
}
</style>
